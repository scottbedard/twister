/**
 * Puzzle.
 */
export default abstract class Puzzle {
    /**
     * Face data.
     *
     * @type {Face[]}
     */
    data: any[];

    /**
     * Puzzle options.
     *
     * @type {Object}
     */
    options: Object;

    /**
     * Constructor.
     *
     * @param {Object}  object 
     */
    constructor(options: Object) {
        this.options = options;

        this.reset();
    }
    
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
     * Apply one or more turns to the puzzle.
     *
     * @param {string}  turn
     *
     * @return {void} 
     */
    abstract turn(turn: string): void;
};