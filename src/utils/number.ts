/**
 * Returns the greatest integer less than or equal to its numeric argument.
 *
 * @param {number} n
 *
 * @return {number}
 */
export function floor(n: number): number {
  return Math.floor(n);
}

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
export function rand(min: number, max: number, random: () => number): number {
  return Math.floor((random || Math.random)() * (max - min + 1)) + min;
}
