import { error } from '@/utils/function'
import { extract, inject, rotate } from '@/utils/matrix'
import { flattenBy, flattenDeep, hasSameElements, isUniform, last, sample, times, without } from '@/utils/array'
import { floor, max, rand } from '@/utils/number'
import { keys } from '@/utils/object'
import { lowercase, uppercase } from '@/utils/string'
import { Puzzle } from '@/puzzles/puzzle'

import {
  cubeAxes,
  cubeNet,
  cubeOpposites,
} from './constants'

import {
  CubeAxis,
  CubeFace,
  CubeFaceLower,
  CubeOptions,
  CubeSimpleState,
  CubeState,
  CubeSticker,
  CubeTurn,
} from './types'

/**
 * Cube
 */
export class Cube extends Puzzle<CubeOptions, CubeState, CubeSimpleState, CubeTurn, CubeSticker> {
  /**
   * Constructor
   *
   * @param {Partial<CubeOptions>} options puzzle options
   */
  constructor(options: Partial<CubeOptions> = {}) {
    const {
      random = Math.random,
      size = 3,
    } = options

    super({
      random,
      size,
    })

    this.state = {
      u: [],
      l: [],
      f: [],
      r: [],
      b: [],
      d: [],
    }

    this.reset()
  }

  /**
   * Apply puzzle state
   *
   * @param {Partial<CubeSimpleState>} state state to apply to the puzzle
   */
  apply(state: Partial<CubeSimpleState>): void {
    keys(state).forEach(face => {
      state[face].forEach((value, index) => {
        this.state[face][index].value = value
      })
    })
  }

  /**
   * Execute a turn
   *
   * @param {CubeTurn} turn turn to execute
   */
  execute(turn: CubeTurn): void {
    if (turn.target === 'x' || turn.target === 'y' || turn.target === 'z') {
      // whole cube rotations
      this.execute({
        depth: this.options.size,
        rotation: turn.rotation,
        target: cubeAxes[turn.target],
        wide: true,
        whole: true,
      })
    } else {
      // rotate target face
      if (turn.depth === 1 || turn.wide) {
        this.state[turn.target] = rotate(this.state[turn.target], turn.rotation)
      }

      // rotate opposite face
      if (turn.depth >= this.options.size) {
        const oppositeFace = cubeOpposites[turn.target]

        this.state[oppositeFace] = rotate(this.state[oppositeFace], -turn.rotation)
      }

      // rotate slices
      const relatedFaces = cubeNet[turn.target]

      for (let i = turn.wide ? 0 : turn.depth - 1; i < turn.depth; i += 1) {
        relatedFaces.map((source, index) => {
          // extract slices from adjacent face
          const [face, angle] = relatedFaces[index]

          return extract(this.state[face], angle, i)
        }).forEach((slice, index) => {
          // inject slices into target faces
          const [relatedFace, angle] = relatedFaces[(index + 4 + turn.rotation) % 4]

          this.state[relatedFace] = inject(slice, this.state[relatedFace], angle, i)
        })
      }
    }
  }

  /**
   * Generate a scramble
   *
   * @param {number} depth number of scramble turns
   * @param {string} prevTurn previous turn
   */
  generateScramble(depth: number = max(20, this.options.size ** 3), prevTurn?: string): string {
    const turns: CubeTurn[] = []
    const { random, size } = this.options

    for (let i = 0; i < depth; i += 1) {
      const prevTarget = i === 0 && prevTurn
        ? this.parse(prevTurn).target
        : last(turns)?.target

      turns.push({
        depth: rand(1, floor(size / 2), random),
        rotation: sample([-1, 1, 2], random),
        target: sample(without(keys(cubeNet), prevTarget), random),
        whole: false,
        wide: sample([true, false], random),
      })
    }

    return turns.map(turn => {
      const wideSuffix = turn.wide && turn.depth > 1 && size > 2 ? 'w' : ''
      const depthPrefix = turn.depth > (wideSuffix ? 2 : 1) ? turn.depth : ''
      const rotationSuffix = turn.rotation === -1 ? '-' : (turn.rotation === 2 ? '2' : '')

      return `${depthPrefix}${turn.target.toUpperCase()}${wideSuffix}${rotationSuffix}`
    }).join(' ')
  }

  /**
   * Generate notation from a turn object.
   *
   * @param {Turn} turn turn object to stringify
   */
  notation(turn: CubeTurn): string {
    const depth = turn.depth === 1 || (turn.depth === 2 && turn.wide)
      ? ''
      : turn.depth.toString()

    const target = uppercase(turn.target)

    const rotation = turn.rotation === -1
      ? '-'
      : turn.rotation === 2
        ? '2'
        : ''

    const wide = turn.wide ? 'w' : ''

    return `${depth}${target}${wide}${rotation}`
  }

  /**
   * Output puzzle state
   */
  output(): CubeSimpleState {
    const simplify = (face: CubeFaceLower) => flattenBy(this.state[face], 'value')

    return {
      u: simplify('u'),
      l: simplify('l'),
      f: simplify('f'),
      r: simplify('r'),
      b: simplify('b'),
      d: simplify('d'),
    }
  }

  /**
   * Parse a turn
   *
   * @param {string} turn turn notation to parse
   * @param {boolean} unturn reverse turn
   */
  parse(turn: string, unturn?: boolean): CubeTurn {
    const parts = turn.match(/^(\d)*([ulfrbdxyz]){1}(w)?(['-2])?$/i)

    if (!parts) {
      error(`Invalid turn: ${turn}`)
    }

    const depth = parts[1] ? parseInt(parts[1], 10) : 1

    if (depth > this.options.size) {
      error(`Invalid turn: ${turn}`)
    }

    const target = lowercase(<CubeFace | CubeAxis> parts[2])
    const wide = !!parts[3]
    const rotation = "-'".includes(parts[4]) ? -1 : parts[4] === '2' ? 2 : 1
    const whole = 'xyz'.includes(target) || (wide && depth >= this.options.size)

    return {
      depth: wide ? max(2, depth) : depth,
      target,
      rotation: unturn && rotation !== 2 ? rotation * -1 : rotation,
      wide,
      whole,
    }
  }

  /**
   * Reset puzzle state
   */
  reset() {
    const stickers = times(this.options.size ** 2)

    keys(this.state).forEach((face, value) => {
      this.state[face] = stickers.map(() => ({ meta: {}, value }))
    })
  }

  /**
   * Get stickers.
   *
   * @param {string} turnNotation turn to extract stickers from
   */
  stickers(turnNotation?: string): CubeSticker[] {
    if (!turnNotation) {
      return flattenDeep(Object.values(this.state))
    }

    const turn = this.parse(turnNotation)

    // return all stickers for whole-puzzle rotations
    if (turn.target === 'x' || turn.target === 'y' || turn.target === 'z') {
      return flattenDeep(Object.values(this.state))
    }

    const stickers: CubeSticker[] = []

    // include target face stickers
    if (turn.depth === 1 || turn.wide) {
      stickers.push(...this.state[turn.target])
    }

    // include slice stickers
    const relatedFaces = cubeNet[turn.target]

    for (let i = turn.wide ? 0 : turn.depth - 1; i < turn.depth; i += 1) {
      relatedFaces.forEach((source, index) => {
        const [face, angle] = relatedFaces[index]

        stickers.push(...extract(this.state[face], angle, i))
      })
    }

    // include opposite face stickers
    if (turn.depth >= this.options.size) {
      stickers.push(...this.state[cubeOpposites[turn.target]])
    }

    return stickers
  }

  /**
   * Test if the puzzle is solved or matches a specific state.
   *
   * @param {Partial<CubeSimpleState>} state state to test for
   */
  test(state?: Partial<CubeSimpleState>): boolean {
    const output = this.output()

    if (state) {
      return !keys(state).some(face => !hasSameElements(state[face], output[face]))
    }

    return !keys(output).some(face => !isUniform(without(output[face], null)))
  }
}
