import { PolygonFace, PolygonSticker } from '../types';
import { isOdd } from './number';
import { rollArray } from './array';

/**
 * Create a turnable puzzle face.
 *
 * @param {number}  sides   number of sides of the polygon
 * @param {number}  layers  puzzle layers
 *
 * @return {PolygonFace}
 */
export function createFace(sides: number, layers: number): PolygonFace {
    if (!Number.isInteger(sides) || sides < 3) {
        throw new Error('Polygon sides must be an integer of 3 or greater');
    }

    if (!Number.isInteger(layers) || layers < 2) {
        throw new Error('Polygon layers must be an integer of 2 or greater');
    }
    
    if (sides === 3) {
        // pyramids are a special case, in that odd layer numbers
        // still have a center piece. will come back to this...
        // see: https://www.desmos.com/geometry/ltfdqc56p4
        throw new Error('Pyramids are not implemented yet');
    }

    // create outer stickers
    const stickers: PolygonSticker[] = [];

    for (let depth = 0, stop = Math.floor(layers / 2); depth < stop; depth++) {
        const length = (layers - (depth * 2) - 1) * sides;
        
        for (let index = 0; index < length; index++) {
            stickers.push({
                center: false,
                currentIndex: index,
                depth,
                meta: {},
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
            meta: {},
            originalIndex: 0,
        });
    }

    return {
        layers,
        sides,
        stickers: stickers,
    };
}

/**
 * Extract a slice from a face.
 *
 * @param {face}    face
 * @param {number}  depth
 * @param {number}  angle
 *
 * @return {PolygonSticker[]}
 */
export function extractSlice(face: PolygonFace, depth: number, angle: number): PolygonSticker[] {
    if (!Number.isInteger(depth) || depth < 0) {
        throw new Error('Slice depth must be a positive integer');
    }

    if (!Number.isInteger(angle) || angle < 0) {
        throw new Error('Slice angle must be a positive integer');
    }

    return [];
}

/**
 * Create a rotated copy of a face.
 *
 * @param {PolygonFace}    face
 * @param {number}  rotation
 *
 * @return {PolygonFace}
 */
export function rotateFace(face: PolygonFace, rotation: number): PolygonFace {
    if (!Number.isInteger(rotation)) {
        throw new Error('Face rotations must be an integer');
    }

    const stickers: PolygonSticker[] = [];

    rotation = rotation % face.sides;

    for (let i = 0, stop = Math.floor(face.layers / 2); i <= stop; i++) {
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
