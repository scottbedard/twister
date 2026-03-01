import type { CubeOptions, CubeSticker } from './types'
import { createFace } from './utils'

export class Cube {
  readonly rand: () => number

  readonly size: number

  readonly state: {
    u: CubeSticker[]
    d: CubeSticker[]
    l: CubeSticker[]
    r: CubeSticker[]
    f: CubeSticker[]
    b: CubeSticker[]
  }

  constructor(opts: number | CubeOptions) {
    const size = typeof opts === 'number' ? opts : opts.size

    if (size < 1 || !Number.isInteger(size)) {
      throw new Error('Cube size must be a positive integer')
    }

    this.rand = typeof opts === 'number' ? Math.random : opts.rand
    this.size = size
    this.state = {
      u: createFace(size, 0),
      d: createFace(size, 1),
      l: createFace(size, 2),
      r: createFace(size, 3),
      f: createFace(size, 4),
      b: createFace(size, 5),
    }
  }

  reset() {
    // @todo: add test for this
    this.state.u = createFace(this.size, 0)
    this.state.d = createFace(this.size, 1)
    this.state.l = createFace(this.size, 2)
    this.state.r = createFace(this.size, 3)
    this.state.f = createFace(this.size, 4)
    this.state.b = createFace(this.size, 5)
  }
}
