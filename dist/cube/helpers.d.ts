import { CubeFace, CubeState, CubeSticker, CubeStickerValue, CubeTurn } from './types';
/**
 * Chunk a face array into columns.
 *
 * [                [
 *     1, 2, 3,         [1, 4, 7],
 *     4, 5, 6,  ->     [2, 5, 8],
 *     7, 8, 9,         [3, 6, 9],
 * ]                ]
 *
 * @param  {T[]}    face
 *
 * @return {T[][]}
 */
export declare function chunkCols<T>(face: T[]): T[][];
/**
 * Chunk a face array into rows.
 *
 * [                [
 *     1, 2, 3,         [1, 2, 3],
 *     4, 5, 6,  ->     [4, 5, 6],
 *     7, 8, 9,         [7, 8, 9],
 * ]                ]
 *
 * @param  {T[]}    face
 *
 * @return {T[][]}
 */
export declare function chunkRows<T>(face: T[]): T[][];
/**
 * Create an array of stickers.
 *
 * @param {CubeStickerValue}    value
 * @param {number}              length
 *
 * @return {CubeSticker[]}
 */
export declare function createFace(value: CubeStickerValue, length: number): CubeSticker[];
/**
 * Test if a face is solved.
 *
 * @param {CubeSticker[]}   face
 *
 * @return {boolean}
 */
export declare function faceIsSolved(stickers: CubeSticker[]): boolean;
/**
 * Flatten an array of columns.
 *
 * [                    [
 *     [1, 4, 7],           1, 2, 3,
 *     [2, 5, 8],  ->       4, 5, 6,
 *     [3, 6, 9],           7, 8, 9,
 * ]                    ]
 *
 * @param  {T[][]}  cols
 *
 * @return {T[]}
 */
export declare function flattenCols<T>(cols: T[][]): T[];
/**
 * Flatten an array of rows.
 *
 * [                    [
 *     [1, 2, 3],           1, 2, 3,
 *     [4, 5, 6],  ->       4, 5, 6,
 *     [7, 8, 9],           7, 8, 9,
 * ]                    ]
 *
 * @param  {T[][]} rows
 *
 * @return {T[]}
 */
export declare function flattenRows<T>(rows: T[][]): T[];
/**
 * Convert row and column chunks. A good way to visualize
 * this operation is to imagine holding a card by the
 * top-left / bottom-right corners, and flipping it over.
 *
 * [                    [
 *     [1, 2, 3],           [1, 4, 7],
 *     [4, 5, 6],  ->       [2, 5, 8],
 *     [7, 8, 9],           [3, 6, 9],
 * ]                    ]
 *
 * @param  {T[][]}  chunks
 *
 * @return {T[]}
 */
export declare function flip<T>(chunks: T[][]): T[][];
/**
 * Get the face being turned.
 *
 * @param {CubeTurn}    turn
 *
 * @return {CubeFace}
 */
export declare function getFace(turn: CubeTurn): CubeFace;
/**
 * Get the opposite face.
 *
 * @param {CubeTurn}    turn
 *
 * @return {CubeFace}
 */
export declare function getOppositeFace(turn: CubeTurn): CubeFace;
/**
 * Itterate over the slices of a turn.
 *
 * @param  {CubeTurn}   turn
 * @param  {Function}   fn
 *
 * @return {void}
 */
export declare function loopSlices(turn: CubeTurn, fn: Function): void;
/**
 * Parse a turn.
 *
 * @param {string}  turn
 *
 * @return {CubeTurn}
 */
export declare function parseTurn(turn: string): CubeTurn;
/**
 * Rotate a face array.
 *
 * @param {CubeSticker[]}   face
 * @param {number}          rotation
 *
 * @param {CubeSticker[]}
 */
export declare function rotate(arr: CubeSticker[], rotation: number): CubeSticker[];
/**
 * Slice a cube into each face's rows and columns.
 *
 * @param  {CubeState}   cube
 *
 * @return {object}
 */
export declare function sliceCube(state: CubeState): {
    U: {
        r: CubeSticker[][];
        c: CubeSticker[][];
    };
    L: {
        r: CubeSticker[][];
        c: CubeSticker[][];
    };
    F: {
        r: CubeSticker[][];
        c: CubeSticker[][];
    };
    R: {
        r: CubeSticker[][];
        c: CubeSticker[][];
    };
    B: {
        r: CubeSticker[][];
        c: CubeSticker[][];
    };
    D: {
        r: CubeSticker[][];
        c: CubeSticker[][];
    };
};
/**
 * Convert a turn object to a string.
 *
 * @param {CubeTurn}    turn
 *
 * @return {string}
 */
export declare function stringifyTurn(turn: CubeTurn): string;
/**
 * Turn a cube along the X axis.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export declare function turnCubeX({ U, L, F, R, B, D }: CubeState, { rotation }: CubeTurn): CubeState;
/**
 * Turn a cube along the Y axis.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export declare function turnCubeY({ U, L, F, R, B, D }: CubeState, { rotation }: CubeTurn): CubeState;
/**
 * Turn a cube along the Z axis.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export declare function turnCubeZ({ U, L, F, R, B, D }: CubeState, { rotation }: CubeTurn): CubeState;
/**
 * Turn slices for a B turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export declare function turnSliceB(state: CubeState, turn: CubeTurn): void;
/**
 * Turn slices for a D turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export declare function turnSliceD(state: CubeState, turn: CubeTurn): void;
/**
 * Turn slices for a F turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export declare function turnSliceF(state: CubeState, turn: CubeTurn): void;
/**
 * Turn slices for a L turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export declare function turnSliceL(state: CubeState, turn: CubeTurn): void;
/**
 * Turn slices for a R turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export declare function turnSliceR(state: CubeState, turn: CubeTurn): void;
/**
 * Turn slices for a R turn.
 *
 * @param  {CubeState}  state
 * @param  {CubeTurn}   turn
 *
 * @return {CubeState}
 */
export declare function turnSliceU(state: CubeState, turn: CubeTurn): void;
