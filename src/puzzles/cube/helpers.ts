import {
    CubeFace,
    CubeSticker,
    CubeStickerValue,
    CubeTurn,
} from './types';

import { makeArray, reverse, slice } from '../../utils/array';

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
export function chunkCols<T>(face: T[]): T[][] {
    return flip(chunkRows(face));
}

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
export function chunkRows<T>(face: T[]): T[][] {
    const size = Math.sqrt(face.length);

    return makeArray(size).map((val, i) => {
        const start = i * size;
        return slice(face, start, start + size);
    });
}

/**
 * Create an array of stickers.
 *
 * @param {CubeStickerValue}    value 
 * @param {number}              length
 *
 * @return {CubeSticker[]} 
 */
export function createFace(value: CubeStickerValue, length: number): CubeSticker[] {
    return makeArray(length).map((x, i): CubeSticker => {
        return {
            data: null,
            originalIndex: i,
            value,
        };
    })
}

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
export function flattenCols<T>(cols: T[][]): T[] {
    return flattenRows(flip(cols));
}

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
export function flattenRows<T>(rows: T[][]): T[] {
   return rows.reduce((acc, row) => acc.concat(row), []);
}

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
export function flip<T>(chunks: T[][]): T[][] {
    return chunks[0].map((x, i) => chunks.map(chunk => chunk[i]));
}

/**
 * Get the face being turned.
 *
 * @param turn 
 */
export function getFace(turn: CubeTurn): CubeFace {
    const { target } = turn;

    switch (target) {
        case 'U': return 'U';
        case 'L': return 'L';
        case 'F': return 'F';
        case 'R': return 'R';
        case 'B': return 'B';
        case 'D': return 'D';
    }

    throw new Error('Cannot get face for whole-cube rotation');
}

/**
 * Test if a turn is a puzzle rotation.
 *
 * @param {CubeTurn}    turn
 *
 * @return {boolean}
 */
export function isPuzzleRotation(turn: CubeTurn): boolean {
    return ['X', 'Y', 'Z'].indexOf(turn.target) !== -1;
}

/**
 * Extract a ring around a face.
 * 
 * @param {CubeFace}    face
 * @param {number}      depth
 *
 * @return {CubeSticker[]}
 */
export function extractRing(face: CubeFace, depth: number): CubeSticker[] {
    return [];
}

/**
 * Parse a turn.
 *
 * @param {string}  turn
 *
 * @return {CubeTurn} 
 */
export function parseTurn(turn: string): CubeTurn {
    const result = turn.match(/^(\d)*([ulfrbdxyzULFRBDXYZ]){1}(w)*(['-2])*$/);

    if (result === null) {
        throw new Error(`Invalid turn: ${turn}`);
    }

    const modifier: string = result[4];
    const target: string = result[2];
    const wide: boolean = Boolean(result[3]);

    let depth: number = result[1] ? parseInt(result[1], 10) : 1;

    if (wide) {
        depth = Math.max(2, depth);
    }

    let rotation = 1;

    if (modifier === '-' || modifier === '\'') {
        rotation = -1;
    } else if (modifier === '2') {
        rotation = 2;
    }

    return { depth, rotation, target, wide };
}

/**
 * Rotate a face array.
 *
 * @param {CubeSticker[]}   face
 * @param {number}          rotation
 *
 * @param {CubeSticker[]} 
 */
export function rotateFace(face: CubeSticker[], rotation: number): CubeSticker[] {
    rotation = ((rotation % 4) + 4) % 4;

    if (rotation === 1) {
        return flattenCols(reverse(chunkRows(face)));
    } else if (rotation === 2) {
        return reverse(face);
    } else if (rotation === 3) {
        return flattenRows(reverse(chunkCols(face)));
    }
    
    return slice(face);
}
