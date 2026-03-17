import { createDodecaminxState } from './utils'
import { dodecaminxNet, dodecaminxOpposites, dodecaminxFaces } from './constants'
import {
  extractComposite,
  injectComposite,
  int,
  floor,
  min,
  sample,
  without,
  rotateComposite,
} from '@/utils'
import type { Puzzle } from '@/puzzle'
import type {
  DodecaminxTurn,
  DodecaminxSolvedOptions,
  DodecaminxOptions,
  DodecaminxFace,
  DodecaminxState,
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
  readonly state: DodecaminxState

  constructor(opts: number | DodecaminxOptions) {
    const size = typeof opts === 'number' ? opts : opts.size

    if (size < 1 || !Number.isInteger(size)) {
      throw new Error('Dodecaminx size must be a positive integer')
    }

    this.rand = typeof opts === 'number' ? Math.random : opts.rand ?? Math.random

    this.size = size

    this.state = createDodecaminxState(size)
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
    Object.assign(this.state, createDodecaminxState(this.size))

    return this
  }

  scramble(depth?: number): this {
    return this.turn(this.generateScramble(depth))
  }

  solved(opts?: DodecaminxSolvedOptions): boolean {
    // const { state } = this

    // for (const face of state) {
    //   const val = state[face]

    //   for (const sticker of val) {
    //     if (sticker.face !== face) {
    //       return false
    //     }
    //   }

    //   if (opts.super) {
    // }

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
    if (typeof turn === 'string') {
      turn
        .split(' ')
        .map(str => str.trim())
        .filter(str => str.length)
        .forEach(notation => this.turn(this.parseTurn(notation)))

      return this
    }

    const t = typeof turn === 'string' ? this.parseTurn(turn) : turn
    const relatedFaces = dodecaminxNet[t.target]
    const oppositeTarget = dodecaminxOpposites[t.target]

    // Rotate target face
    if (t.depth === 1 || t.wide || t.whole) {
      this.state[t.target] = rotateComposite(this.state[t.target], t.rotation)
    }

    if (t.whole) {
      // Rotate opposite face
      this.state[oppositeTarget] = rotateComposite(this.state[oppositeTarget], -t.rotation)

      // Rotate faces adjacent to the target and opposite
      const rotateAdjacent = (target: DodecaminxFace, rotation: number) => {
        dodecaminxNet[target]
          .map(([face, angle]) => rotateComposite(this.state[face], -angle))
          .forEach((face, index) => {
            const [relatedFace, angle] = dodecaminxNet[target][(index + 5 + rotation) % 5]
            this.state[relatedFace] = rotateComposite(face, angle)
          })
      }

      rotateAdjacent(t.target, t.rotation)
      rotateAdjacent(oppositeTarget, -t.rotation)
    }
    else {
      // Extract and inject layers from related faces
      for (
        let i = t.wide ? 0 : t.depth - 1;
        i < min(t.depth, floor(this.size / 2));
        i += 1
      ) {
        relatedFaces
          .map(([face, angle]) => extractComposite(this.state[face], angle, i))
          .forEach((layer, index) => {
            const [relatedFace, angle] = relatedFaces[(index + 5 + t.rotation) % 5]
            this.state[relatedFace] = injectComposite(this.state[relatedFace], layer, angle, i)
          })
      }
    }

    return this
  }
}
