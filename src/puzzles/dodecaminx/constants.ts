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
  l: [],
  r: [],
  u: [
    ['bl', 1],
    ['br', 2],
    ['r', 3],
    ['f', 4],
    ['l', 0],
  ],
};
