/* eslint-disable */
import Puzzle from '../puzzle';
import { createPolygonFace, PolygonFace } from '../utils/polygon';
import { isInteger } from '../utils/number';
import { error } from '../utils/function';

/**
 * Dodecaminx axis and face.
 */
export type DodecaminxAxis = 'u' | 'f' | 'l' | 'r' | 'bl' | 'br' | 'dl' | 'dr' | 'dbl' | 'dbr' | 'b' | 'd';

export type DodecaminxFace = 'U' | 'F' | 'L' | 'R' | 'BL' | 'BR' | 'DL' | 'DR' | 'DBL' | 'DBR' | 'B' | 'D';

/**
 * Dodecaminx options.
 */
export type DodecaminxOptions = {
  size: number,
};

/**
 * Dodecaminx state.
 */
export type DodecaminxState = {
  U: PolygonFace,
  F: PolygonFace,
  L: PolygonFace,
  R: PolygonFace,
  BL: PolygonFace,
  BR: PolygonFace,
  DL: PolygonFace,
  DR: PolygonFace,
  DBL: PolygonFace,
  DBR: PolygonFace,
  B: PolygonFace,
  D: PolygonFace,
};

/**
 * Dodecaminx turn.
 */
export type DodecaminxTurn = {
  depth: number,
  rotation: number,
  target: DodecaminxFace | DodecaminxAxis,
  wide: boolean,
};

/**
 * Dodecaminx.
 */
export default class Dodecaminx extends Puzzle<DodecaminxOptions, DodecaminxState, DodecaminxTurn> {

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
  parseTurn(turn: string): DodecaminxTurn {
    return {
      depth: 1,
      rotation: 1,
      target: 'F',
      wide: false,
    };
  }

  /**
   * Reset the puzzle state.
   *
   * @return {void}
   */
  reset() {
    this.state = {
      U: createPolygonFace(5, this.options.size, 0),
      F: createPolygonFace(5, this.options.size, 1),
      L: createPolygonFace(5, this.options.size, 2),
      R: createPolygonFace(5, this.options.size, 3),
      BL: createPolygonFace(5, this.options.size, 4),
      BR: createPolygonFace(5, this.options.size, 5),
      DL: createPolygonFace(5, this.options.size, 6),
      DR: createPolygonFace(5, this.options.size, 7),
      DBL: createPolygonFace(5, this.options.size, 8),
      DBR: createPolygonFace(5, this.options.size, 9),
      B: createPolygonFace(5, this.options.size, 10),
      D: createPolygonFace(5, this.options.size, 11),
    };
  }
}
