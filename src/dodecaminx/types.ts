import { PolygonFace } from '../types';

/**
 * Dodecaminx axis and face.
 */
export type DodecaminxAxis = 'u' | 'f' | 'l' | 'r' | 'bl' | 'br' | 'dl' | 'dr' | 'dbl' | 'dbr' | 'b' | 'd';

export type DodecaminxFace = 'U' | 'F' | 'L' | 'R' | 'BL' | 'BR' | 'DL' | 'DR' | 'DBL' | 'DBR' | 'B' | 'D';

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
 * Cube turn.
 */
export type DodecaminxTurn = {
    depth: number,
    rotation: number,
    target: DodecaminxFace | DodecaminxAxis,
    wide: boolean,
};

