/* eslint-disable @typescript-eslint/no-unused-vars */
import { identity } from '@/utils/function'
import { trim } from '@/utils/string'

/**
 * Base puzzle class.
 */
export class Puzzle<Options, State, SimpleState, Turn, Sticker> {
  /**
   * Puzzle options
   *
   * @type {Options}
   */
  options: Options

  /**
   * Current puzzle state
   *
   * @type {State}
   */
  state: State

  /**
   * Constructor
   *
   * @param {Options} options
   */
  constructor(options: Options = {} as Options) {
    this.options = options
  }

  /**
   * Apply puzzle state
   */
  apply(state: Partial<SimpleState>): void {
    // ...
  }

  /**
   * Create a new instance of a puzzle
   */
  clone() {
    const clone: this = Reflect.construct(this.constructor, [JSON.parse(JSON.stringify(this.options))])

    clone.apply(this.output())

    return clone
  }

  /**
   * Execute a turn
   */
  execute(turn: Turn): void {
    // ...
  }

  /**
   * Generate a scramble
   */
  generateScramble(depth?: number, prevTurn?: string): string {
    return ''
  }

  /**
   * Generate notation from a turn object.
   *
   * @param {Turn} turn turn object to stringify
   */
  notation(turn: Turn): string {
    return ''
  }

  /**
   * Output puzzle state
   */
  output(): SimpleState {
    return {} as SimpleState
  }

  /**
   * Parse a single turn
   *
   * @param {string} turn turn notation to parse
   * @param {boolean} unturn reverse turn
   */
  parse(turn: string, unturn?: boolean): Turn {
    return {} as Turn
  }

  /**
   * Parse an algorithm
   *
   * @param {string} turn algorithm to parse
   * @param {boolean?} unturn reverse algorithm
   */
  parseAlgorithm(algorithm: string, unturn?: boolean): Turn[] {
    return algorithm
      .split(' ')
      .map(trim)
      .filter(identity)
      .map(str => this.parse(str, unturn))
  }

  /**
   * Reset puzzle state
   */
  reset(): void {
    // ...
  }

  /**
   * Scramble the puzzle
   *
   * @param {number} depth number of scramble turns
   * @param {string} prevTurn previous turn
   */
  scramble(depth?: number, prevTurn?: string): string {
    const scramble = this.generateScramble(depth, prevTurn)

    this.turn(scramble)

    return scramble
  }

  /**
   * Get stickers.
   *
   * @param {string} turnNotation turn to extract stickers from
   */
  stickers(turnNotation?: string): Sticker[] {
    return []
  }

  /**
   * Test if the puzzle is solved or matches a specific state.
   *
   * @param {Partial<SimpleState>} state state to test for
   */
  test(state?: Partial<SimpleState>): boolean {
    return true
  }

  /**
   * Execute an algorithm
   *
   * @param {string} algorithm sequence of turns to execute
   */
  turn(algorithm: string): void {
    this
      .parseAlgorithm(algorithm)
      .forEach(turn => this.execute(turn))
  }

  /**
   * Execute the reverse-turns of an algorithm
   *
   * @param {string} algorithm sequence of turns to reverse
   */
  unturn(algorithm: string): string {
    const turns = this
      .parseAlgorithm(algorithm, true)
      .reverse()

    turns.forEach(turn => this.execute(turn))

    return turns
      .map(turn => this.notation(turn)).join(' ')
  }
}
