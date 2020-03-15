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
    constructor(options: PuzzleOptions);
    /**
     * Apply a turn.
     *
     * @param {PuzzleTurn}  turn
     *
     * @return {void}
     */
    abstract applyTurn(turn: PuzzleTurn): void;
    /**
     * Generate a scramble.
     *
     * @param {number}  length
     *
     * @return {void}
     */
    abstract generateScramble(length?: number): string;
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
     * Scramble the puzzle.
     *
     * @param {number}  length
     *
     * @return {void}
     */
    scramble(length?: number): void;
    /**
     * Apply a series of turns.
     *
     * @param {string}  algorithm
     *
     * @return {void}
     */
    turn(algorithm: string): void;
}