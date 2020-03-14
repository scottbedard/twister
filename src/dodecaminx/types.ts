/**
 * Dodecaminx options.
 */
export type DodecaminxOptions = {
    size: number,
};

/**
 * Dodecaminx sticker.
 */
export type DodecaminxSticker = {
    data: any,
    originalIndex: number,
    value: DodecaminxStickerValue,
};

/**
 * Dodecaminx sticker value.
 */
export type DodecaminxStickerValue = null | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/**
 * Dodecaminx state.
 */
export type DodecaminxState = {
    U: DodecaminxSticker[],
    F: DodecaminxSticker[],
    R: DodecaminxSticker[],
    L: DodecaminxSticker[],
    BR: DodecaminxSticker[],
    BL: DodecaminxSticker[],
    D: DodecaminxSticker[],
    DR: DodecaminxSticker[],
    DL: DodecaminxSticker[],
    DBR: DodecaminxSticker[],
    DBL: DodecaminxSticker[],
    B: DodecaminxSticker[],
};

/**
 * Dodecaminx turn.
 */
export type DodecaminxTurn = {
    // ...
};
