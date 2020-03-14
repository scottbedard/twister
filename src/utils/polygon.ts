import { PolygonFace, PolygonSticker } from '../types';

/**
 * Create a face for a regular polygons.
 *
 * @param {number}  sides
 * @param {number}  layers
 *
 * @return {PolygonFace}
 */
export function createPolygonFace(sides: number, layers: number): PolygonFace {
    const stickers = [];

    return { layers, sides, stickers };
}

/**
 * Create a sticker for a polygon face.
 *
 * @return {PolygonSticker}
 */
export function createPolygonSticker() {
    // ...
}