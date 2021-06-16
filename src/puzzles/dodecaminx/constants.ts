import { DodecaminxFaceLower } from './types';

/**
 * This constant defines how faces are related to one another. Think of it as
 * an unfolded dodecahedron, with the U face oriented towards you.
 */
export const dodecaminxNet: Record<DodecaminxFaceLower, any> = {
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
  u: [],
};
