import type {
  CubeAxis,
  CubeFace,
  CubeOptions,
  CubeSticker,
  CubeTurn,
} from './types'

import { createFace } from './utils'

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

  parse(source: string): CubeTurn {
    const parts = source.match(/^(\d)*([ulfrbdxyz]){1}(w)?(['-2])?$/i)

    if (!parts) {
      throw new Error(`Invalid turn: ${source}`)
    }

    const depth = parts[1] ? parseInt(parts[1], 10) : 1

    if (depth > this.size) {
      throw new Error(`Turn depth exceeds cube size: ${source}`)
    }

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

  reset() {
    // @todo: add test for this
    this.state.u = createFace(this.size, 'u')
    this.state.d = createFace(this.size, 'd')
    this.state.l = createFace(this.size, 'l')
    this.state.r = createFace(this.size, 'r')
    this.state.f = createFace(this.size, 'f')
    this.state.b = createFace(this.size, 'b')
  }
}
