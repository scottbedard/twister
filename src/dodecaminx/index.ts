import type { Puzzle } from '@/puzzle'
import { createCompositeMatrix } from '@/utils'
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
      b: createCompositeMatrix(5, size),
      bl: createCompositeMatrix(5, size),
      br: createCompositeMatrix(5, size),
      d: createCompositeMatrix(5, size),
      dbl: createCompositeMatrix(5, size),
      dbr: createCompositeMatrix(5, size),
      dl: createCompositeMatrix(5, size),
      dr: createCompositeMatrix(5, size),
      f: createCompositeMatrix(5, size),
      l: createCompositeMatrix(5, size),
      r: createCompositeMatrix(5, size),
      u: createCompositeMatrix(5, size),
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
    console.log('not implemented')

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
