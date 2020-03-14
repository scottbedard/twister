import Puzzle from '../puzzle';
import { DodecaminxOptions, DodecaminxState, DodecaminxTurn } from './types';
export default class Dodecaminx extends Puzzle<DodecaminxOptions, DodecaminxState, DodecaminxTurn> {
    /**
     * Constructor.
     *
     * @param {DodecaminxOptions}   options
     */
    constructor(options: DodecaminxOptions);
    /**
     * Apply a turn.
     *
     * @param {CubeTurn}  turn
     *
     * @return {void}
     */
    applyTurn(turn: DodecaminxTurn): void;
    /**
     * Generate a scramble.
     *
     * @param {number}  length
     *
     * @return {void}
     */
    generateScramble(length: number): string;
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
     * @return {DodecaminxTurn}
     */
    parseTurn(turn: string): DodecaminxTurn;
    /**
     * Reset the puzzle state.
     *
     * @return {void}
     */
    reset(): void;
}
