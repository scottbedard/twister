import Puzzle from '../puzzle';

import {
    DodecaminxOptions,
    DodecaminxState,
    DodecaminxTurn,
} from './types';

export default class Dodecaminx extends Puzzle<DodecaminxOptions, DodecaminxState, DodecaminxTurn> {

    /**
     * Constructor.
     *
     * @param {DodecaminxOptions}   options
     */
    constructor(options: DodecaminxOptions) {
        super(options);
    }

    /**
     * Apply a turn.
     *
     * @param {CubeTurn}  turn
     *
     * @return {void} 
     */
    applyTurn(turn: DodecaminxTurn) {
        // ...
    }

    /**
     * Generate a scramble.
     *
     * @param {number}  length
     *
     * @return {void}
     */
    generateScramble(length: number) {
        return '';
    }

    /**
     * Test if the puzzle is solved.
     *
     * @return {boolean}
     */
    isSolved() {
        return false;
    }

    /**
     * Parse a turn.
     *
     * @param {string}  turn
     *
     * @return {DodecaminxTurn} 
     */
    parseTurn(turn: string): DodecaminxTurn {
        return {};
    }

    /**
     * Reset the puzzle state.
     *
     * @return {void}
     */
    reset() {
        const length = this.options.size ** 2;
    }
}
