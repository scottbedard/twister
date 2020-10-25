import { DodecaminxFace, DodecaminxValue } from './dodecaminx';

type AdjacentFace<T> = Exclude<DodecaminxFace, T>;

export type AdjacentRelationship<T> = [AdjacentFace<T>, -2 | -1 | 0 | 1 | 2];

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
    ['br', 2],
    ['r', -2],
    ['f', -1],
    ['l', 0],
    ['bl', 1],
  ],
  f: [
    ['r', 2],
    ['dr', 2],
    ['dl', 2],
    ['l', 1],
    ['u', 2],
  ],
  l: [
    ['u', -2],
    ['f', -2],
    ['dl', 1],
    ['dbl', 1],
    ['bl', 2],
  ],
  r: [
    ['dbr', -2],
    ['dr', -2],
    ['f', 0],
    ['u', 1],
    ['br', 1],
  ],
  bl: [
    ['br', -2],
    ['u', -1],
    ['l', -1],
    ['dbl', 0],
    ['b', 0],
  ],
  br: [
    ['dbr', -1],
    ['r', -1],
    ['u', 0],
    ['bl', 0],
    ['b', -1],
  ],
  dl: [
    ['dbl', 2],
    ['l', 2],
    ['f', 2],
    ['dr', 1],
    ['d', 1],
  ],
  dr: [
    ['d', 2],
    ['dl', -2],
    ['f', 1],
    ['r', 1],
    ['dbr', 2],
  ],
  dbl: [
    ['bl', -2],
    ['l', -2],
    ['dl', 0],
    ['d', 0],
    ['b', 1],
  ],
  dbr: [
    ['b', -2],
    ['d', -2],
    ['dr', -1],
    ['r', 0],
    ['br', 0],
  ],
  b: [
    ['dbl', -2],
    ['dl', -1],
    ['dr', 0],
    ['dbr', 1],
    ['d', 2],
  ],
  d: [
    ['dbl', -2],
    ['dl', -1],
    ['dr', 0],
    ['dbr', 1],
    ['b', 2],
  ],
};

/**
 * Map of faces and their intersecting adjacent faces.
 */
export const dodecaminxIntersections: {
  [K in DodecaminxFace]: IntersectingFaces<K>
} = {
  u: ['br', 'r', 'f', 'l', 'bl'],
  f: ['r', 'dr', 'dl', 'l', 'u'],
  l: ['u', 'f', 'dl', 'dbl', 'bl'],
  r: ['dbr', 'dr', 'f', 'u', 'br'],
  bl: ['br', 'u', 'l', 'dbl', 'b'],
  br: ['dbr', 'r', 'u', 'bl', 'b'],
  dl: ['dbl', 'l', 'f', 'dr', 'd'],
  dr: ['d', 'dl', 'f', 'r', 'dbr'],
  dbl: ['bl', 'l', 'dl', 'd', 'b'],
  dbr: ['b', 'd', 'dr', 'r', 'br'],
  b: ['dbl', 'dl', 'dr', 'dbr', 'd'],
  d: ['dbl', 'dl', 'dr', 'dbr', 'b'],
};
