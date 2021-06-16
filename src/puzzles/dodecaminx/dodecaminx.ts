import { CompositeMatrix, createComposite, mapComposite } from '@/utils/composite-matrix';
import { error } from '@/utils/function';
import { isOdd } from '@/utils/number';
import { keys } from '@/utils/object';
import { lowercase } from '@/utils/string';
import { Puzzle } from '@/puzzles/puzzle';

import {
  DodecaminxFace,
  DodecaminxOptions,
  DodecaminxState,
  DodecaminxStateSimple,
  DodecaminxSticker,
  DodecaminxTurn,
} from './types';

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
  output(): DodecaminxStateSimple {
    const simplify = (composite: CompositeMatrix<DodecaminxSticker>) => mapComposite(composite, (obj) => obj.value);

    return {
      b: simplify(this.state.b),
      bl: simplify(this.state.bl),
      br: simplify(this.state.br),
      d: simplify(this.state.d),
      dbl: simplify(this.state.dbl),
      dbr: simplify(this.state.dbr),
      dl: simplify(this.state.dl),
      dr: simplify(this.state.dr),
      f: simplify(this.state.f),
      l: simplify(this.state.l),
      r: simplify(this.state.r),
      u: simplify(this.state.u),
    };
  }

  /**
   * Parse a turn
   *
   * @param {string} turn turn notation to parse
   */
  parse(turn: string): DodecaminxTurn {
    const parts = turn.match(/^(\d*|\+)?(B|BL|BR|D|DBL|DBR|DL|DR|F|L|R|U){1}(w)?('|-|2|2'|2-)?$/);

    if (!parts) {
      error(`Invalid turn: ${turn}`);
    }

    const prefix = parts[1];
    const target = lowercase(<DodecaminxFace> parts[2]);
    const wide = !!parts[3];
    const rotation = ['-', '\''].includes(parts[4])
      ? -1
      : ['2-', '2\''].includes(parts[4])
        ? -2
        : parts[4] === '2'
          ? 2
          : 1;

    return {
      depth: !prefix && wide
        ? 2
        : !prefix || prefix === '+'
          ? 1
          : Number(prefix),
      rotation,
      target,
      whole: prefix === '+',
      wide,
    };
  }

  /**
   * Reset puzzle state
   */
  reset(): void {
    keys(this.state).forEach((face, index) => {
      this.state[face] = createComposite(5, this.options.size, () => ({ meta: {}, value: index }));
    });
  }

  /**
   * Test if the puzzle is solved
   */
  test() {
    return false;
  }
}
