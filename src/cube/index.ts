import type { Puzzle } from '@/puzzle'
import { extract, inject, int, mod, rotate, sample } from '@/utils'
import { cubeAxes, cubeFaces, cubeNet, cubeOpposites } from './constants'
import { createFace } from './utils'
import type {
  CubeAxis,
  CubeFace,
  CubeOptions,
  CubeSticker,
  CubeTurn,
  CubeSolvedOptions,
} from './types'

export class Cube implements Puzzle<CubeTurn, CubeSolvedOptions> {
  /**
   * Random number generator.
   */
  readonly rand: () => number

  /**
   * Size of the cube.
   */
  readonly size: number

  /**
   * State of the cube.
   */
  readonly state: Record<CubeFace, CubeSticker[]>

  /**
   * Create a new cube.
   * @param opts - The options for the cube.
   */
  constructor(opts: number | CubeOptions) {
    const size = typeof opts === 'number' ? opts : opts.size

    if (size < 1 || !Number.isInteger(size)) {
      throw new Error('Cube size must be a positive integer')
    }

    this.rand = typeof opts === 'number' ? Math.random : opts.rand ?? Math.random

    this.size = size

    this.state = {
      b: createFace(size, 'b'),
      d: createFace(size, 'd'),
      f: createFace(size, 'f'),
      l: createFace(size, 'l'),
      r: createFace(size, 'r'),
      u: createFace(size, 'u'),
    }
  }

  /**
   * Generate a scramble
   */
  generateScramble(depth: number = Math.max(20, this.size ** 3)): string {
    const { rand, size } = this
    const turns: CubeTurn[] = []

    let face: CubeFace = sample(Object.keys(cubeNet) as CubeFace[], rand)

    for (let i = 0; i < depth; i++) {
      face = sample(cubeNet[face], rand)[0] // <- only sample adjacent faces

      turns.push({
        depth: int(1, size / 2, rand),
        rotation: sample([-1, 1, 2], rand),
        target: face,
        wide: sample([true, false], rand),
      })
    }

    return turns.map(turn => this.stringifyTurn(turn)).join(' ')
  }

  /**
   * Parse turn notation against the current cube size
   */
  parseTurn(source: string): CubeTurn {
    const parts = source.match(/^(\d)*([ulfrbdxyz]){1}(w)?(['-2])?$/i)

    if (!parts) {
      throw new Error(`Invalid turn: ${source}`)
    }

    const depth = Math.min(this.size, parts[1] ? parseInt(parts[1], 10) : 1)

    const target = parts[2].toLowerCase() as CubeFace | CubeAxis

    const wide = !!parts[3]

    if (wide && parts[1] === '1') {
      throw new Error(`Invalid turn: ${source}`)
    }

    const rotation = parts[4] === '-' || parts[4] === '\''
      ? -1
      : parts[4] === '2'
        ? 2
        : 1

    return {
      depth: wide ? Math.max(2, depth) : depth,
      target,
      rotation,
      wide,
    }
  }

  /**
   * Scramble the puzzle to a given depth
   */
  scramble(depth?: number): this {
    return this.turn(this.generateScramble(depth))
  }

  /**
   * Stringify a cube turn object
   */
  stringifyTurn(turn: CubeTurn): string {
    const { size } = this

    if (!Number.isInteger(turn.depth) || turn.depth < 1) {
      throw new Error(`Invalid turn: ${turn}`)
    }

    const wide = turn.wide && turn.depth > 1 && size > 2
      ? 'w'
      : ''

    const depth = turn.depth > (wide ? 2 : 1)
      ? turn.depth
      : ''

    const rotation = turn.rotation === -1
      ? '-'
      : turn.rotation === 2
        ? '2'
        : ''

    const target = turn.target.toUpperCase().trim() as Uppercase<CubeAxis | CubeFace>

    // simple axis turns
    if (target === 'X' || target === 'Y' || target === 'Z') {
      return `${target}${rotation}`
    }

    // maximally-wide axis turns
    // ex: 3Rw on a 3x3 -> X, Dw on 2x2 -> Y-
    if (wide && turn.depth >= size) {
      const axis: Uppercase<CubeAxis>
        = (target === 'R' || target === 'L')
          ? 'X'
          : (target === 'U' || target === 'D')
              ? 'Y'
              : 'Z'

      const inverted = target === 'L' || target === 'D' || target === 'B'

      const axisRotation = turn.rotation === -1
        ? (inverted ? '' : '-')
        : turn.rotation === 2
          ? '2'
          : (inverted ? '-' : '')

      return `${axis}${axisRotation}`
    }

    return `${depth}${target}${wide}${rotation}`
  }

  /**
   * Test if the puzzle is solved.
   * @param opts - When `super: true`, requires all indexes in order and all rotations 0.
   */
  solved(opts: CubeSolvedOptions = {}): boolean {
    const { state } = this

    for (const face of cubeFaces) {
      const val = state[face]

      for (const sticker of val) {
        if (sticker.face !== face) {
          return false
        }
      }

      if (opts.super) {
        let index = 0

        for (const sticker of val) {
          if (sticker.index !== index++ || sticker.rotation !== 0) {
            return false
          }
        }
      }
    }

    return true
  }

  /**
   * Reset the puzzle to it's starting state
   */
  reset(): this {
    this.state.b = createFace(this.size, 'b')
    this.state.d = createFace(this.size, 'd')
    this.state.f = createFace(this.size, 'f')
    this.state.l = createFace(this.size, 'l')
    this.state.r = createFace(this.size, 'r')
    this.state.u = createFace(this.size, 'u')

    return this
  }

  /**
   * Execute a turn, or whitespace-separated sequence of turn notation
   */
  turn(turn: CubeTurn | string): this {
    if (typeof turn === 'string') {
      turn
        .split(' ')
        .map(str => str.trim())
        .filter(str => str.length)
        .forEach(notation => this.turn(this.parseTurn(notation)))

      return this
    }

    const {
      depth,
      rotation,
      target,
      wide,
    } = turn

    // treat axis turns as maximally deep wide turns
    if (target === 'x' || target === 'y' || target === 'z') {
      return this.turn({
        depth: this.size,
        rotation,
        target: cubeAxes[target],
        wide: true,
      })
    }

    // rotate target face
    if (depth === 1 || wide) {
      this.state[target] = rotate(this.state[target], rotation).map((sticker) => {
        sticker.rotation = mod(sticker.rotation + rotation, 4)
        return sticker
      })
    }

    // rotate the opposite face
    if (depth >= this.size) {
      const opposite = cubeOpposites[target]

      this.state[opposite] = rotate(this.state[opposite], -rotation).map((sticker) => {
        sticker.rotation = mod(sticker.rotation - rotation, 4)
        return sticker
      })
    }

    // rotate adjacent slices
    const related = cubeNet[target]
    const normalizedRotation = mod(rotation, 4)

    for (let i = wide ? 0 : depth - 1; i < depth; i += 1) {
      related.map((_, index) => {
        // extract slices from adjacent face, and rotate stickers
        const [face, edge, cw, ccw, double] = related[index]

        return extract(this.state[face], edge, i).map((sticker) => {
          if (normalizedRotation === 1) {
            sticker.rotation = mod(sticker.rotation + cw, 4)
          }
          else if (normalizedRotation === 2) {
            sticker.rotation = mod(sticker.rotation + double, 4)
          }
          else if (normalizedRotation === 3) {
            sticker.rotation = mod(sticker.rotation + ccw, 4)
          }
          return sticker
        })
      }).forEach((slice, index) => {
        // inject slices into target faces
        const [face, angle] = related[(index + 4 + rotation) % 4]

        this.state[face] = inject(slice, this.state[face], angle, i)
      })
    }

    return this
  }
}
