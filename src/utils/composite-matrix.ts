import { extract, inject } from './matrix';
import { floor, isOdd } from '@/utils/number';
import { roll, times } from './array';

/**
 * Composite matrices are used to represent the faces with more than
 * 4 sides. Each corner section is stored as a normal matrix, followed
 * by rows of middle values, and a center value if necessary.
 *
 * To help visualize composite matrices, see the following representation
 * of a teraminx, https://www.desmos.com/geometry/qxudy50gag
 *
 * [
 *   [
 *     ['a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8'],
 *     ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7', 'b8'],
 *     ['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8'],
 *     ['d0', 'd1', 'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8'],
 *     ['e0', 'e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7', 'e8'],
 *   ],
 *   [
 *     ['f0', 'f1', 'f2'],
 *     ['g0', 'g1', 'g2'],
 *     ['h0', 'h1', 'h2'],
 *     ['i0', 'i1', 'i2'],
 *     ['j0', 'j1', 'j2'],
 *   ],
 *   'center',
 * ]
 */

export type CompositeLayer<T> = [T[], T | undefined, T[]];

export type CompositeMatrix<T> = [T[][]] | [T[][], T[][], T];

/**
 * Create a composite matrix.
 *
 * @param {number} sides number of polygon sides, must be >= 5
 * @param {number} size size of composite matrix. kilominx would be 2, megaminx would be 3, etc...
 * @param {Function} valueFn function to set initial values
 */
export function createComposite<T>(
  sides: number,
  size: number,
  valueFn: () => T = () => null,
): CompositeMatrix<T> {
  const halfSize = floor(size / 2);
  const matrixSize = halfSize ** 2;
  const corners = times(sides).map(() => times(matrixSize).map(valueFn));

  if (isOdd(size)) {
    return [
      corners,
      times(sides).map(() => times(halfSize).map(valueFn)),
      valueFn(),
    ];
  }

  return [
    corners,
  ];
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
  const corners = roll(composite[0], -angle);

  return [
    extract(corners[0], 0, depth),
    roll(composite[1] ?? [], -angle)[0]?.[depth],
    extract(corners[1], -1, depth),
  ];
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
  const corners = roll(composite[0], -angle);

  corners[0] = inject(layer[0], corners[0], 0, depth);
  corners[1] = inject(layer[2], corners[1], -1, depth);

  if (composite.length > 1) {
    const middles = roll(composite[1], -angle).map((arr) => arr.slice());

    middles[0][depth] = layer[1];

    return [
      roll(corners, angle),
      roll(middles, angle),
      composite[2],
    ];
  }

  return [
    roll(corners, angle),
  ];
}

/**
 * Rotate a composite matrix.
 *
 * @param {CompositeMatrix<T>} composite
 * @param {number} rotation
 */
export function rotateComposite<T>(
  composite: CompositeMatrix<T>,
  rotation: number,
): CompositeMatrix<T> {
  return composite.length === 1
    ? [roll(composite[0], rotation)]
    : [roll(composite[0], rotation), roll(composite[1], rotation), composite[2]];
}
