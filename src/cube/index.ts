import { extract, injectMatrix, rotate } from '@/utils'
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
  readonly rand: () => number

  readonly size: number

  readonly state: Record<CubeFace, CubeSticker[]>

  constructor(opts: number | CubeOptions) {
    const size = typeof opts === 'number' ? opts : opts.size

    if (size < 1 || !Number.isInteger(size)) {
      throw new Error('Cube size must be a positive integer')
    }

    this.rand = typeof opts === 'number' ? Math.random : opts.rand
    this.size = size
    this.state = {
      u: createFace(size, 'u'),
      d: createFace(size, 'd'),
      l: createFace(size, 'l'),
      r: createFace(size, 'r'),
      f: createFace(size, 'f'),
      b: createFace(size, 'b'),
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
        const [relatedFace, angle] = relatedFaces[(index + 4 + rotation) % 4]

        this.state[relatedFace] = injectMatrix(slice, this.state[relatedFace], angle, i)
      })
    }
  }
}
