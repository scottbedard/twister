import { Face, Sticker } from '../types';
/**
 * Create a turnable puzzle face.
 *
 * @param {number}  sides   number of sides of the polygon
 * @param {number}  layers  puzzle layers
 *
 * @return {Face}
 */
export declare function createFace(sides: number, layers: number): Face;
/**
 * Extract a slice from a face.
 *
 * @param {face}    face
 * @param {number}  depth
 * @param {number}  angle
 *
 * @return {Sticker[]}
 */
export declare function extractSlice(face: Face, depth: number, angle: number): Sticker[];
/**
 * Create a rotated copy of a face.
 *
 * @param {Face}    face
 * @param {number}  rotation
 *
 * @return {Face}
 */
export declare function rotateFace(face: Face, rotation: number): Face;
