/**
 * Test if a number is an integer.
 *
 * @param {number} n
 *
 * @return {boolean}
 */
export function isInteger(n: number): boolean {
  return Number.isInteger(n);
}

/**
 * Test if a number is odd.
 *
 * @param {number} n
 *
 * @return {boolean}
 */
export function isOdd(n: number): boolean {
  return n % 2 === 1;
}

/**
 * Generate random integer.
 *
 * @param {number} min
 * @param {number} max
 *
 * @return number
 */
export function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
