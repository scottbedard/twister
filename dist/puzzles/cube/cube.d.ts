import { CubeOptions, CubeState, CubeTurn } from './types';
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
    constructor(options: CubeOptions);
    /**
     * Apply a turn.
     *
     * @param {CubeTurn}  turn
     *
     * @return {void}
     */
    applyTurn(turn: CubeTurn): void;
    /**
     * Test if the puzzle is solved.
     *
     * @return {boolean}
     */
    isSolved(): boolean;
    /**
     * Parse a turn.
     *
     * @param {string}  turn
     *
     * @return {CubeTurn}
     */
    parseTurn(turn: string): CubeTurn;
    /**
     * Reset the puzzle state.
     *
     * @return {void}
     */
    reset(): void;
}
