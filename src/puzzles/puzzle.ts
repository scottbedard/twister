/**
 * Puzzle.
 */
export default abstract class Puzzle<PuzzleOptions, PuzzleState> {
    /**
     * Puzzle options.
     *
     * @type {Object}
     */
    options: PuzzleOptions;

    /**
     * Current puzzle state.
     *
     * @type {Object}
     */
    state: PuzzleState;

    /**
     * Constructor.
     *
     * @param {Object}  object 
     */
    constructor(options: PuzzleOptions) {
        this.options = options;

        this.reset();
    }
    
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
};