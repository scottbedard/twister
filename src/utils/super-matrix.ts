import { extract, inject } from './matrix';
import { flattenBy, roll, times, without } from './array';
import { floor, isOdd } from './number';

type Cell<T = any> = {
  meta: Record<string, unknown>,
  value: T,
};

type CellLayer<T> = [Cell<T>[], Cell<T> | undefined, Cell<T>[]];

const cell = <T>(value: T) => ({ meta: {}, value });

const simplify = <T>(arrs: Cell<T>[][]) => arrs.map((obj) => flattenBy(obj, 'value'));

/**
 * A super matrix manages multiple child matrices, and is used to
 * model regular polygon faces with five or more sides. Each corner
 * is assigned a matrix, and if needed a container for middle edges
 * and a center value.
 *
 * See here for a 5x7 super matrix visualization
 * https://www.desmos.com/geometry/nbz63vsuol
 */
export class SuperMatrix<T = any> {
  /**
   * Center value.
   */
  center: Cell<T> = cell(null);

  /**
   * Corner matrices.
   */
  corners: Cell<T>[][] = [];

  /**
   * Number of layers.
   */
  layers: number;

  /**
   * Middle values.
   */
  middles: Cell<T>[][] = [];

  /**
   * Number of sides.
   */
  sides: number;

  /**
   * Super matrix.
   *
   * @param {number} sides Regular polygon sides.
   * @param {number} layers Number of layers.
   * @param {T} value Initial value.
   */
  constructor(sides: number, layers: number, value: T = null) {
    this.sides = sides;

    this.layers = layers;

    this.corners = times(sides).map(() => times(floor(layers / 2) ** 2, value).map(cell));

    if (isOdd(layers)) {
      this.center.value = value;

      this.middles = times(sides).map(() => times(floor(layers / 2), value).map(cell));
    }
  }

  /**
   * Apply simplified values.
   */
  apply([corners, middles, center]: [T[][], T[][]?, T?]) {
    const map = (target: 'corners' | 'middles', arrs: T[][]) => {
      arrs.forEach((arr, i) => {
        arr.forEach((value, j) => {
          this[target][i][j].value = value;
        });
      });
    };

    map('corners', corners);

    if (isOdd(this.layers)) {
      if (middles) {
        map('middles', middles);
      }

      if (center) {
        this.center.value = center;
      }
    }
  }

  /**
   * Extract values from a given angle.
   *
   * @param {number} angle Angle to extract values from.
   * @param {number} depth Depth to extract values from.
   */
  extract(angle: number, depth: number): CellLayer<T> {
    const corners = roll(this.corners, -angle);

    return [
      extract(corners[0], 0, depth), // leading matrix row
      roll(this.middles, -angle)[0]?.[depth] ?? undefined, // middle value
      extract(corners[1], -1, depth), // trailing matrix column
    ];
  }

  /**
   * Inject values to a super matrix.
   */
  inject([leading, middle, trailing]: CellLayer<T>, angle: number, depth: number) {
    const corners = roll(this.corners, -angle);

    corners[0] = inject(leading, corners[0], 0, depth);
    corners[1] = inject(trailing, corners[1], -1, depth);

    this.corners = roll(corners, angle);

    if (isOdd(this.layers) && middle) {
      const middles = roll(this.middles, -angle);

      middles[0][depth] = middle;

      this.middles = roll(middles, angle);
    }
  }

  /**
   * Output simplified values.
   */
  output() {
    return without([
      simplify(this.corners),
      isOdd(this.layers) ? simplify(this.middles) : null,
      this.center.value,
    ], null);
  }

  /**
   * Rotate.
   */
  rotate(angle: number) {
    this.corners = roll(this.corners, angle);
    this.middles = roll(this.middles, angle);
  }
}
