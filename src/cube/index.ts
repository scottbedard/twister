import { extract, injectMatrix, mod, rotate } from '@/utils'
import { cubeAxes, cubeNet, cubeOpposites } from './constants'
import { createFace } from './utils'
import type {
  CubeAxis,
  CubeFace,
  CubeOptions,
  CubeSticker,
  CubeTurn,
} from './types'

export class Cube {
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
   * Parse turn notation
   */
  parse(source: string): CubeTurn {
    const parts = source.match(/^(\d)*([ulfrbdxyz]){1}(w)?(['-2])?$/i)

    if (!parts) {
      throw new Error(`Invalid turn: ${source}`)
    }

    const depth = Math.min(this.size, parts[1] ? parseInt(parts[1], 10) : 1)
    const target = parts[2].toLowerCase() as CubeFace | CubeAxis
    const wide = !!parts[3]
    const rotation = '-\''.includes(parts[4]) ? -1 : parts[4] === '2' ? 2 : 1

    return {
      depth: wide ? Math.max(2, depth) : depth,
      target,
      rotation,
      wide,
    }
  }

  /**
   * Reset the puzzle to it's starting state
   */
  reset() {
    // @todo: add test for this
    this.state.b = createFace(this.size, 'b')
    this.state.d = createFace(this.size, 'd')
    this.state.f = createFace(this.size, 'f')
    this.state.l = createFace(this.size, 'l')
    this.state.r = createFace(this.size, 'r')
    this.state.u = createFace(this.size, 'u')
  }

  /**
   * Apply a single turn to the cube
   */
  turn(turn: CubeTurn | string): Cube {
    const normalized = typeof turn === 'string' ? this.parse(turn) : turn

    const {
      depth,
      rotation,
      target,
      wide,
    } = normalized

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

        this.state[face] = injectMatrix(slice, this.state[face], angle, i)
      })
    }

    return this
  }
}
