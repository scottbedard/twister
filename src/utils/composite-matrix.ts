import { extract, inject } from './matrix'
import { floor, odd, roll, times } from '@/utils'

/**
 * Composite matrices are used to represent faces with more than four
 * sides. Each corner section is stored as a normal matrix, followed
 * by rows of middle values, and a center value if necessary.
 *
 * To help visualize composite matrices, see the following representation
 * of a teraminx, https://www.desmos.com/geometry/qxudy50gag
 *
 * [
 *   [
 *     ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'], // <- five 3x3 matrices
 *     ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'],
 *     ['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'],
 *     ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'],
 *     ['e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'],
 *   ],
 *   [
 *     ['f0', 'f1', 'f2'], // <- five 3x1 matrices
 *     ['g0', 'g1', 'g2'],
 *     ['h0', 'h1', 'h2'],
 *     ['i0', 'i1', 'i2'],
 *     ['j0', 'j1', 'j2'],
 *   ],
 *   'center', // <- one middle
 * ]
 */

export type CompositeLayer<T> = [T[], T | undefined, T[]]

export type CompositeMatrix<T> = [T[][]] | [T[][], (T | undefined)[][], T]

export type CompositeMatrixObj = { index: number, matrix: number }

/**
 * Create a composite matrix.
 *
 * @param {number} polygon number of polygon sides, must be >= 5
 * @param {number} depth size of composite matrix. kilominx would be 2, megaminx would be 3, etc...
 * @param {Function} fn function to set initial values
 */
export function createCompositeMatrix<T>(
  polygon: number,
  depth: number,
  fn: (obj: CompositeMatrixObj) => T,
): CompositeMatrix<T> {
  const half = floor(depth / 2)
  const size = half ** 2
  const corners = times(polygon).map((_, matrix) => times(size).map((_, index: number) => fn({ index, matrix })))

  if (odd(depth)) {
    return [
      corners,
      times(polygon).map((_, m) => times(half).map((_, index: number) => fn({ index, matrix: m + 5 }))),
      fn({ index: 0, matrix: 10 }),
    ]
  }

  return [
    corners,
  ]
}

/**
 * Extract layer from composite matrix.
 *
 * @param {CompositeMatrix<T>} composite
 * @param {number} angle
 * @param {number} depth
 */
export function extractComposite<T>(
  composite: CompositeMatrix<T>,
  angle: number,
  depth: number,
): CompositeLayer<T> {
  const corners = roll(composite[0], -angle)

  return [
    extract(corners[0], 0, depth),
    roll(composite[1] ?? [], -angle)[0]?.[depth],
    extract(corners[1], -1, depth),
  ]
}

/**
 * Inject layer to composite matrix.
 *
 * @param {CompositeMatrix<T>} composite
 * @param {CompositeLayer<T>} layer
 * @param {number} angle
 * @param {number} depth
 */
export function injectComposite<T>(
  composite: CompositeMatrix<T>,
  layer: CompositeLayer<T>,
  angle: number,
  depth: number,
): CompositeMatrix<T> {
  const corners = roll(composite[0], -angle)

  corners[0] = inject(layer[0], corners[0], 0, depth)
  corners[1] = inject(layer[2], corners[1], -1, depth)

  if (composite.length > 1) {
    const middles = roll(composite[1] ?? [], -angle).map(arr => arr.slice()) as (T | undefined)[][]

    middles[0][depth] = layer[1]

    return [
      roll(corners, angle),
      roll(middles, angle),
      composite[2]!,
    ]
  }

  return [
    roll(corners, angle),
  ]
}

/**
 * Iterate over all members of a composite matrix.
 */
export function iterateComposite<T>(composite: CompositeMatrix<T>, fn: (val: T) => void): void {
  const [corners, middles, center] = composite

  corners.forEach(matrix => matrix.forEach(x => fn(x)))

  if (middles) {
    middles.forEach(matrix => matrix.forEach(x => x && fn(x)))
  }

  if (center) {
    fn(center)
  }
}

/**
 * Rotate a composite matrix.
 *
 * @param {CompositeMatrix<T>} composite
 * @param {number} rotation
 */
export function rotateComposite<T>(composite: CompositeMatrix<T>, rotation: number): CompositeMatrix<T> {
  return composite.length === 1
    ? [roll(composite[0], rotation)]
    : [roll(composite[0], rotation), roll(composite[1], rotation), composite[2]]
}
