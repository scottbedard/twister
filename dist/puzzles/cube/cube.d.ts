import { CubeOptions, CubeState } from './types';
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
    constructor(options: CubeOptions);
    /**
     * Apply a turn.
     *
     * @param {string}  turn
     *
     * @return {void}
     */
    applyTurn(turn: string): void;
    /**
     * Test if the puzzle is solved.
     *
     * @return {boolean}
     */
    isSolved(): boolean;
    /**
     * Reset the puzzle state.
     *
     * @return {void}
     */
    reset(): void;
}
