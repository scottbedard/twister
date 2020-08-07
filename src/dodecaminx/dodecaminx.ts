import { createFace, parseDodecaminxTurn } from './helpers';
import { error } from '../utils/function';
import { isInteger } from '../utils/number';
import { Sticker } from '../puzzle';
import Puzzle from '../puzzle';

// options
export type DodecaminxOptions = {
  size: number,
};

// face
export type DodecaminxFace = 'u' | 'f' | 'l' | 'r' | 'bl' | 'br' | 'dl' | 'dr' | 'dbl' | 'dbr' | 'b' | 'd';

export type DodecaminxFaceObject<Data> = {
  center: DodecaminxSticker<Data> | null,
  corners: DodecaminxSticker<Data>[][],
  middles: DodecaminxSticker<Data>[][],
};

// value
export type DodecaminxValue = null | number;

// sticker
export type DodecaminxSticker<Data> = Sticker<Data, DodecaminxValue>;

// state
export type DodecaminxState<Data> = Record<DodecaminxFace, DodecaminxFaceObject<Data>>;

// state summary
export type DodecaminxStateSummary = Record<DodecaminxFace, [
  DodecaminxValue[], // corners
  DodecaminxValue[]?, // middles
  DodecaminxValue?, // center
]>;

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
export default class Dodecaminx<Data> extends Puzzle<DodecaminxOptions, DodecaminxState<Data>, DodecaminxStateSummary, DodecaminxTurn> {

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
    error('not implemented');
  }

  /**
   * Generate a scramble.
   *
   * @param {number} length
   *
   * @return {void}
   */
  generateScramble(length: number): string {
    error('not implemented');
  }

  /**
   * Test if the puzzle is solved.
   *
   * @return {boolean}
   */
  isSolved(): boolean {
    return false;
  }

  /**
   * Output puzzle state.
   *
   * @return {CubeStateSummary}
   */
  output(): DodecaminxStateSummary {
    error('not implemented');
  }

  /**
   * Parse a turn.
   *
   * @param {string} turn
   *
   * @return {CubeTurn} 
   */
  parse(turn: DodecaminxFace): DodecaminxTurn {
    return parseDodecaminxTurn(turn);
  }

  /**
   * Reset the puzzle state.
   *
   * @return {void}
   */
  reset(): void {
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
}
