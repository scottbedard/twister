import { PolygonFace } from '../types';

/**
 * Dodecaminx options.
 */
export type DodecaminxOptions = {
    size: number,
};

/**
 * Dodecaminx state.
 */
export type DodecaminxState = {
    U: PolygonFace,
    F: PolygonFace,
    L: PolygonFace,
    R: PolygonFace,
    BL: PolygonFace,
    BR: PolygonFace,
    DL: PolygonFace,
    DR: PolygonFace,
    DBL: PolygonFace,
    DBR: PolygonFace,
    B: PolygonFace,
    D: PolygonFace,
};

/**
 * Dodecaminx turn.
 */
export type DodecaminxTurn = {
    // ...
};
