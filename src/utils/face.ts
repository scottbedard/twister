import { Face, Sticker } from '../types';
import { isOdd } from './number';
import { roll } from './array';

/**
 * Create a turnable puzzle face.
 *
 * @param {number}  sides   number of sides of the polygon
 * @param {number}  layers  puzzle layers
 *
 * @return {Face}
 */
export function createFace(sides: number, layers: number): Face {
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
    const stickers: Sticker[] = [];

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
 * Create a rotated copy of a face.
 *
 * @param {Face}    face
 * @param {number}  rotation
 *
 * @return {Face}
 */
export function rotateFace(face: Face, rotation: number): Face {
    if (!Number.isInteger(rotation)) {
        throw new Error('Face rotations must be an integer');
    }

    const stickers: Sticker[] = [];

    for (let i = 0, stop = Math.floor(face.layers / 2); i <= stop; i++) {
        const arr = face.stickers.filter(sticker => sticker.depth === i);

        rotation = rotation % face.sides;
        
        if (arr.length > 1) {
            const distance = ((face.sides - 1) * -rotation) + rotation;

            if (distance) {
                roll(arr, distance);
            }
        }

        stickers.push(...arr);
    }

    return { ...face, stickers }
}
