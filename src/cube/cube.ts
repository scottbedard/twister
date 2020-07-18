import {
  createFace,
  faceIsSolved,
  getFace,
  getOppositeFace,
  parseTurn,
  rotate,
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

import { SimplifiedState, State, Sticker } from '../types';
import { randomItem } from '../utils/array';
import { rand } from '../utils/number';

import Puzzle from '../puzzle';

/**
 * Cube types
 */
export type CubeAxis = 'x' | 'y' | 'z';

export type CubeFace = 'u' | 'l' | 'f' | 'r' | 'b' | 'd';

export type CubeOptions = {
  size: number,
};

export type CubeState<Data> = State<CubeFace, CubeSticker<Data>>;

export type CubeSticker<Data> = Sticker<CubeValue, Data>;

export type CubeTurn = {
  depth: number,
  rotation: number,
  target: CubeFace | CubeAxis,
  wide: boolean, 
};

export type CubeValue = null | 0 | 1 | 2 | 3 | 4 | 5;

export type SimplifiedCubeState = SimplifiedState<CubeFace, CubeValue>;

/**
 * Cube.
 */
export default class Cube<Data> extends Puzzle<
  CubeOptions,
  CubeState<Data>,
  CubeTurn
> {

  /**
     * Constructor.
     *
     * @param {CubeOptions}     options
     */
  constructor(options: CubeOptions) {
    if (!Number.isInteger(options.size)) {
      throw new Error('Cube size must be an integer');
    }

    if (options.size < 2) {
      throw new Error('Cube size must be two or greater');
    }

    super(options);
  }

  /**
   * Apply state.
   *
   * @param {SimplifiedCubeState} state
   *
   * @return {void}
   */
  applyState(state: SimplifiedCubeState): void {
    (Object.keys(state) as Array<keyof typeof state>).forEach(face => {
      this.state[face].forEach((sticker, index) => {
        sticker.value = state[face][index];
      });
    });
  }

  /**
     * Apply a turn.
     *
     * @param {CubeTurn}  turn
     *
     * @return {void} 
     */
  applyTurn(turn: CubeTurn): void {
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
      const face = getFace(turn);

      // turn outer face if necessary
      if (turn.depth === 1 || turn.wide) {
        this.state[face] = rotate(this.state[face], turn.rotation);
      }

      // turn the inner face if necessary
      if (turn.depth >= this.options.size) {
        let innerRotation = 2;

        // if this isn't a double turn, reverse the direction because
        // it's being turned from the context of the opposite face
        if (turn.rotation === 1 || turn.rotation === -1) {
          innerRotation = turn.rotation * -1;
        }
    
        const oppositeFace = getOppositeFace(turn);

        this.state[oppositeFace] = rotate(this.state[oppositeFace], innerRotation);
      }


      switch (face) {
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
     * @param {number}  length
     *
     * @return {void}
     */
  generateScramble(length: number = Math.max(20, this.options.size ** 3)): string {
    const faces: CubeFace[] = ['u', 'l', 'f', 'r', 'b', 'd'];
    const maxDepth = Math.floor(this.options.size / 2);
    const turns: CubeFace[] = [];

    const intersections: { [key in CubeFace]: CubeFace[] } = {
      u: ['l', 'f', 'r', 'b'],
      l: ['u', 'f', 'd', 'b'],
      f: ['l', 'u', 'r', 'd'],
      r: ['u', 'b', 'd', 'f'],
      b: ['u', 'l', 'd', 'r'],
      d: ['f', 'r', 'b', 'l'],
    }

    for (let i = 0, prev = randomItem(faces); i < length; i++) {
      prev = randomItem(intersections[prev]);
      turns.push(prev);
    }

    return turns.map(turn => stringifyTurn({
      depth: this.options.size > 3 ? rand(0, maxDepth) : 1,
      rotation: randomItem([-1, 1, 2]),
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
    return faceIsSolved(this.state.u)
      && faceIsSolved(this.state.l)
      && faceIsSolved(this.state.f)
      && faceIsSolved(this.state.r)
      && faceIsSolved(this.state.b)
      && faceIsSolved(this.state.d);
  }

  /**
     * Parse a turn.
     *
     * @param {string}  turn
     *
     * @return {CubeTurn} 
     */
  parseTurn(turn: string): CubeTurn {
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
