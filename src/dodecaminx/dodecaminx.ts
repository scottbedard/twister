import Puzzle from '../puzzle';

import {
    DodecaminxOptions,
    DodecaminxState,
    DodecaminxTurn,
} from './types';

import {
    createPolygonFace,
} from '../utils/polygon';

export default class Dodecaminx extends Puzzle<DodecaminxOptions, DodecaminxState, DodecaminxTurn> {

    /**
     * Constructor.
     *
     * @param {DodecaminxOptions}   options
     */
    constructor(options: DodecaminxOptions) {
        if (!Number.isInteger(options.size)) {
            throw new Error('Dodecaminx size must be an integer');
        }

        if (options.size < 2) {
            throw new Error('Dodecaminx size must be two or greater');
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
        this.state = {
            U: createPolygonFace(5, this.options.size, 0),
            F: createPolygonFace(5, this.options.size, 1),
            L: createPolygonFace(5, this.options.size, 2),
            R: createPolygonFace(5, this.options.size, 3),
            BL: createPolygonFace(5, this.options.size, 4),
            BR: createPolygonFace(5, this.options.size, 5),
            DL: createPolygonFace(5, this.options.size, 6),
            DR: createPolygonFace(5, this.options.size, 7),
            DBL: createPolygonFace(5, this.options.size, 8),
            DBR: createPolygonFace(5, this.options.size, 9),
            B: createPolygonFace(5, this.options.size, 10),
            D: createPolygonFace(5, this.options.size, 11),
        };
    }
}
