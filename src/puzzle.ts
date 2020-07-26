import { identity } from './utils/function';
import { trim } from './utils/string';

/**
 * Puzzle state
 */
export type State<Face extends string, Sticker> = {
  [K in Face]: Sticker[];
}

/**
 * Simplified state
 */
export type SimplifiedState<Face extends string, Value> = {
  [K in Face]?: Value[];
}

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
  originalIndex: number;
  value: Value;
}

/**
 * Puzzle.
 */
export default abstract class Puzzle<
  PuzzleOptions,
  PuzzleState,
  PuzzleTurn
> {

  /**
   * Puzzle options.
   *
   * @type {PuzzleOptions}
   */
  options: PuzzleOptions;

  /**
   * Current puzzle state.
   *
   * @type {PuzzleState}
   */
  state: PuzzleState;

  /**
   * Constructor.
   *
   * @param {PuzzleOptions}  object 
   */
  constructor(options: PuzzleOptions) {
    this.options = options;

    this.reset();
  }

  /**
   * Apply state.
   *
   * @param {T} state
   *
   * @return {void}
   */
  abstract applyState<T>(state: T): void;

  /**
   * Apply a turn.
   *
   * @param {PuzzleTurn}  turn
   *
   * @return {void} 
   */
  abstract applyTurn(turn: PuzzleTurn): void;

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
   * @return {PuzzleTurn} 
   */
  abstract parseTurn(turn: string): PuzzleTurn;

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
