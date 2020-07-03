import { rollArray } from './array';
import { isOdd } from './number';

/**
 * Regular polygon face.
 * 
 * Be aware that this should only be used for pentagons
 * and higher. Since square faces can be turned deeper
 * than their center row, the utils that deal with this
 * type do not accomodate them.
 */
export type PolygonFace = {
    layers: number,
    sides: number,
    stickers: PolygonSticker[],
};

/**
 * Regular polygon sticker.
 */
export type PolygonSticker = {
    depth: number,
    originalIndex: number,
    value: null | number,
};


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
 * Extract layer of stickers from a polygon face.
 *
 * @param {PolygonFace} face
 * @param {number}      depth 
 * @param {number}      rotation
 *
 * @return {PolygonSticker[]} 
 */
export function extractPolygonLayer(face: PolygonFace, depth: number, rotation: number = 0): PolygonSticker[] {
    const rotatedFace = rotatePolygonFace(face, rotation);

    // loop from 1 to our desired depth, and add any sticker
    // that intersects this cut to the stickers array.
    const stickers: PolygonSticker[] = [];

    for (let i = 1; i <= depth; i++) {
        const ring = rotatedFace.stickers.filter(s => s.depth === i);

        if (i < depth) {
            stickers.push(ring[(ring.length / face.sides) + (depth - i)]); // <- leading
            stickers.push(ring[ring.length - (depth - i)]); // <- trailing
        } else if (i === depth) {
            stickers.push(...ring.slice(0, face.layers - ((depth - 1) * 2))); // <- middle
        }
    }

    return stickers;
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

/**
 * Extract a slice from one polygon face, and insert into another.
 *
 * @param {PolygonFace} source
 * @param {number}      sourceAngle
 * @param {PolygonFace} target
 * @param {number}      targetAngle
 * @param {number}      depth
 * @param {boolean}     wide
 *
 * @return {PolygonFace}
 */
export function splicePolygonLayer(
    source: PolygonFace,
    sourceAngle: number,
    target: PolygonFace,
    targetAngle: number,
    depth: number,
    wide: boolean = false
) {
    source = rotatePolygonFace(source, sourceAngle);
    target = rotatePolygonFace(target, targetAngle);

    extractPolygonLayer(source, depth).forEach((sticker) => {
        const index = source.stickers.indexOf(sticker);

        target.stickers[index] = sticker;
    });

    return rotatePolygonFace(target, -targetAngle);
}