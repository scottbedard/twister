import {
    CubeFace,
    CubeOptions,
    CubeState,
    CubeTurn,
} from './types';

import {
    createFace,
    getFace,
    isPuzzleRotation,
    parseTurn,
    rotateFace,
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
        // puzzle rotations
        if (isPuzzleRotation(turn)) {
            // ...
        }

        // turns
        else {
            const face = getFace(turn);

            this.state[face] = rotateFace(this.state[face], turn.rotation);
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
