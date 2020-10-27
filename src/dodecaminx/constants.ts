import { DodecaminxFace, DodecaminxValue } from './dodecaminx';

type AdjacentFace<T> = Exclude<DodecaminxFace, T>;

type RotationAmount = -2 | -1 | 0 | 1 | 2;

export type AdjacentRelationship<T> = [
  AdjacentFace<T>,
  RotationAmount, // slice relationship
  RotationAmount, // clockwise face relationship
  RotationAmount, // counter-clockwise face relationship
];

type IntersectingFaces<T extends DodecaminxFace> = [
  AdjacentFace<T>,
  AdjacentFace<T>,
  AdjacentFace<T>,
  AdjacentFace<T>,
  AdjacentFace<T>,
];

type RelatedFaces<T extends DodecaminxFace> = [
  AdjacentRelationship<T>,
  AdjacentRelationship<T>,
  AdjacentRelationship<T>,
  AdjacentRelationship<T>,
  AdjacentRelationship<T>,
];

/**
 * Default sticker values
 */
export const defaultValues: Record<DodecaminxFace, DodecaminxValue> = {
  b: 0,
  bl: 1,
  br: 2,
  d: 3,
  dbl: 4,
  dbr: 5,
  dl: 6,
  dr: 7,
  f: 8,
  l: 9,
  r: 10,
  u: 11,
};

/**
 * Dodecaminx net
 * 
 * This constant defines how faces are related to one another. Think of
 * it as an "unfolded" dodecahedron, with each face having a designated
 * primary corner. A face's primary corner represents the orientation
 * of that face, and is used to determine the offset to adjacent faces.
 * 
 * See: https://www.desmos.com/geometry/o8kuskawcb
 */
export const dodecaminxNet: {
  [K in DodecaminxFace]: RelatedFaces<K>
} = {
  u: [
    ['br', 2, 1, -1],
    ['r', -2, 1, -1],
    ['f', -1, 1, -1],
    ['l', 0, 1, -1],
    ['bl', 1, 1, -1],
  ],
  f: [
    ['r', 2, 0, 0],
    ['dr', 2, 0, 0],
    ['dl', 2, 0, 1],
    ['l', 1, -1, -1],
    ['u', 2, 1, 0],
  ],
  l: [
    ['u', -2, 1, 0],
    ['f', -2, 0, 2],
    ['dl', 1, -2, 0],
    ['dbl', 1, 0, -1],
    ['bl', 2, 1, -1],
  ],
  r: [
    ['dbr', -2, 2, 0],
    ['dr', -2, 0, -2],
    ['f', 0, 2, -1],
    ['u', 1, 1, 0],
    ['br', 1, 0, -2],
  ],
  bl: [
    ['br', -2, -2, -1],
    ['u', -1, 1, 0],
    ['l', -1, 0, -1],
    ['dbl', 0, 1, 0],
    ['b', 0, 0, 2],
  ],
  br: [
    ['dbr', -1, 0, 0],
    ['r', -1, 0, -1],
    ['u', 0, 1, 0],
    ['bl', 0, 0, 1],
    ['b', -1, -1, 0],
  ],
  dl: [
    ['dbl', 2, 1, 0],
    ['l', 2, 0, 0],
    ['f', 2, 0, 1],
    ['dr', 1, -1, 0],
    ['d', 1, 0, -1],
  ],
  dr: [
    ['d', 2, 0, -1],
    ['dl', -2, 1, 2],
    ['f', 1, -2, 0],
    ['r', 1, 0, -1],
    ['dbr', 2, 1, 0],
  ],
  dbl: [
    ['bl', -2, 2, 0],
    ['l', -2, 0, -2],
    ['dl', 0, 2, 0],
    ['d', 0, 0, -1],
    ['b', 1, 1, -2],
  ],
  dbr: [
    ['b', -2, -2, 0],
    ['d', -2, 0, -1],
    ['dr', -1, 1, -1],
    ['r', 0, 1, 0],
    ['br', 0, 0, 2],
  ],
  b: [
    ['bl', -1, 0, 0],
    ['dbl', -1, 0, 0],
    ['d', -1, 0, -1],
    ['dbr', 0, 1, 1],
    ['br', -1, -1, 0],
  ],
  d: [
    ['dbl', -2, 1, -1],
    ['dl', -1, 1, -1],
    ['dr', 0, 1, -1],
    ['dbr', 1, 1, -1],
    ['b', 2, 1, -1],
  ],
};

/**
 * Map of faces and their intersecting adjacent faces.
 */
export const dodecaminxIntersections: {
  [K in DodecaminxFace]: IntersectingFaces<K>
} = {
  b: ['dbl', 'dl', 'dr', 'dbr', 'd'],
  bl: ['br', 'u', 'l', 'dbl', 'b'],
  br: ['dbr', 'r', 'u', 'bl', 'b'],
  d: ['dbl', 'dl', 'dr', 'dbr', 'b'],
  dbl: ['bl', 'l', 'dl', 'd', 'b'],
  dbr: ['b', 'd', 'dr', 'r', 'br'],
  dl: ['dbl', 'l', 'f', 'dr', 'd'],
  dr: ['d', 'dl', 'f', 'r', 'dbr'],
  f: ['r', 'dr', 'dl', 'l', 'u'],
  l: ['u', 'f', 'dl', 'dbl', 'bl'],
  r: ['dbr', 'dr', 'f', 'u', 'br'],
  u: ['br', 'r', 'f', 'l', 'bl'],
};

/**
 * Map of opposite faces.
 */
export const dodecaminxOpposites: {
  [K in DodecaminxFace]: Exclude<DodecaminxFace, K>
} = {
  b: 'f',
  bl: 'dr',
  br: 'dl',
  d: 'u',
  dbl: 'r',
  dbr: 'l',
  dl: 'br',
  dr: 'bl',
  f: 'b',
  l: 'dbr',
  r: 'dbl',
  u: 'd',
};
