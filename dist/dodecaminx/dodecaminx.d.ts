import Puzzle from '../puzzle';
import { PolygonFace } from '../utils/polygon';
/**
 * Dodecaminx axis and face.
 */
export declare type DodecaminxAxis = 'u' | 'f' | 'l' | 'r' | 'bl' | 'br' | 'dl' | 'dr' | 'dbl' | 'dbr' | 'b' | 'd';
export declare type DodecaminxFace = 'U' | 'F' | 'L' | 'R' | 'BL' | 'BR' | 'DL' | 'DR' | 'DBL' | 'DBR' | 'B' | 'D';
/**
 * Dodecaminx options.
 */
export declare type DodecaminxOptions = {
    size: number;
};
/**
 * Dodecaminx state.
 */
export declare type DodecaminxState = {
    U: PolygonFace;
    F: PolygonFace;
    L: PolygonFace;
    R: PolygonFace;
    BL: PolygonFace;
    BR: PolygonFace;
    DL: PolygonFace;
    DR: PolygonFace;
    DBL: PolygonFace;
    DBR: PolygonFace;
    B: PolygonFace;
    D: PolygonFace;
};
/**
 * Dodecaminx turn.
 */
export declare type DodecaminxTurn = {
    depth: number;
    rotation: number;
    target: DodecaminxFace | DodecaminxAxis;
    wide: boolean;
};
/**
 * Dodecaminx.
 */
export default class Dodecaminx extends Puzzle<DodecaminxOptions, DodecaminxState, DodecaminxTurn> {
    /**
     * Constructor.
     *
     * @param {DodecaminxOptions}   options
     */
    constructor(options: DodecaminxOptions);
    /**
     * Apply a turn.
     *
     * @param {CubeTurn}  turn
     *
     * @return {void}
     */
    applyTurn(turn: DodecaminxTurn): void;
    /**
     * Generate a scramble.
     *
     * @param {number}  length
     *
     * @return {void}
     */
    generateScramble(length: number): string;
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
     * @return {DodecaminxTurn}
     */
    parseTurn(turn: string): DodecaminxTurn;
    /**
     * Reset the puzzle state.
     *
     * @return {void}
     */
    reset(): void;
}
