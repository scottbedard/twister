import { DodecaminxFaceLower } from './types';

/**
 * This constant defines how faces are related to one another. Think of it as
 * an unfolded dodecahedron, with the U face oriented towards you.
 */
export const dodecaminxNet: Record<DodecaminxFaceLower, [DodecaminxFaceLower, number][]> = {
  b: [],
  bl: [
    ['br', 3],
    ['u', 4],
    ['l', 4],
    ['dbl', 0],
    ['b', 0],
  ],
  br: [
    ['dbr', 4],
    ['r', 4],
    ['u', 0],
    ['bl', 0],
    ['b', 4],
  ],
  d: [
    ['dbl', 3],
    ['dl', 4],
    ['dr', 0],
    ['dbr', 1],
    ['b', 2],
  ],
  dbl: [
    ['bl', 3],
    ['l', 3],
    ['dl', 0],
    ['d', 0],
    ['b', 1],
  ],
  dbr: [
    ['b', 3],
    ['d', 3],
    ['dr', 4],
    ['r', 0],
    ['br', 0],
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
    ['dl', 3],
    ['f', 1],
    ['r', 1],
    ['dbr', 2],
  ],
  f: [
    ['r', 2],
    ['dr', 2],
    ['dl', 2],
    ['l', 1],
    ['u', 2],
  ],
  l: [
    ['u', 3],
    ['f', 3],
    ['dl', 1],
    ['dbl', 1],
    ['bl', 2],
  ],
  r: [
    ['dbr', 3],
    ['dr', 3],
    ['f', 0],
    ['u', 1],
    ['br', 1],
  ],
  u: [
    ['br', 2],
    ['r', 3],
    ['f', 4],
    ['l', 0],
    ['bl', 1],
  ],
};
