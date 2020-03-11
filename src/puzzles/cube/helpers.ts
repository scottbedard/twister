import {
    CubeSticker,
    CubeStickerValue,
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
    const centerIndex = Math.floor(length / 2);

    return makeArray(length).map((x, i): CubeSticker => {
        return {
            center: centerIndex === i,
            data: null,
            originalIndex: i,
            value,
        };
    })
}
