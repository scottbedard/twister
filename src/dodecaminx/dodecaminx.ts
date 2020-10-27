import {
  defaultValues,
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
  walkSlices,
} from './helpers';

import { sample } from '../utils/array';
import { error } from '../utils/function';
import { floor, isInteger } from '../utils/number';
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
  pochmann: boolean,
  rotation: number,
  target: DodecaminxFace,
  whole: boolean,
  wide: boolean,
};

// pochmann turn
export type DodecaminxPochmannTurn = {
  depth: number
  turn: 'R++' | 'R--' | 'D++' | 'D--' | 'U' | 'U-';
}

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
    (Object.keys(state) as DodecaminxFace[]).forEach((face) => {
      const [corners, middles, centerValue] = state[face];

      corners.forEach((quintant, i) => {
        quintant.forEach((value, j) => {
          const sticker = this.state[face].corners?.[i]?.[j];

          if (sticker) {
            sticker.value = value;
          }
        });
      });

      if (middles) {
        middles.forEach((quintant, i) => {
          quintant.forEach((value, j) => {
            const sticker = this.state[face].middles?.[i]?.[j];

            if (sticker) {
              sticker.value = value;
            }
          });
        });
      }

      if (centerValue && this.state[face].center !== null) {
        this.state[face].center.value = centerValue;
      }
    });
  }

  /**
   * Execute a single turn.
   *
   * @param {CubeTurn} turn
   *
   * @return {void} 
   */
  execute(turn: DodecaminxTurn): void {
    if (turn.pochmann) {
      // pochmann scrambling
      if (turn.target === 'r') {
        this.state.l = rotateFace(this.state.l, turn.rotation);
        rotateSlices(this.state, 'l', 1, turn.rotation);
        rotatePuzzle(this.state, 'dbr', turn.rotation);
      } else {
        this.state.u = rotateFace(this.state.u, turn.rotation);
        rotateSlices(this.state, 'u', 1, turn.rotation);
        rotatePuzzle(this.state, 'd', turn.rotation);
      }
    } else if (turn.whole) {
      // rotate entire puzzle
      rotatePuzzle(this.state, turn.target, turn.rotation);
    } else {
      // rotate outer face if necessary
      if (turn.depth === 1 || turn.wide) {
        this.state[turn.target] = rotateFace(this.state[turn.target], turn.rotation);
      }

      // turn slices
      walkSlices(turn.depth, turn.wide, (i) => {
        rotateSlices(this.state, turn.target, i, turn.rotation);
      });
    }
  }

  /**
   * Generate a scramble.
   *
   * @param {number} length
   *
   * @return {void}
   */
  generateScramble(length: number = this.options.size * 15): string {
    const turns = [];

    for (let i = 0, turn = sample(['R', 'D'], this.options.random); i < length; i++) {
      turn = sample(
        (i + 1) % 10 === 0
          ? ['U', 'U-']
          : turn.startsWith('D') ? ['R++', 'R--'] : ['D++', 'D--'],
        this.options.random,
      );

      turns.push(turn);
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
