import Puzzle from '../puzzle';
import { CubeOptions } from './types';

export default class Cube extends Puzzle {

    /**
     * Constructor.
     *
     * @param {CubeOptions}     options
     */
    constructor(options: CubeOptions) {
        if (!Number.isInteger(options.size)) {
            throw new Error('Cube size must be an integer');
        }

        if (options.size < 2) {
            throw new Error('Cube size must be two or greater');
        }

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
