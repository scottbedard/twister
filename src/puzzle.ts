/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * Base puzzle class.
 */
export abstract class Puzzle<Options, State, Turn> {
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
   * Apply puzzle state.
   *
   * @param {any} state state to apply to the puzzle
   */
  abstract apply(state: State): void;

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
   * Execute a sequence of turns.
   *
   * @param {algorithm} string turns to execute
   */
  abstract execute(algorithm: string): void;

  /**
   * Generate a scramble.
   *
   * @param {number} depth number of moves to execute
   */
  abstract generateScramble(depth: number): string;

  /**
   * Output puzzle state.
   */
  abstract output(): State;

  /**
   * Parse a turn.
   *
   * @param {string} turn Turn to parse
   */
  abstract parse(turn: string): Turn;

  /**
   * Reset puzzle state.
   */
  abstract reset(): void;

  /**
   * Scramble the puzzle.
   *
   * @param {number} depth number of moves to execute
   */
  scramble(depth: number): void {
    this.execute(this.generateScramble(depth));
  }

  /**
   * Test if the puzzle is solved.
   */
  abstract test(): boolean;
}
