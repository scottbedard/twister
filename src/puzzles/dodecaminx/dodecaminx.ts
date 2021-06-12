/* eslint-disable @typescript-eslint/no-unused-vars */
import { error } from '@/utils/function';
import { Puzzle } from '@/puzzles/puzzle';

import {
  DodecaminxOptions,
  DodecaminxState,
  DodecaminxStateSimple,
  DodecaminxTurn,
} from './types';

/**
 * Dodecaminx
 */
export class Dodecaminx extends Puzzle<DodecaminxOptions, DodecaminxState, DodecaminxStateSimple, DodecaminxTurn> {
  /**
   * Apply puzzle state
   *
   * @param {DodecaminxStateSimple} state state to apply to the puzzle
   */
  apply(state: DodecaminxStateSimple) {
    error('not implemented');
  }

  /**
   * Execute a turn
   *
   * @param {DodecaminxTurn} turn turn to execute
   */
  execute(turn: DodecaminxTurn) {
    error('not implemented');
  }

  /**
   * Generate a scramble
   *
   * @param {number} depth number of scramble turns
   */
  generateScramble(depth?: number) {
    error('not implemented');
    return '';
  }

  /**
   * Output puzzle state
   */
  output() {
    error('not implemented');
    return {};
  }

  /**
   * Parse a turn
   *
   * @param {string} turn turn notation to parse
   */
  parse(turn: string) {
    error('not implemented');
    return {};
  }

  /**
   * Reset puzzle state
   */
  reset(): void {
    error('not implemented');
  }

  /**
   * Test if the puzzle is solved
   */
  test() {
    return false;
  }
}
