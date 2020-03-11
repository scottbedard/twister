import {
    CubeOptions,
    CubeState,
    CubeSticker,
    CubeStickerValue,
} from './types';

import {
    createFace,
} from './helpers';

import Puzzle from '../puzzle';

export default class Cube extends Puzzle {
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
     * Test if the puzzle is solved.
     *
     * @return {boolean}
     */
    isSolved(): boolean {
        return false;
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

    /**
     * Apply one or more turns to the puzzle.
     *
     * @param {string}  turn
     *
     * @return {void} 
     */
    turn(turn: string): void {
        // ...
    }
}
