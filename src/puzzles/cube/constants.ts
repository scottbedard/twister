import { CubeFaceLower } from './types';

/**
 * This constant defines how faces are related to one another. Think of it as
 * an unfolded cube, with the F face oriented towards you.
 *
 *   U
 * L F R B
 *   D
 *
 * The order of related faces goes clockwise around the target face, starting from
 * the target face's top edge. The number represents the related faces edge number
 * that borders the target face. These numbers go clockwise around the related face
 * from the top edge, which has a value of zero.
 */
export const cubeNet: Record<CubeFaceLower, [
  [CubeFaceLower, number],
  [CubeFaceLower, number],
  [CubeFaceLower, number],
  [CubeFaceLower, number],
]> = {
  u: [
    ['b', 0],
    ['r', 0],
    ['f', 0],
    ['l', 0],
  ],
  l: [
    ['u', 3],
    ['f', 3],
    ['d', 3],
    ['b', 1],
  ],
  f: [
    ['u', 2],
    ['r', 3],
    ['d', 0],
    ['l', 1],
  ],
  r: [
    ['u', 1],
    ['b', 3],
    ['d', 1],
    ['f', 1],
  ],
  b: [
    ['u', 0],
    ['l', 3],
    ['d', 2],
    ['r', 1],
  ],
  d: [
    ['f', 2],
    ['r', 2],
    ['b', 2],
    ['l', 2],
  ],
};

/**
 * Faces that are opposite one another. This is used on turns where the depth
 * reaches the other side of the puzzle.
 */
export const cubeOpposites: Record<CubeFaceLower, CubeFaceLower> = {
  u: 'd',
  l: 'r',
  f: 'b',
  r: 'l',
  b: 'f',
  d: 'u',
};
