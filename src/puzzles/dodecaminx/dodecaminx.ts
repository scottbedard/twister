/* eslint-disable @typescript-eslint/no-unused-vars */
import { error } from '@/utils/function';
import { keys } from '@/utils/object';
import { Puzzle } from '@/puzzles/puzzle';
import { createComposite, mapComposite } from '@/utils/composite-matrix';

import {
  DodecaminxOptions,
  DodecaminxState,
  DodecaminxStateSimple,
  DodecaminxSticker,
  DodecaminxTurn,
} from './types';
import { isOdd } from '@/utils/number';

/**
 * Dodecaminx
 */
export class Dodecaminx extends Puzzle<DodecaminxOptions, DodecaminxState, DodecaminxStateSimple, DodecaminxTurn> {
  /**
   * Constructor
   *
   * @param {Partial<CubeOptions>} options puzzle options
   */
  constructor(options: Partial<DodecaminxOptions>) {
    const {
      random = Math.random,
      size = 3,
    } = options;

    super({
      random,
      size,
    });

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
    };

    this.reset();
  }

  /**
   * Apply puzzle state
   *
   * @param {Partial<DodecaminxStateSimple>} state state to apply to the puzzle
   */
  apply(state: Partial<DodecaminxStateSimple>) {
    keys(state).forEach((face) => {
      const [corners, middles, center] = state[face];

      corners.forEach((matrix, i) => {
        matrix.forEach((value, j) => {
          this.state[face][0][i][j].value = value;
        });
      });

      if (isOdd(this.options.size)) {
        if (middles) {
          middles.forEach((values, i) => {
            values.forEach((value, j) => {
              this.state[face][1][i][j].value = value;
            });
          });
        }

        if (center) {
          this.state[face][2].value = center;
        }
      }
    });
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
  // @ts-ignore
  output() {
    error('not implemented');
    return this.state;
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
    const { size } = this.options;

    const stickerFactory = (value: number): () => DodecaminxSticker => () => ({ meta: {}, value });

    this.state.b = createComposite(5, size, stickerFactory(0));
    this.state.bl = createComposite(5, size, stickerFactory(1));
    this.state.br = createComposite(5, size, stickerFactory(2));
    this.state.d = createComposite(5, size, stickerFactory(3));
    this.state.dbl = createComposite(5, size, stickerFactory(4));
    this.state.dbr = createComposite(5, size, stickerFactory(5));
    this.state.dl = createComposite(5, size, stickerFactory(6));
    this.state.dr = createComposite(5, size, stickerFactory(7));
    this.state.f = createComposite(5, size, stickerFactory(8));
    this.state.l = createComposite(5, size, stickerFactory(9));
    this.state.r = createComposite(5, size, stickerFactory(10));
    this.state.u = createComposite(5, size, stickerFactory(11));
  }

  /**
   * Test if the puzzle is solved
   */
  test() {
    return false;
  }
}
