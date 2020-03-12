import { identity } from '../utils/function';
import { trim } from '../utils/string';

/**
 * Puzzle.
 */
export default abstract class Puzzle<PuzzleOptions, PuzzleState, PuzzleTurn> {

    /**
     * Puzzle options.
     *
     * @type {PuzzleOptions}
     */
    options: PuzzleOptions;

    /**
     * Current puzzle state.
     *
     * @type {PuzzleState}
     */
    state: PuzzleState;

    /**
     * Constructor.
     *
     * @param {PuzzleOptions}  object 
     */
    constructor(options: PuzzleOptions) {
        this.options = options;

        this.reset();
    }
    
    /**
     * Apply a turn.
     *
     * @param {PuzzleTurn}  turn
     *
     * @return {void} 
     */
    abstract applyTurn(turn: PuzzleTurn): void;
    
    /**
     * Test if the puzzle is solved.
     *
     * @return {boolean}
     */
    abstract isSolved(): boolean;

    /**
     * Reset the puzzle state.
     *
     * @return {void}
     */
    abstract reset(): void;

    /**
     * Parse a turn.
     *
     * @param {string}  turn
     *
     * @return {PuzzleTurn} 
     */
    abstract parseTurn(turn: string): PuzzleTurn;

    /**
     * Apply a series of turns.
     *
     * @param {string}  algorithm
     *
     * @return {void} 
     */
    turn(algorithm: string): void {
        algorithm
            .split(' ')
            .map(trim)
            .filter(identity)
            .map(turn => this.parseTurn(turn))
            .forEach(turn => this.applyTurn(turn));
    }
};