import { DodecaminxFace, DodecaminxValue } from './dodecaminx';

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
}

/**
 * Dodecaminx net
 * 
 * This constant defines how faces are related to one another. Think of
 * it as an "unfolded" dodecahedron, with each face having a designated
 * primary corner. A face's primary corner represents the starting
 * position of corner matrices and middle arrays.
 * 
 * See: https://www.desmos.com/geometry/o8kuskawcb
 */
export const net: Record<DodecaminxFace, [DodecaminxFace, number][]> = {
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
  l: [],
  r: [],
  bl: [],
  br: [],
  dl: [],
  dr: [],
  dbl: [],
  dbr: [],
  b: [],
  d: [],
}