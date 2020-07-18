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

import { State, Sticker } from '../types';
import { randomItem } from '../utils/array';
import { rand } from '../utils/number';

import Puzzle from '../puzzle';

/**
 * Cube types
 */
export type CubeAxis = 'X' | 'Y' | 'Z';

export type CubeFace = 'U' | 'L' | 'F' | 'R' | 'B' | 'D';

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

/**
 * Cube.
 */
export default class Cube<Data> extends Puzzle<CubeOptions, CubeState<Data>, CubeTurn> {

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
     * Apply a turn.
     *
     * @param {CubeTurn}  turn
     *
     * @return {void} 
     */
  applyTurn(turn: CubeTurn): void {
    const { target } = turn;

    // puzzle rotations
    if (target === 'X') {
      this.state = turnCubeX(this.state, turn);
    } else if (target === 'Y') {
      this.state = turnCubeY(this.state, turn);
    } else if (target === 'Z') {
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
      case 'U': turnSliceU(this.state, turn); break;
      case 'L': turnSliceL(this.state, turn); break;
      case 'F': turnSliceF(this.state, turn); break;
      case 'R': turnSliceR(this.state, turn); break;
      case 'B': turnSliceB(this.state, turn); break;
      case 'D': turnSliceD(this.state, turn); break;
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
    const faces: CubeFace[] = ['U', 'L', 'F', 'R', 'B', 'D'];
    const maxDepth = Math.floor(this.options.size / 2);
    const turns: CubeFace[] = [];

    const intersections: { [key in CubeFace]: CubeFace[] } = {
      U: ['L', 'F', 'R', 'B'],
      L: ['U', 'F', 'D', 'B'],
      F: ['L', 'U', 'R', 'D'],
      R: ['U', 'B', 'D', 'F'],
      B: ['U', 'L', 'D', 'R'],
      D: ['F', 'R', 'B', 'L'],
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
    return faceIsSolved(this.state.U)
      && faceIsSolved(this.state.L)
      && faceIsSolved(this.state.F)
      && faceIsSolved(this.state.R)
      && faceIsSolved(this.state.B)
      && faceIsSolved(this.state.D);
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
      U: createFace(0, length),
      L: createFace(1, length),
      F: createFace(2, length),
      R: createFace(3, length),
      B: createFace(4, length),
      D: createFace(5, length),
    };
  }
}
