/**
 * Face
 */
export type Face = {
    layers: number,
    sides: number,
    stickers: Sticker[],
};

/**
 * Sticker
 */
export type Sticker = {
    center: boolean,
    currentIndex: number,
    depth: number,
    meta: Object,
    originalIndex: number,
};
