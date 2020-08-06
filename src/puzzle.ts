import { identity } from './utils/function';
import { trim } from './utils/string';

/**
 * Sticker
 */
export type Sticker<Value, Data, Meta = Record<string, unknown>> = {
  data: {
    [K in keyof Data]?: Data[K];
  };
  meta: {
    [K in keyof Meta]: Meta[K];
  },
  value: Value;
}

/**
 * Puzzle.
 */
export default abstract class Puzzle<Options, State, Turn> {

  /**
   * Puzzle options.
   *
   * @type {Options}
   */
  options: Options;

  /**
   * Current puzzle state.
   *
   * @type {State}
   */
  state: State;

  /**
   * Constructor.
   *
   * @param {Options}  object 
   */
  constructor(options: Options) {
    this.options = options;

    this.reset();
  }

  /**
   * Apply state.
   *
   * @param {unknown} state
   *
   * @return {void}
   */
  abstract applyState(state: unknown): void;

  /**
   * Apply a turn.
   *
   * @param {Turn}  turn
   *
   * @return {void} 
   */
  abstract applyTurn(turn: Turn): void;

  /**
   * Generate a scramble.
   *
   * @param {number}  length
   *
   * @return {void}
   */
  abstract generateScramble(length?: number): string;
  
  /**
   * Test if the puzzle is solved.
   *
   * @return {boolean}
   */
  abstract isSolved(): boolean;

  /**
   * Reset the puzzle state.
   *
   * @return {void}
   */
  abstract reset(): void;

  /**
   * Parse a turn.
   *
   * @param {string}  turn
   *
   * @return {Turn} 
   */
  abstract parseTurn(turn: string): Turn;

  /**
   * Scramble the puzzle.
   *
   * @param {number}  length
   *
   * @return {void}
   */
  scramble(length?: number): void {
    this.reset();
    this.turn(this.generateScramble(length));
  }

  /**
   * Export puzzle state.
   */
  abstract toState(): Record<string, unknown>;

  /**
   * Apply a series of turns.
   *
   * @param {string}  algorithm
   *
   * @return {void} 
   */
  turn(algorithm: string): void {
    algorithm
      .split(' ')
      .map(trim)
      .filter(identity)
      .map(turn => this.parseTurn(turn))
      .forEach(turn => this.applyTurn(turn));
  }
}
