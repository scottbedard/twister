import Puzzle from '../puzzle';

export default class Cube extends Puzzle {
    constructor(options: Object) {
        super(options);
    }

    /**
     * Test if the puzzle is solved.
     *
     * @return {boolean}
     */
    isSolved(): boolean {
        return false;
    }

    /**
     * Reset the puzzle state.
     *
     * @return {void}
     */
    reset(): void {
        // ...
    }

    /**
     * Apply one or more turns to the puzzle.
     *
     * @param {string}  turn
     *
     * @return {void} 
     */
    turn(turn: string): void {
        // ...
    }
}
