import { DodecaminxFaceLower } from './types';

/**
 * This constant defines how faces are related to one another. Think of it as
 * an unfolded dodecahedron, with the U face oriented towards you.
 */
export const dodecaminxNet: Record<DodecaminxFaceLower, [DodecaminxFaceLower, number][]> = {
  b: [],
  bl: [],
  br: [],
  d: [],
  dbl: [],
  dbr: [],
  dl: [],
  dr: [],
  f: [],
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
