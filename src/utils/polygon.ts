import { PolygonFace, PolygonSticker } from '../types';

import { isOdd } from './number';

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

    // create a ring of stickers for each layer
    const stickers: PolygonSticker[] = [];

    for (let depth = 0, stop = Math.floor(layers / 2); depth < stop; depth++) {
        const length = (layers - (depth * 2) - 1) * sides;
        
        for (let index = 0; index < length; index++) {
            stickers.push({
                center: false,
                currentIndex: index,
                depth,
                originalIndex: index,
            });
        }
    }

    // create a center sticker for odd layered puzzles
    if (isOdd(layers)) {
        stickers.push({
            center: true,
            currentIndex: 0,
            depth: Math.floor(layers / 2),
            originalIndex: 0,
        });
    }

    return { layers, sides, stickers };
}
