import {
  createFace,
  faceIsSolved,
  getOppositeFace,
  parseTurn,
  simplifyFace,
  stringifyTurn,
  turnCubeX,
  turnCubeY,
  turnCubeZ,
  turnSliceB,
  turnSliceD,
  turnSliceF,
  turnSliceL,
  turnSliceR,
  turnSliceU,
} from './helpers';

import { error } from '../utils/function';
import { isInteger, rand } from '../utils/number';
import { sample } from '../utils/array';
import { rotate } from '../utils/matrix';
import { Sticker } from '../puzzle';

import Puzzle from '../puzzle';

// options
export type CubeOptions = {
  size: number,
};

// axes & faces
export type CubeAxis = 'x' | 'y' | 'z';
export type CubeFace = 'u' | 'l' | 'f' | 'r' | 'b' | 'd';

// values
export type CubeValue = null | number;

// stickers
export type CubeSticker<Data> = Sticker<Data, CubeValue>;

// state
export type CubeState<Data> = Record<CubeFace, CubeSticker<Data>[]>;

// state summary
export type CubeStateSummary = Record<CubeFace, CubeValue[]>;

// turns
export type CubeTurn = {
  depth: number,
  rotation: -1 | 1 | 2,
  target: CubeFace | CubeAxis,
  wide: boolean, 
};

/**
 * Cube.
 */
export default class Cube<Data> extends Puzzle<CubeOptions, CubeState<Data>, CubeStateSummary, CubeTurn> {

  /**
   * Constructor.
   *
   * @param {CubeOptions} options
   */
  constructor(options: CubeOptions) {
    if (!isInteger(options.size)) {
      error('Cube size must be an integer');
    }

    if (options.size < 2) {
      error('Cube size must be two or greater');
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
  apply(state: CubeStateSummary): void {
    (Object.keys(state) as CubeFace[]).forEach(face => {
      this.state[face].forEach((sticker, index) => {
        sticker.value = state[face][index];
      });
    });
  }

  /**
   * Execute a single turn.
   *
   * @param {CubeTurn} turn
   *
   * @return {void} 
   */
  execute(turn: CubeTurn): void {
    const { target } = turn;

    // puzzle rotations
    if (target === 'x') {
      this.state = turnCubeX(this.state, turn);
    } else if (target === 'y') {
      this.state = turnCubeY(this.state, turn);
    } else if (target === 'z') {
      this.state = turnCubeZ(this.state, turn);
    }
        
    // turns
    else {
      // turn outer face if necessary
      if (turn.depth === 1 || turn.wide) {
        this.state[target] = rotate(this.state[target], turn.rotation);
      }

      // turn the inner face if necessary
      if (turn.depth >= this.options.size) {
        let innerRotation: -1 | 1 | 2 = 2;

        // if this isn't a double turn, reverse the direction because
        // it's being turned from the context of the opposite face
        if (turn.rotation === 1 || turn.rotation === -1) {
          innerRotation = turn.rotation * -1 as -1 | 1;
        }
    
        const oppositeFace = getOppositeFace(turn);

        this.state[oppositeFace] = rotate(this.state[oppositeFace], innerRotation);
      }

      switch (target) {
      case 'u': turnSliceU(this.state, turn); break;
      case 'l': turnSliceL(this.state, turn); break;
      case 'f': turnSliceF(this.state, turn); break;
      case 'r': turnSliceR(this.state, turn); break;
      case 'b': turnSliceB(this.state, turn); break;
      case 'd': turnSliceD(this.state, turn); break;
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
  generateScramble(length: number = Math.max(20, this.options.size ** 3)): string {
    const faces: CubeFace[] = ['u', 'l', 'f', 'r', 'b', 'd'];
    const maxDepth = Math.floor(this.options.size / 2);
    const turns: CubeFace[] = [];

    const intersections: Record<CubeFace, CubeFace[]> = {
      u: ['l', 'f', 'r', 'b'],
      l: ['u', 'f', 'd', 'b'],
      f: ['l', 'u', 'r', 'd'],
      r: ['u', 'b', 'd', 'f'],
      b: ['u', 'l', 'd', 'r'],
      d: ['f', 'r', 'b', 'l'],
    }

    for (let i = 0, prev = sample(faces); i < length; i++) {
      prev = sample(intersections[prev]);
      turns.push(prev);
    }

    return turns.map(turn => stringifyTurn({
      depth: this.options.size > 3 ? rand(0, maxDepth) : 1,
      rotation: sample([-1, 1, 2]),
      target: turn,
      wide: this.options.size > 3 && !!rand(0, 1),
    })).join(' ');
  }

  /**
   * Test if the puzzle is solved.
   *
   * @return {boolean}
   */
  isSolved(): boolean {
    return (Object.keys(this.state) as CubeFace[])
      .reduce((acc, face) => acc && faceIsSolved(this.state[face]), true);
  }

  /**
   * Output puzzle state.
   *
   * @return {CubeStateSummary}
   */
  output(): CubeStateSummary {
    return {
      u: simplifyFace(this.state.u),
      l: simplifyFace(this.state.l),
      f: simplifyFace(this.state.f),
      r: simplifyFace(this.state.r),
      b: simplifyFace(this.state.b),
      d: simplifyFace(this.state.d),
    };
  }

  /**
   * Parse a turn.
   *
   * @param {string} turn
   *
   * @return {CubeTurn} 
   */
  parse(turn: string): CubeTurn {
    return parseTurn(turn);
  }

  /**
   * Reset the puzzle state.
   *
   * @return {void}
   */
  reset(): void {
    const length = this.options.size ** 2;

    this.state = {
      u: createFace(0, length),
      l: createFace(1, length),
      f: createFace(2, length),
      r: createFace(3, length),
      b: createFace(4, length),
      d: createFace(5, length),
    };
  }
}
