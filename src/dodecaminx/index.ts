import { createDodecaminxFace } from './utils'
import { dodecaminxFaces } from './constants'
import { int, sample, without } from '@/utils'
import type { Puzzle } from '@/puzzle'
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

  generateScramble(depth: number = Math.max(30, this.size ** 3)): string {
    const { rand, size } = this
    const turns: DodecaminxTurn[] = []

    let face: DodecaminxFace = sample(dodecaminxFaces, rand)

    for (let i = 0; i < depth; i += 1) {
      turns.push({
        depth: int(1, Math.floor(size / 2), rand),
        rotation: sample([-2, -1, 1, 2], rand),
        target: sample(without(dodecaminxFaces, face), rand),
        whole: false,
        wide: sample([true, false], rand),
      })

      face = sample(without(dodecaminxFaces, face), rand)
    }

    return turns.map(turn => this.stringifyTurn(turn)).join(' ')
  }

  parseTurn(source: string): DodecaminxTurn {
    const parts = source.match(/^(\d*)?(B|BL|BR|D|DBL|DBR|DL|DR|F|L|R|U|b|bl|br|d|dbl|dbr|dl|dr|f|l|r|u){1}(w)?('|-|2|2'|2-)?$/)

    if (!parts) {
      throw new Error(`Invalid turn: ${source}`)
    }

    const prefix = parts[1]
    const target = parts[2].toLowerCase() as DodecaminxFace
    const wide = !!parts[3]
    const rotation = ['-', '\''].includes(parts[4])
      ? -1
      : ['2-', '2\''].includes(parts[4])
          ? -2
          : parts[4] === '2'
            ? 2
            : 1

    return {
      depth: !prefix && wide
        ? 2
        : !prefix || prefix === '+'
            ? 1
            : Number(prefix),
      rotation,
      target,
      whole: parts[2] === target,
      wide,
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
    const scramble = this.generateScramble(depth)

    console.log({ scramble })

    return this
  }

  solved(opts?: DodecaminxSolvedOptions): boolean {
    console.log('not implemented', opts)

    return false
  }

  stringifyTurn(turn: DodecaminxTurn): string {
    const depth = turn.depth === 1 || (turn.depth === 2 && turn.wide)
      ? ''
      : turn.depth.toString()

    const target = turn.whole
      ? turn.target.toLowerCase()
      : turn.target.toUpperCase()

    const rotation = turn.rotation === -2
      ? '2-'
      : turn.rotation === -1
        ? '-'
        : turn.rotation === 2
          ? '2'
          : ''

    const wide = turn.wide ? 'w' : ''

    if (turn.whole) {
      return `${target.toLowerCase()}${rotation}`
    }

    return `${depth}${target}${wide}${rotation}`
  }

  turn(turn: DodecaminxTurn | string): this {
    console.log('not implemented', turn)

    return this
  }
}
