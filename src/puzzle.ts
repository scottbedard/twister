/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */

/**
 * Base puzzle class.
 */
export abstract class Puzzle {
  /**
   * Generate a scramble.
   *
   * @param {number} depth number of moves to execute
   */
  generateScramble(depth: number): string {
    return '';
  }

  /**
   * Scramble the puzzle.
   *
   * @param {number} depth number of moves to execute
   */
  scramble(depth: number): void { }

  /**
   * Test if the puzzle is solved.
   */
  test(): boolean {
    return true;
  }
}
