import type {
  CubeAxis,
  CubeFace,
  CubeOpposite,
} from './types'

/**
 * Relationship between axis and face turns.
 */
export const cubeAxes: Record<CubeAxis, CubeFace> = {
  x: 'r',
  y: 'u',
  z: 'f',
}

/**
 * This constant defines how faces are related to one another. Think of it as
 * an unfolded cube, with the F face oriented towards you.
 *
 *   U
 * L F R B
 *   D
 *
 * The order of related faces goes clockwise around the target face, starting from
 * the target face's top edge.
 *
 * The first number represents the related faces edge number that borders the
 * target face. These numbers go clockwise around the related face from the
 * top edge, which has a value of zero.
 *
 * The second number represents how a sticker should be rotated before being moved
 * to it's new position, following a clockwise turn.
 *
 * The third number represents a sticker rotation from a counter-clockwise turn.
 *
 * The fourth number represents a sticker rotation from a double turn.
 */
export const cubeNet: Record<CubeFace, [CubeFace, number, number, number, number][]> = {
  u: [
    ['b', 0, 0, 0, 0],
    ['r', 0, 0, 0, 0],
    ['f', 0, 0, 0, 0],
    ['l', 0, 0, 0, 0],
  ],
  l: [
    ['u', 3, 0, 2, 0],
    ['f', 3, 0, 0, 2],
    ['d', 3, 2, 0, 0],
    ['b', 1, 2, 2, 2],
  ],
  f: [
    ['u', 2, 1, -1, 2],
    ['r', 3, 1, -1, 2],
    ['d', 0, 1, -1, 2],
    ['l', 1, 1, -1, 2],
  ],
  r: [
    ['u', 1, 2, 0, 0],
    ['b', 3, 2, 2, 2],
    ['d', 1, 0, 2, 0],
    ['f', 1, 0, 0, 2],
  ],
  b: [
    ['u', 0, -1, 1, 2],
    ['l', 3, -1, 1, 2],
    ['d', 2, -1, 1, 2],
    ['r', 1, -1, 1, 2],
  ],
  d: [
    ['f', 2, 0, 0, 0],
    ['r', 2, 0, 0, 0],
    ['b', 2, 0, 0, 0],
    ['l', 2, 0, 0, 0],
  ],
}

/**
 * Faces that are opposite one another. This is used on turns where the depth
 * reaches the opposite side of the puzzle.
 */
export const cubeOpposites: {
  [T in CubeFace]: CubeOpposite<T>
} = {
  u: 'd',
  l: 'r',
  f: 'b',
  r: 'l',
  b: 'f',
  d: 'u',
}
