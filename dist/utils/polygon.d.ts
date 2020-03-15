import { PolygonFace, PolygonSticker } from '../types';
/**
 * Create a face for a regular polygons.
 *
 * @param {number}  sides
 * @param {number}  layers
 *
 * @return {PolygonFace}
 */
export declare function createPolygonFace(sides: number, layers: number, value?: number): PolygonFace;
/**
 * Extract layer of stickers from a polygon face.
 *
 * @param {PolygonFace} face
 * @param {number}      depth
 * @param {number}      rotation
 *
 * @return {PolygonSticker[]}
 */
export declare function extractPolygonLayer(face: PolygonFace, depth: number, rotation?: number): PolygonSticker[];
/**
 * Rotate a regular polygon face.
 *
 * @param {PolygonFace} face
 * @param {number}      rotation
 *
 * @return {PolygonFace}
 */
export declare function rotatePolygonFace(face: PolygonFace, rotation: number): PolygonFace;
