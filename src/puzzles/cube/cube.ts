import {
    CubeOptions,
    CubeState,
    CubeSticker,
    CubeStickerValue,
} from './types';

import Puzzle from '../puzzle';
import { makeArray } from '../../utils/array';

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
        const { size } = this.options;
        const length = size ** 2;
        const centerIndex = Math.floor(length / 2);

        const face = (value: CubeStickerValue) => makeArray(length).map((x, i): CubeSticker => {
            return {
                center: centerIndex === i,
                data: null,
                originalIndex: i,
                value,
            };
        });

        this.state = {
            U: face(0),
            L: face(1),
            F: face(2),
            R: face(3),
            B: face(4),
            D: face(5),
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
