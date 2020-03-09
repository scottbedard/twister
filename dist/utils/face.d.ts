import { Face } from '../types';
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
 * Create a rotated copy of a face.
 *
 * @param {Face}    face
 * @param {number}  rotation
 *
 * @return {Face}
 */
export declare function rotateFace(face: Face, rotation: number): Face;
