import { CompositeMatrix, createComposite, extractComposite, injectComposite, mapComposite, rotateComposite } from '@/utils/composite-matrix'
import { error } from '@/utils/function'
import { floor, isOdd, max, min, rand } from '@/utils/number'
import { keys } from '@/utils/object'
import { flattenDeep, hasSameElements, isUniform, last, sample, without } from '@/utils/array'
import { lowercase, uppercase } from '@/utils/string'
import { Puzzle } from '@/puzzles/puzzle'

import {
  dodecaminxNet,
  dodecaminxOpposites,
} from './constants'

import {
  DodecaminxFace,
  DodecaminxFaceLower,
  DodecaminxOptions,
  DodecaminxState,
  DodecaminxStateSimple,
  DodecaminxSticker,
  DodecaminxTurn,
} from './types'

/**
 * Dodecaminx
 */
export class Dodecaminx extends Puzzle<DodecaminxOptions, DodecaminxState, DodecaminxStateSimple, DodecaminxTurn, DodecaminxSticker> {
  /**
   * Constructor
   *
   * @param {Partial<CubeOptions>} options puzzle options
   */
  constructor(options: Partial<DodecaminxOptions> = {}) {
    const {
      random = Math.random,
      size = 3,
    } = options

    super({
      random,
      size,
    })

    this.state = {
      b: [[]],
      bl: [[]],
      br: [[]],
      d: [[]],
      dbl: [[]],
      dbr: [[]],
      dl: [[]],
      dr: [[]],
      f: [[]],
      l: [[]],
      r: [[]],
      u: [[]],
    }

    this.reset()
  }

  /**
   * Apply puzzle state
   *
   * @param {Partial<DodecaminxStateSimple>} state state to apply to the puzzle
   */
  apply(state: Partial<DodecaminxStateSimple>) {
    const symbol = Symbol()

    keys(state).forEach(face => {
      const [corners, middles, center = symbol] = state[face]

      corners.forEach((matrix, i) => {
        matrix.forEach((value, j) => {
          this.state[face][0][i][j].value = value
        })
      })

      if (isOdd(this.options.size)) {
        if (middles) {
          middles.forEach((values, i) => {
            values.forEach((value, j) => {
              this.state[face][1][i][j].value = value
            })
          })
        }

        if (center !== symbol) {
          this.state[face][2].value = center
        }
      }
    })
  }

  /**
   * Execute a turn
   *
   * @param {DodecaminxTurn} turn turn to execute
   */
  execute(turn: DodecaminxTurn) {
    const relatedFaces = dodecaminxNet[turn.target]
    const oppositeTarget = dodecaminxOpposites[turn.target]

    // rotate target face
    if (turn.depth === 1 || turn.wide || turn.whole) {
      this.state[turn.target] = rotateComposite(this.state[turn.target], turn.rotation)
    }

    if (turn.whole) {
      // rotate opposite face
      this.state[oppositeTarget] = rotateComposite(this.state[oppositeTarget], -turn.rotation)

      // rotate faces adjacent to the target and opposite
      const rotateAdjacent = (target: DodecaminxFaceLower, rotation: number) => {
        dodecaminxNet[target]
          .map(([face, angle]) => rotateComposite(this.state[face], -angle))
          .forEach((face, index) => {
            const [relatedFace, angle] = dodecaminxNet[target][(index + 5 + rotation) % 5]
            this.state[relatedFace] = rotateComposite(face, angle)
          })
      }

      rotateAdjacent(turn.target, turn.rotation)
      rotateAdjacent(oppositeTarget, -turn.rotation)
    } else {
      // extract and inject layers from related faces
      for (
        let i = turn.wide ? 0 : turn.depth - 1;
        i < min(turn.depth, floor(this.options.size / 2));
        i += 1
      ) {
        relatedFaces
          .map(([face, angle]) => extractComposite(this.state[face], angle, i))
          .forEach((layer, index) => {
            const [relatedFace, angle] = relatedFaces[(index + 5 + turn.rotation) % 5]
            this.state[relatedFace] = injectComposite(this.state[relatedFace], layer, angle, i)
          })
      }
    }
  }

  /**
   * Generate a scramble
   *
   * @param {number} depth number of scramble turns
   * @param {string} prevTurn previous turn
   */
  generateScramble(depth: number = max(30, this.options.size ** 3), prevTurn?: string) {
    const turns: DodecaminxTurn[] = []
    const { random, size } = this.options

    for (let i = 0; i < depth; i += 1) {
      const prevTarget = i === 0 && prevTurn
        ? this.parse(prevTurn).target
        : last(turns)?.target

      turns.push({
        depth: rand(1, floor(size / 2), random),
        rotation: sample([-2, -1, 1, 2], random),
        target: sample(without(keys(dodecaminxNet), prevTarget), random),
        whole: false,
        wide: sample([true, false], random),
      })
    }

    return turns.map(turn => {
      const wideSuffix = turn.wide && turn.depth > 1 && size > 2 ? 'w' : ''
      const depthPrefix = turn.depth > (wideSuffix ? 2 : 1) ? turn.depth : ''
      const rotationSuffix = turn.rotation === -2
        ? '2-'
        : turn.rotation === -1
          ? '-'
          : turn.rotation === 2
            ? '2'
            : ''

      return `${depthPrefix}${turn.target.toUpperCase()}${wideSuffix}${rotationSuffix}`
    }).join(' ')
  }

  /**
   * Generate notation from a turn object.
   *
   * @param {Turn} turn turn object to stringify
   */
  notation(turn: DodecaminxTurn): string {
    const depth = turn.depth === 1 || (turn.depth === 2 && turn.wide)
      ? ''
      : turn.depth.toString()

    const target = turn.whole
      ? lowercase(turn.target)
      : uppercase(turn.target)

    const rotation = turn.rotation === -2
      ? '2-'
      : turn.rotation === -1
        ? '-'
        : turn.rotation === 2
          ? '2'
          : ''

    const wide = turn.wide ? 'w' : ''

    return `${depth}${target}${wide}${rotation}`
  }

  /**
   * Output puzzle state
   */
  output(): DodecaminxStateSimple {
    const simplify = (composite: CompositeMatrix<DodecaminxSticker>) => mapComposite(composite, obj => obj.value)

    return {
      b: simplify(this.state.b),
      bl: simplify(this.state.bl),
      br: simplify(this.state.br),
      d: simplify(this.state.d),
      dbl: simplify(this.state.dbl),
      dbr: simplify(this.state.dbr),
      dl: simplify(this.state.dl),
      dr: simplify(this.state.dr),
      f: simplify(this.state.f),
      l: simplify(this.state.l),
      r: simplify(this.state.r),
      u: simplify(this.state.u),
    }
  }

  /**
   * Parse a turn
   *
   * @param {string} turn turn notation to parse
   * @param {boolean} unturn reverse turn
   */
  parse(turn: string, unturn?: boolean): DodecaminxTurn {
    const parts = turn.match(/^(\d*)?(B|BL|BR|D|DBL|DBR|DL|DR|F|L|R|U|b|bl|br|d|dbl|dbr|dl|dr|f|l|r|u){1}(w)?('|-|2|2'|2-)?$/)

    if (!parts) {
      error(`Invalid turn: ${turn}`)
    }

    const prefix = parts[1]
    const target = lowercase(<DodecaminxFace> parts[2])
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
      rotation: unturn ? rotation * -1 : rotation,
      target,
      whole: parts[2] === target,
      wide,
    }
  }

  /**
   * Reset puzzle state
   */
  reset(): void {
    keys(this.state).forEach((face, index) => {
      this.state[face] = createComposite(5, this.options.size, () => ({ meta: {}, value: index }))
    })
  }

  /**
   * Get stickers.
   *
   * @param {string} turnNotation turn to extract stickers from
   */
  stickers(turnNotation?: string): DodecaminxSticker[] {
    if (!turnNotation) {
      return flattenDeep(Object.values(this.state))
    }

    const turn = this.parse(turnNotation)

    // return all stickers for whole-puzzle rotations
    if (turn.whole) {
      return flattenDeep(Object.values(this.state))
    }

    const stickers: DodecaminxSticker[] = []

    // include target face stickers
    if (turn.depth === 1 || turn.wide) {
      stickers.push(...flattenDeep(this.state[turn.target]))
    }

    // include layers from related faces
    for (
      let i = turn.wide ? 0 : turn.depth - 1;
      i < min(turn.depth, floor(this.options.size / 2));
      i += 1
    ) {
      dodecaminxNet[turn.target].forEach(([face, angle]) => {
        stickers.push(...flattenDeep(extractComposite(this.state[face], angle, i)))
      })
    }

    return stickers
  }

  /**
   * Test if the puzzle is solved or matches a specific state.
   *
   * @param {Partial<DodecaminxStateSimple>} state state to test for
   */
  test(state?: Partial<DodecaminxStateSimple>) {
    const output = this.output()

    if (state) {
      return !keys(state).some(face => !hasSameElements(flattenDeep(state[face]), flattenDeep(output[face])))
    }

    return !keys(output).some(face => !isUniform(without(flattenDeep(output[face]), null)))
  }
}
