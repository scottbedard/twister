import { coords, extract, injectMatrix, mod, rotate, quadrant } from '@/utils'
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
   * Rotation of center stickers.
   */
  readonly centers: Record<CubeFace, number>

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

    this.centers = {
      b: 0,
      d: 0,
      f: 0,
      l: 0,
      r: 0,
      u: 0,
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
   * Get the rotation of a sticker relative to it's starting position. This is
   * primarily used for rendering super-cubes.
   */
  getRotation(sticker: CubeSticker): number {
    for (const face of ['u', 'd', 'l', 'r', 'f', 'b'] as const) {
      const index = this.state[face].findIndex(
        s => s.face === sticker.face && s.index === sticker.index,
      )

      if (index < 0) {
        continue
      }

      const { odd, row, col, mid } = coords(index, this.size)

      if (odd && row === mid && col === mid) {
        return this.centers[face]
      }

      const current = quadrant(index, this.size)
      const original = quadrant(sticker.index, this.size)
      return mod(current - original, 4)
    }

    return 0
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
    this.state.u = createFace(this.size, 'u')
    this.state.d = createFace(this.size, 'd')
    this.state.l = createFace(this.size, 'l')
    this.state.r = createFace(this.size, 'r')
    this.state.f = createFace(this.size, 'f')
    this.state.b = createFace(this.size, 'b')
  }

  /**
   * Apply a single turn to the cube
   */
  turn(turn: CubeTurn | string): void {
    const normalized = typeof turn === 'string' ? this.parse(turn) : turn

    const {
      depth,
      rotation,
      target,
      wide,
    } = normalized

    // treat axis turns as maximally deep face turns
    if (target === 'x' || target === 'y' || target === 'z') {
      this.turn({
        depth: this.size,
        rotation,
        target: cubeAxes[target],
        wide,
      })

      return
    }

    // rotate target face
    if (depth === 1 || wide) {
      if (this.size % 2 === 1) {
        this.centers[target] = mod(this.centers[target] + rotation, 4)
      }

      this.state[target] = rotate(this.state[target], rotation)
    }

    // rotate the opposite face
    if (depth >= this.size) {
      const opposite = cubeOpposites[target]

      this.state[opposite] = rotate(this.state[opposite], -rotation)
    }

    // rotate slices
    const relatedFaces = cubeNet[target]

    for (let i = wide ? 0 : depth - 1; i < depth; i += 1) {
      relatedFaces.map((_, index) => {
        // extract slices from adjacent face
        const [face, angle] = relatedFaces[index]
        return extract(this.state[face], angle, i)
      }).forEach((slice, index) => {
        // inject slices into target faces
        const [relatedFace, angle] = relatedFaces[mod(index + 4 + rotation, 4)]

        this.state[relatedFace] = injectMatrix(slice, this.state[relatedFace], angle, i)
      })
    }
  }
}
