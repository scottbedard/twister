import { Line, Vector } from './types'

/**
 * Calculate angled distance from a vector
 */
export function angleFrom([x, y]: Vector, angle: number, distance: number): Vector {
  const degrees = (angle * Math.PI) / 180

  return [distance * Math.cos(degrees) + x, distance * Math.sin(degrees) + y]
}

/**
 * Bi-linear interpolation
 */
export function bilerp([x1, y1]: Vector, [x2, y2]: Vector, p: number): Vector {
  return [lerp(x1, x2, p), lerp(y1, y2, p)]
}

/**
 * Intersect two lines, returns undefined if lines do not intersect.
 */
export function intersect(l1: Line, l2: Line): Vector|undefined {
  const m1 = (l1[0][1] - l1[1][1]) / (l1[0][0] - l1[1][0]);
  const m2 = (l2[0][1] - l2[1][1]) / (l2[0][0] - l2[1][0]);

  return m1 - m2 < Number.EPSILON ? undefined : [
    (m1 * l1[0][0] - m2 * l2[0][0] + l2[0][1] - l1[0][1]) / (m1 - m2),
    (m1 * m2 * (l2[0][0] - l1[0][0]) + m2 * l1[0][1] - m1 * l2[0][1]) / (m2 - m1),
  ];
}

/**
 * Test if a number is even
 */
export function isEven(n: number) {
  return n % 2 === 0
}

/**
 * Linear interpolation
 */
export function lerp(a: number, b: number, p: number) {
  return a * (1 - p) + b * p
}

/**
 * Measure distance between two vectors
 */
export function measure([x1, y1]: Vector, [x2, y2]: Vector) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
}

/**
 * Convert array of vectors to SVG-coordinates
 */
export function toPathCoords(arr: Vector[]) {
  return arr.map(toSvgCoords);
}

/**
 * Convert a vector to SVG-coordinates
 */
export function toSvgCoords([x, y]: Vector): Vector {
  return [x, -y]
}
