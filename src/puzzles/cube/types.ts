/**
 * Cube sticker.
 */
export type CubeSticker = {
    data: any,
    originalIndex: number,
    value: CubeStickerValue,
};

/**
 * Cube sticker value.
 */
export type CubeStickerValue = null | 0 | 1 | 2 | 3 | 4 | 5;

/**
 * Cube options.
 */
export type CubeOptions = {
    size: number,
};

/**
 * Cube state.
 */
export type CubeState = {
    U: CubeSticker[],
    L: CubeSticker[],
    F: CubeSticker[],
    R: CubeSticker[],
    B: CubeSticker[],
    D: CubeSticker[],
}

/**
 * Cube turn.
 */
export type CubeTurn = {
    depth: number,
    rotation: number,
    target: string,
    wide: boolean,
};
