import { Sticker } from '../types';
/**
 * Create an array of stickers to represent a puzzle face.
 *
 * @param {number}      sides   number of sides of the polygon
 * @param {number}      layers  puzzle layers
 *
 * @return {Sticker[]}
 */
export declare function createFace(sides: number, layers: number): Sticker[];
