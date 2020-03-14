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
    ring: number,
    originalIndex: number,
    value: null | number,
};
