import { DodecaminxFace } from './dodecaminx';

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
  f: [],
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