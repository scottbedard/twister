/**
 * Puzzle.
 */
export default abstract class Puzzle {
    /**
     * Puzzle options.
     *
     * @type {Object}
     */
    options: Object;
    /**
     * Current puzzle state.
     *
     * @type {Object}
     */
    state: Object;
    /**
     * Constructor.
     *
     * @param {Object}  object
     */
    constructor(options: Object);
    /**
     * Apply a turn.
     *
     * @param {string}  turn
     *
     * @return {void}
     */
    abstract applyTurn(turn: string): void;
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
}
