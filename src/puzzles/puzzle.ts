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
   * Output puzzle state
   */
  output(): SimpleState {
    return {} as SimpleState
  }

  /**
   * Parse a single turn
   *
   * @param {string} turn turn notation to parse
   */
  parse(turn: string): Turn {
    return {} as Turn
  }

  /**
   * Parse an algorithm
   *
   * @param {string} turn algorithm to parse
   */
  parseAlgorithm(algorithm: string): Turn[] {
    return algorithm
      .split(' ')
      .map(trim)
      .filter(identity)
      .map(str => this.parse(str))
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
   * Test if the puzzle is solved
   */
  test(): boolean {
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
}
