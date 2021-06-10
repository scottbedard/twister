import { floor, isOdd } from './number';
import { flattenBy, roll, times, without } from './array';

type Cell<T = any> = {
  meta: Record<string, unknown>,
  value: T,
};

const cell = <T>(value: T) => ({ meta: {}, value });

const simplify = <T>(arrs: Cell<T>[][]) => arrs.map((obj) => flattenBy(obj, 'value'));

/**
 * A super matrix manages multiple child matrices, and is used to
 * model regular polygon faces with five or more sides. Each corner
 * is assigned a matrix, and if needed a container for middle edges
 * and a center value.
 *
 * https://www.desmos.com/geometry/uwqit4og7y
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
