import Puzzle from '../puzzle';
/**
 * Cube axis and face.
 */
export declare type CubeAxis = 'X' | 'Y' | 'Z';
export declare type CubeFace = 'U' | 'L' | 'F' | 'R' | 'B' | 'D';
/**
 * Cube sticker.
 */
export declare type CubeSticker = {
    data: any;
    originalIndex: number;
    value: CubeStickerValue;
};
/**
 * Cube sticker value.
 */
export declare type CubeStickerValue = null | 0 | 1 | 2 | 3 | 4 | 5;
/**
 * Cube options.
 */
export declare type CubeOptions = {
    size: number;
};
/**
 * Cube state.
 */
export declare type CubeState = {
    U: CubeSticker[];
    L: CubeSticker[];
    F: CubeSticker[];
    R: CubeSticker[];
    B: CubeSticker[];
    D: CubeSticker[];
};
/**
 * Cube turn.
 */
export declare type CubeTurn = {
    depth: number;
    rotation: number;
    target: CubeFace | CubeAxis;
    wide: boolean;
};
/**
 * Cube.
 */
export default class Cube extends Puzzle<CubeOptions, CubeState, CubeTurn> {
    /**
     * Constructor.
     *
     * @param {CubeOptions}     options
     */
    constructor(options: CubeOptions);
    /**
     * Apply a turn.
     *
     * @param {CubeTurn}  turn
     *
     * @return {void}
     */
    applyTurn(turn: CubeTurn): void;
    /**
     * Generate a scramble.
     *
     * @param {number}  length
     *
     * @return {void}
     */
    generateScramble(length?: number): string;
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
     * @return {CubeTurn}
     */
    parseTurn(turn: string): CubeTurn;
    /**
     * Reset the puzzle state.
     *
     * @return {void}
     */
    reset(): void;
}
