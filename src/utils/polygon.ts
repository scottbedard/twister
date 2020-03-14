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
    if (!Number.isInteger(sides) || sides < 5) {
        throw new Error('Polygon sides must be an integer of 5 or greater');
    }

    if (!Number.isInteger(layers) || layers < 2) {
        throw new Error('Polygon layers must be an integer of 5 or greater');
    }

    const stickers: PolygonSticker[] = [];

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