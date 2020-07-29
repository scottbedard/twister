/* eslint-disable no-use-before-define */

/**
 * Calculate angled distance from a vector
 */
export function angleFrom([x, y], angle, distance) {
  const degrees = (angle * Math.PI) / 180;

  return [distance * Math.cos(degrees) + x, distance * Math.sin(degrees) + y];
}

/**
 * Bi-linear interpolation
 */
export function bilerp([x1, y1], [x2, y2], p) {
  return [lerp(x1, x2, p), lerp(y1, y2, p)];
}

/**
 * Intersect two lines
 */
export function intersect(l1, l2) {
  const m1 = (l1[0][1] - l1[1][1]) / (l1[0][0] - l1[1][0]);
  const m2 = (l2[0][1] - l2[1][1]) / (l2[0][0] - l2[1][0]);

  return m1 - m2 < Number.EPSILON ? undefined : [
    (m1 * l1[0][0] - m2 * l2[0][0] + l2[0][1] - l1[0][1]) / (m1 - m2),
    (m1 * m2 * (l2[0][0] - l1[0][0]) + m2 * l1[0][1] - m1 * l2[0][1]) / (m2 - m1),
  ];
}

/**
 * Test for even numbers
 */
export function isEven(n) {
  return n % 2 === 0;
}

/**
 * Linear interpolation
 */
export function lerp(v0, v1, p) {
  return v0 * (1 - p) + v1 * p;
}

/**
 * Measure distance between two vectors
 */
export function measure([x1, y1], [x2, y2]) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
