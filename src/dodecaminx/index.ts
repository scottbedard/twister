import type { Puzzle } from '@/puzzle'
import { createDodecaminxFace } from './utils'
import type {
  DodecaminxTurn,
  DodecaminxSolvedOptions,
  DodecaminxOptions,
  DodecaminxFace,
} from './types'

export class Dodecaminx implements Puzzle<DodecaminxTurn, DodecaminxSolvedOptions> {
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
  readonly state: Record<DodecaminxFace, unknown[]>

  constructor(opts: number | DodecaminxOptions) {
    const size = typeof opts === 'number' ? opts : opts.size

    if (size < 1 || !Number.isInteger(size)) {
      throw new Error('Dodecaminx size must be a positive integer')
    }

    this.rand = typeof opts === 'number' ? Math.random : opts.rand ?? Math.random

    this.size = size

    this.state = {
      b: createDodecaminxFace('b', size),
      bl: createDodecaminxFace('bl', size),
      br: createDodecaminxFace('br', size),
      d: createDodecaminxFace('d', size),
      dbl: createDodecaminxFace('dbl', size),
      dbr: createDodecaminxFace('dbr', size),
      dl: createDodecaminxFace('dl', size),
      dr: createDodecaminxFace('dr', size),
      f: createDodecaminxFace('f', size),
      l: createDodecaminxFace('l', size),
      r: createDodecaminxFace('r', size),
      u: createDodecaminxFace('u', size),
    }
  }

  generateScramble(depth?: number): string {
    console.log('not implemented', depth)

    return ''
  }

  parseTurn(source: string): DodecaminxTurn {
    console.log('not implemented', source)

    return {
      type: 'turn',
      axis: 'x',
      angle: 0,
    }
  }

  reset(): this {
    const size = this.size

    this.state.b = createDodecaminxFace('b', size)
    this.state.bl = createDodecaminxFace('bl', size)
    this.state.br = createDodecaminxFace('br', size)
    this.state.d = createDodecaminxFace('d', size)
    this.state.dbl = createDodecaminxFace('dbl', size)
    this.state.dbr = createDodecaminxFace('dbr', size)
    this.state.dl = createDodecaminxFace('dl', size)
    this.state.dr = createDodecaminxFace('dr', size)
    this.state.f = createDodecaminxFace('f', size)
    this.state.l = createDodecaminxFace('l', size)
    this.state.r = createDodecaminxFace('r', size)
    this.state.u = createDodecaminxFace('u', size)

    return this
  }

  scramble(depth?: number): this {
    console.log('not implemented', depth)

    return this
  }

  solved(opts?: DodecaminxSolvedOptions): boolean {
    console.log('not implemented', opts)

    return false
  }

  stringifyTurn(turn: DodecaminxTurn): string {
    console.log('not implemented', turn)

    return ''
  }

  turn(turn: DodecaminxTurn | string): this {
    console.log('not implemented', turn)

    return this
  }
}
