import { PolygonFace, PolygonSticker } from '../types';

import { makeArray, rollArray } from './array';
import { isOdd } from './number';

/**
 * Create a face for a regular polygons.
 *
 * @param {number}  sides
 * @param {number}  layers
 *
 * @return {PolygonFace}
 */
export function createPolygonFace(sides: number, layers: number, value: number = null): PolygonFace {
    if (!Number.isInteger(sides) || sides < 5) {
        throw new Error('Polygon sides must be an integer 5 or greater');
    }

    if (!Number.isInteger(layers) || layers < 2) {
        throw new Error('Polygon layers must be an integer 5 or greater');
    }

    // create outer stickers
    const stickers: PolygonSticker[] = [];

    let originalIndex = 0;

    for (let i = 0, stop = Math.ceil(layers / 2); i < stop; i++) {
        const length = (layers - (i * 2) - 1) * sides;
        
        for (let j = 0; j < length; j++) {
            stickers.push({ originalIndex, depth: i + 1, value });
            originalIndex++;
        }
    }

    // create a center sticker
    if (isOdd(layers)) {
        const depth = Math.floor(layers / 2) + 1;

        stickers.push({ originalIndex, depth, value });
    }

    return { layers, sides, stickers };
}

/**
 * Extract slice of stickers from a polygon face.
 *
 * @param {PolygonFace} face
 * @param {number}      number 
 * @param {number}      rotation
 *
 * @return {PolygonFace} 
 */
export function extractPolygonSlice(face: PolygonFace, depth: number, rotation: number = 0): PolygonFace {
    const rotatedFace = rotatePolygonFace(face, rotation);

    return { ...face };
}

/**
 * Rotate a regular polygon face.
 *
 * @param {PolygonFace} face
 * @param {number}      rotation
 *
 * @return {PolygonFace}
 */
export function rotatePolygonFace(face: PolygonFace, rotation: number): PolygonFace {
    if (!Number.isInteger(rotation)) {
        throw new Error('Polygon face rotation must be an integer');
    }

    const stickers: PolygonSticker[] = [];

    rotation = rotation % face.sides;

    for (let i = 0, stop = Math.ceil(face.layers / 2); i <= stop; i++) {
        const arr = face.stickers.filter(sticker => sticker.depth === i);

        if (rotation && arr.length > 1) {
            const distance = (arr.length / face.sides) * -rotation;

            if (distance) {
                stickers.push(...rollArray(arr, distance));
            }
        } else {
            stickers.push(...arr);
        }
    }

    return { ...face, stickers }
}
