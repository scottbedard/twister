import { CompositeMatrix, createComposite, extractComposite, injectComposite, mapComposite, rotateComposite } from '@/utils/composite-matrix';
import { error } from '@/utils/function';
import { floor, isOdd, max, rand } from '@/utils/number';
import { keys } from '@/utils/object';
import { last, sample, without } from '@/utils/array';
import { lowercase } from '@/utils/string';
import { Puzzle } from '@/puzzles/puzzle';

import { dodecaminxNet } from './constants';

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
    if (turn.whole) {
      // @todo
    } else {
      // rotate target face
      if (turn.depth === 1 || turn.wide) {
        this.state[turn.target] = rotateComposite(this.state[turn.target], turn.rotation);
      }

      // rotate slices
      const relatedFaces = dodecaminxNet[turn.target];

      for (let i = turn.wide ? 0 : turn.depth - 1; i < turn.depth; i += 1) {
        relatedFaces.map((source, index) => {
          // extract layers from adjacent face
          const [face, angle] = relatedFaces[index];

          return extractComposite(this.state[face], angle, i);
        }).forEach((layer, index) => {
          // inject layers into target faces
          const [relatedFace, angle] = relatedFaces[(index + 5 + turn.rotation) % 5];

          this.state[relatedFace] = injectComposite(this.state[relatedFace], layer, angle, i);
        });
      }
    }
  }

  /**
   * Generate a scramble
   *
   * @param {number} depth number of scramble turns
   */
  generateScramble(depth: number = max(30, this.options.size ** 3)) {
    const turns: DodecaminxTurn[] = [];
    const { random, size } = this.options;

    for (let i = 0; i < depth; i += 1) {
      turns.push({
        depth: rand(1, floor(size / 2), random),
        rotation: sample([-2, -1, 1, 2], random),
        target: sample(without(keys(dodecaminxNet), last(turns)?.target), random),
        whole: false,
        wide: sample([true, false], random),
      });
    }

    return turns.map((turn) => {
      const wideSuffix = turn.wide && turn.depth > 1 && size > 2 ? 'w' : '';
      const depthPrefix = turn.depth > (wideSuffix ? 2 : 1) ? turn.depth : '';
      const rotationSuffix = turn.rotation === -2
        ? '2-'
        : turn.rotation === -1
          ? '-'
          : turn.rotation === 2
            ? '2'
            : '';

      return `${depthPrefix}${turn.target.toUpperCase()}${wideSuffix}${rotationSuffix}`;
    }).join(' ');
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
    const parts = turn.match(/^(\d*)?(B|BL|BR|D|DBL|DBR|DL|DR|F|L|R|U|b|bl|br|d|dbl|dbr|dl|dr|f|l|r|u){1}(w)?('|-|2|2'|2-)?$/);

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
      whole: parts[2] === target,
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
