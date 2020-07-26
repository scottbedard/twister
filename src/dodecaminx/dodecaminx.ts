/* eslint-disable */
import Puzzle from '../puzzle';
import { isInteger } from '../utils/number';
import { error } from '../utils/function';
import { SimplifiedState, State, Sticker } from '../puzzle';
import { createFace } from './helpers';

/**
 * Dodecaminx axis and face.
 */
type DefaultData = Record<string, unknown>;

export type DodecaminxFace = 'u' | 'f' | 'l' | 'r' | 'bl' | 'br' | 'dl' | 'dr' | 'dbl' | 'dbr' | 'b' | 'd';

export type DodecaminxValue = null | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export type DodecaminxSticker<Data> = {
  data: Data,
  value: DodecaminxValue,
};

export type DodecaminxOptions = {
  size: number,
};

export type DodecaminxFaceObject<Data = DefaultData> = {
  center: DodecaminxSticker<Data> | null,
  grids: DodecaminxSticker<Data>[][],
  middles: DodecaminxSticker<Data>[][],
};

export type DodecaminxState<Data = DefaultData> = Record<DodecaminxFace, DodecaminxFaceObject<Data>>;

export type DodecaminxTurn = {
  depth: number,
  rotation: number,
  target: DodecaminxFace,
  wide: boolean,
};

/**
 * Dodecaminx.
 */
export default class Dodecaminx<Data = Record<string, unknown>> extends Puzzle<DodecaminxOptions, DodecaminxState<Data>, DodecaminxTurn> {

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

  applyState() {
    error('not implemented');
  }

  /**
   * Apply a turn.
   *
   * @param {DodecaminxTurn} turn
   *
   * @return {void} 
   */
  applyTurn(turn: DodecaminxTurn) {
    // ...
  }

  /**
   * Generate a scramble.
   *
   * @param {number} length
   *
   * @return {void}
   */
  generateScramble(length: number) {
    return '';
  }

  /**
   * Test if the puzzle is solved.
   *
   * @return {boolean}
   */
  isSolved() {
    return false;
  }

  /**
   * Parse a turn.
   *
   * @param {string} turn
   *
   * @return {DodecaminxTurn} 
   */
  parseTurn(target: DodecaminxFace): DodecaminxTurn {
    return {
      depth: 1,
      rotation: 1,
      target,
      wide: false,
    };
  }

  /**
   * Reset the puzzle state.
   *
   * @return {void}
   */
  reset() {
    const size = this.options.size;

    this.state = {
      u: createFace<Data>(size, 0),
      f: createFace<Data>(size, 1),
      l: createFace<Data>(size, 2),
      r: createFace<Data>(size, 3),
      bl: createFace<Data>(size, 4),
      br: createFace<Data>(size, 5),
      dl: createFace<Data>(size, 6),
      dr: createFace<Data>(size, 7),
      dbl: createFace<Data>(size, 8),
      dbr: createFace<Data>(size, 9),
      b: createFace<Data>(size, 10),
      d: createFace<Data>(size, 11),
    };
  }

  /**
   * Export puzzle state
   */
  toState(): SimplifiedState<DodecaminxFace, DodecaminxValue> {
    error('not implemented');
    return;
  }
}
