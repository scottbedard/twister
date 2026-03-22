import { createDodecaminxCenters, createDodecaminxState } from './utils'

import {
  dodecaminxFaces,
  dodecaminxNet,
  dodecaminxOpposites,
} from './constants'

import {
  extractComposite,
  floor,
  injectComposite,
  int,
  min,
  mod,
  rotateComposite,
  sample,
  without,
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
   * Center orientation of each face.
   */
  readonly centers: Record<DodecaminxFace, number>

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

    this.centers = createDodecaminxCenters()

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
        depth: int(1, floor(size / 2), rand),
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
    Object.assign(this.centers, createDodecaminxCenters())
    Object.assign(this.state, createDodecaminxState(this.size))

    return this
  }

  scramble(depth?: number): this {
    return this.turn(this.generateScramble(depth))
  }

  solved(opts?: DodecaminxSolvedOptions): boolean {
    for (const face of dodecaminxFaces) {
      const block = this.state[face]

      const val = block.length === 3
        ? block[2].face
        : block[0][0][0].face

      for (const matrix of block[0]) {
        let i = 0

        for (const sticker of matrix) {
          if (sticker.face !== val) {
            return false
          }

          if (opts?.super && sticker.index !== i++) {
            return false
          }
        }
      }

      if (opts?.super && this.centers[face] !== 0) {
        return false
      }
    }

    return true
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
    // re-call strings with parsed turn objects
    if (typeof turn === 'string') {
      turn
        .split(' ')
        .map(str => str.trim())
        .forEach(n => n && this.turn(this.parseTurn(n)))

      return this
    }

    const { depth, target, rotation, wide, whole } = turn
    const odd = this.size % 2 === 1
    const opposite = dodecaminxOpposites[target]
    const related = dodecaminxNet[target]

    // Rotate target face
    if (depth === 1 || wide || whole) {
      this.state[target] = rotateComposite(this.state[target], rotation)
    }

    if (whole) {
      // Rotate opposite face
      this.state[opposite] = rotateComposite(this.state[opposite], -rotation)

      // Rotate faces adjacent to the target and opposite
      const rotateAdjacent = (target: DodecaminxFace, rotation: number) => {
        dodecaminxNet[target]
          .map(([face, angle]) => rotateComposite(this.state[face], -angle))
          .forEach((face, index) => {
            const [related, angle] = dodecaminxNet[target][mod(index + rotation, 5)]
            this.state[related] = rotateComposite(face, angle)
          })
      }

      rotateAdjacent(target, rotation)
      rotateAdjacent(opposite, -rotation)
    }
    else {
      // Extract and inject layers from related faces
      for (
        let i = wide ? 0 : depth - 1;
        i < min(depth, floor(this.size / 2));
        i += 1
      ) {
        related
          .map(([face, angle]) => extractComposite(this.state[face], angle, i))
          .forEach((layer, index) => {
            const [relatedFace, angle] = related[(index + 5 + rotation) % 5]
            this.state[relatedFace] = injectComposite(this.state[relatedFace], layer, angle, i)
          })
      }
    }

    // Track center orientation if necessary
    if (odd) {
      const centers = { ...this.centers }

      this.centers[target] = mod(centers[target] + rotation, 5)

      if (whole) {
        // rotate opposite center
        this.centers[opposite] = mod(centers[opposite] - rotation, 5)

        // rotate centers adjacent to the target face
        const slice = dodecaminxNet[target].map(obj => obj[0])

        for (let i = 0; i < 5; i++) {
          const from = slice[i]
          const to = slice[mod(i + rotation, 5)]
          const fromAngle = dodecaminxNet[target][i][1]
          const toAngle = dodecaminxNet[target][mod(i + rotation, 5)][1]

          this.centers[to] = mod(centers[from] + (toAngle - fromAngle), 5)
        }

        // rotate centers adjacent to the opposite face
        const oppositeSlice = dodecaminxNet[opposite].map(obj => obj[0])

        for (let i = 0; i < 5; i++) {
          const from = oppositeSlice[i]
          const to = oppositeSlice[mod(i - rotation, 5)]
          const fromAngle = dodecaminxNet[opposite][i][1]
          const toAngle = dodecaminxNet[opposite][mod(i - rotation, 5)][1]

          this.centers[to] = mod(centers[from] + (toAngle - fromAngle), 5)
        }
      }
    }

    return this
  }
}
