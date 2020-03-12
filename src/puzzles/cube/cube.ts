import {
    CubeFace,
    CubeOptions,
    CubeState,
    CubeTurn,
} from './types';

import {
    createFace,
    getFace,
    parseTurn,
    rotate,
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

import Puzzle from '../puzzle';

export default class Cube extends Puzzle<CubeOptions, CubeState, CubeTurn> {

    /**
     * Puzzle options.
     *
     * @type {CubeOptions}
     */
    options: CubeOptions;

    /**
     * Current puzzle state.
     *
     * @type {CubeState}
     */
    state: CubeState;

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

            // turn face if necessary
            if (turn.depth === 1 || turn.wide) {
                this.state[face] = rotate(this.state[face], turn.rotation);
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
     * Test if the puzzle is solved.
     *
     * @return {boolean}
     */
    isSolved(): boolean {
        return false;
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
