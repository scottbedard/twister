import {
  defaultValues,
  dodecaminxIntersections,
} from './constants';

import {
  createFace,
  faceIsSolved,
  getFaceStickers,
  getSliceStickers,
  parseDodecaminxTurn,
  rotateFace,
  rotatePuzzle,
  rotateSlices,
  simplifyFace,
  stringifyTurn,
} from './helpers';

import { sample } from '../utils/array';
import { error, identity } from '../utils/function';
import { floor, isInteger, max, rand } from '../utils/number';
import { Sticker } from '../puzzle';

import Puzzle from '../puzzle';

// options
export type DodecaminxOptions = {
  random?: () => number,
  size: number,
  values?: Record<DodecaminxFace, DodecaminxValue>,
};

// face
export type DodecaminxFace = 'u' | 'f' | 'l' | 'r' | 'bl' | 'br' | 'dl' | 'dr' | 'dbl' | 'dbr' | 'b' | 'd';

export type DodecaminxFaceObject<Data> = {
  center: DodecaminxSticker<Data> | null,
  corners: DodecaminxSticker<Data>[][],
  middles: DodecaminxSticker<Data>[][],
};

export type DodecaminxFaceSimple = [
  DodecaminxValue[][], // corners
  DodecaminxValue[][]?, // middles
  DodecaminxValue?, // center
];

export type DodecaminxSliceObject<Data> = {
  leading: DodecaminxSticker<Data>[],
  middle: DodecaminxSticker<Data> | null,
  trailing: DodecaminxSticker<Data>[],
}

// value
export type DodecaminxValue = null | number | string;

// sticker
export type DodecaminxSticker<Data> = Sticker<DodecaminxValue, Data>;

// state
export type DodecaminxState<Data> = Record<DodecaminxFace, DodecaminxFaceObject<Data>>;

// state summary
export type DodecaminxStateSummary = Record<DodecaminxFace, DodecaminxFaceSimple>;

// turn
export type DodecaminxTurn = {
  depth: number,
  rotation: number,
  target: DodecaminxFace,
  wide: boolean,
  whole: boolean,
};

/**
 * Dodecaminx.
 */
export default class Dodecaminx<Data = Record<string, unknown>> extends Puzzle<DodecaminxOptions, DodecaminxState<Data>, DodecaminxStateSummary, DodecaminxTurn> {

  /**
   * Constructor.
   *
   * @param {DodecaminxOptions} options
   */
  constructor(options: DodecaminxOptions) {
    if (!isInteger(options.size)) {
      error('Dodecaminx size must be an integer');
    }

    if (options.size < 2) {
      error('Dodecaminx size must be two or greater');
    }

    super(options);
  }

  /**
   * Apply puzzle state.
   *
   * @param {CubeStateSummary} state
   *
   * @return {void}
   */
  apply(state: DodecaminxStateSummary): void {
    error('not implemented');
  }

  /**
   * Execute a single turn.
   *
   * @param {CubeTurn} turn
   *
   * @return {void} 
   */
  execute(turn: DodecaminxTurn): void {
    if (turn.whole) {
      // rotate entire puzzle
      rotatePuzzle(this.state, turn);
    } else {
      // rotate outer face if necessary
      if (turn.depth === 1 || turn.wide) {
        this.state[turn.target] = rotateFace(this.state[turn.target], turn.rotation);
      }

      // turn slices
      for (let i = turn.depth; i > 0; i--) {
        rotateSlices(this.state, turn.target, i, turn.rotation);

        if (!turn.wide) {
          break;
        }
      } 
    }
  }

  /**
   * Generate a scramble.
   *
   * @param {number} length
   *
   * @return {void}
   */
  generateScramble(length: number = max(20, this.options.size ** 3)): string {
    const big = this.options.size > 3;
    const maxDepth = floor(this.options.size / 2);
    const turns: string[] = [];
    const whole = false;

    for (let i = 0, target = sample(Object.keys(this.state) as DodecaminxFace[], this.options.random); i < length; i++) {
      target = sample(dodecaminxIntersections[target], this.options.random);
      const depth = big ? rand(0, maxDepth, this.options.random) : 1;
      const rotation = sample([-2, -1, 1, 2], this.options.random);
      const wide = depth > 1 && sample([true, false], this.options.random);

      turns.push(stringifyTurn({ depth, rotation, target, whole, wide }));
    }
    
    return turns.join(' ');
  }

  /**
   * Get stickers effected by a turn.
   *
   * @param {string} turn
   *
   * @return {Sticker[]}
   */
  getStickersForTurn(turn: string): DodecaminxSticker<Data>[] {
    const parsedTurn = this.parse(turn);

    // return all stickers for whole puzzle rotations
    if (parsedTurn.whole) {
      return (Object.keys(this.state) as DodecaminxFace[])
        .reduce((acc, face) => acc.concat(getFaceStickers(this.state[face])), []);
    }

    // return effected stickers for a turn
    const stickers = parsedTurn.depth === 1 || parsedTurn.wide
      ? getFaceStickers(this.state[parsedTurn.target])
      : [];

    for (let i = parsedTurn.depth; i > 0; i--) {
      stickers.push(...getSliceStickers(this.state, parsedTurn.target, parsedTurn.depth));

      if (!parsedTurn.wide) {
        break;
      }
    }

    return stickers;
  }

  /**
   * Test if the puzzle is solved.
   *
   * @return {boolean}
   */
  isSolved(): boolean {
    return (Object.keys(this.state) as DodecaminxFace[])
      .reduce((acc, face) => acc && faceIsSolved(this.state[face]), true);
  }

  /**
   * Output puzzle state.
   *
   * @return {CubeStateSummary}
   */
  output(): DodecaminxStateSummary {
    return {
      b: simplifyFace(this.state.b),
      bl: simplifyFace(this.state.bl),
      br: simplifyFace(this.state.br),
      d: simplifyFace(this.state.d),
      dbl: simplifyFace(this.state.dbl),
      dbr: simplifyFace(this.state.dbr),
      dl: simplifyFace(this.state.dl),
      dr: simplifyFace(this.state.dr),
      f: simplifyFace(this.state.f),
      l: simplifyFace(this.state.l),
      r: simplifyFace(this.state.r),
      u: simplifyFace(this.state.u),
    }
  }

  /**
   * Parse a turn.
   *
   * @param {string} turn
   *
   * @return {CubeTurn} 
   */
  parse(turn: string): DodecaminxTurn {
    const maxDepth = floor(this.options.size / 2);

    return parseDodecaminxTurn(turn, maxDepth);
  }

  /**
   * Reset the puzzle state.
   *
   * @return {void}
   */
  reset(): void {
    const size = this.options.size;
    const values = this.options.values || defaultValues;

    this.state = {
      b: createFace<Data>(size, values.b),
      bl: createFace<Data>(size, values.bl),
      br: createFace<Data>(size, values.br),
      d: createFace<Data>(size, values.d),
      dbl: createFace<Data>(size, values.dbl),
      dbr: createFace<Data>(size, values.dbr),
      dl: createFace<Data>(size, values.dl),
      dr: createFace<Data>(size, values.dr),
      f: createFace<Data>(size, values.f),
      l: createFace<Data>(size, values.l),
      r: createFace<Data>(size, values.r),
      u: createFace<Data>(size, values.u),
    };
  }
}
