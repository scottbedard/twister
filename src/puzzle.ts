import { identity } from './utils/function';
import { trim } from './utils/string';

/**
 * Sticker
 */
export type Sticker<Data, Value> = {
  data: {
    [K in keyof Data]?: Data[K]
  },
  value: Value,
}

/**
 * Puzzle.
 */
export default abstract class Puzzle<Options, State, StateSummary, Turn> {

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
   * Apply puzzle state.
   *
   * @param {StateSummary} state
   *
   * @return {void}
   */
  abstract apply(state: StateSummary): void;

  /**
   * Execute a single turn.
   *
   * @param {Turn}  turn
   *
   * @return {void} 
   */
  abstract execute(turn: Turn): void;

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
   * Output puzzle state.
   *
   * @return {StateSummary}
   */
  abstract output(): StateSummary;

  /**
   * Parse a single turn.
   *
   * @param {string}  turn
   *
   * @return {Turn} 
   */
  abstract parse(turn: string): Turn;

  /**
   * Reset puzzle state.
   *
   * @return {void}
   */
  abstract reset(): void;

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
   * Execute multiple turns.
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
      .map(turn => this.parse(turn))
      .forEach(turn => this.execute(turn));
  }
}
