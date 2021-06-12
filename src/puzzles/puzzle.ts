import { identity } from '@/utils/function';
import { trim } from '@/utils/string';

/**
 * Base puzzle class.
 */
export abstract class Puzzle<Options, State, SimpleState, Turn> {
  /**
   * Puzzle options
   *
   * @type {Options}
   */
  options: Options;

  /**
   * Current puzzle state
   *
   * @type {State}
   */
  state: State;

  /**
   * Constructor
   *
   * @param {Options} options
   */
  constructor(options: Options) {
    this.options = options;
  }

  /**
   * Apply puzzle state
   *
   * @param {SimpleState} state state to apply to the puzzle
   */
  abstract apply(state: SimpleState): void;

  /**
   * Execute a turn
   *
   * @param {Turn} turn turn to execute
   */
  abstract execute(turn: Turn): void;

  /**
   * Generate a scramble
   *
   * @param {number} depth number of scramble turns
   */
  abstract generateScramble(depth?: number): string;

  /**
   * Output puzzle state
   */
  abstract output(): SimpleState;

  /**
   * Parse a turn
   *
   * @param {string} turn turn notation to parse
   */
  abstract parse(turn: string): Turn;

  /**
   * Reset puzzle state
   */
  abstract reset(): void;

  /**
   * Scramble the puzzle
   *
   * @param {number} depth number of scramble turns
   */
  scramble(depth?: number): string {
    const scramble = this.generateScramble(depth);

    this.turn(scramble);

    return scramble;
  }

  /**
   * Test if the puzzle is solved
   */
  abstract test(): boolean;

  /**
   * Execute an algorithm
   *
   * @param {string} algorithm sequence of turns to execute
   */
  turn(algorithm: string): void {
    algorithm
      .split(' ')
      .map(trim)
      .filter(identity)
      .map((str) => this.parse(str))
      .forEach((turn) => this.execute(turn));
  }
}
