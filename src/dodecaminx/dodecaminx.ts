/* eslint-disable */
import Puzzle from '../puzzle';
import { isInteger } from '../utils/number';
import { error } from '../utils/function';
import { SimplifiedState } from '../puzzle';
import { createFace, rotate, parseDodecaminxTurn } from './helpers';

/**
 * Dodecaminx axis and face.
 */
type DefaultData = Record<string, unknown>;

export type DodecaminxFace = 'u' | 'f' | 'l' | 'r' | 'bl' | 'br' | 'dl' | 'dr' | 'dbl' | 'dbr' | 'b' | 'd';

export type DodecaminxValue = null | number | string;

export type DodecaminxSticker<Data> = {
  data: Data,
  value: DodecaminxValue,
};

export type DodecaminxOptions = {
  size: number,
};

export type DodecaminxFaceObject<Data> = {
  center: DodecaminxSticker<Data> | null,
  corners: DodecaminxSticker<Data>[][],
  middles: DodecaminxSticker<Data>[][],
};

export type DodecaminxState<Data = DefaultData> = Record<DodecaminxFace, DodecaminxFaceObject<Data>>;

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
    // turn near face
    this.state[turn.target] = rotate(this.state[turn.target], turn.rotation);

    
    // turn whole puzzle
    if (turn.whole) {
      // ...
    }
    
    // or turn layers
    else {
      // ...
    }
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
  parseTurn(turn: DodecaminxFace): DodecaminxTurn {
    return parseDodecaminxTurn(turn);
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
