import {
    CubeSticker,
    CubeStickerValue,
    CubeTurn,
} from './types';

import { makeArray } from '../../utils/array';

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