import { CubeSticker, CubeStickerValue, CubeTurn } from './types';
/**
 * Create an array of stickers.
 *
 * @param {CubeStickerValue}    value
 * @param {number}              length
 *
 * @return {CubeSticker[]}
 */
export declare function createFace(value: CubeStickerValue, length: number): CubeSticker[];
/**
 * Parse a turn.
 *
 * @param {string}  turn
 *
 * @return {CubeTurn}
 */
export declare function parseTurn(turn: string): CubeTurn;
