/**
 * Returns the greatest integer less than or equal to its numeric argument.
 *
 * @param {number} n A numeric expression.
 *
 * @return {number}
 */
export function floor(n: number): number {
  return Math.floor(n);
}

/**
 * Test if a number is an integer.
 *
 * @param {number} n A numeric expression.
 *
 * @return {boolean}
 */
export function isInteger(n: number): boolean {
  return Number.isInteger(n);
}

/**
 * Test if a number is odd.
 *
 * @param {number} n A numeric expression.
 *
 * @return {boolean}
 */
export function isOdd(n: number): boolean {
  return n % 2 === 1;
}

/**
 * Returns the larger of a set of supplied numeric expressions.
 *
 * @param {...number[]} values Numeric expressions to be evaluated.
 *
 * @return {number}
 */
export function max(...values: number[]): number {
  return Math.max(...values);
}

/**
 * Returns the smaller of a set of supplied numeric expressions.
 *
 * @param {...number[]} values Numeric expressions to be evaluated.
 *
 * @return {number}
 */
export function min(...values: number[]): number {
  return Math.min(...values);
}

/**
 * Generate random integer.
 *
 * @param {number} low - Lower bound for random integer.
 * @param {number} high - Upper bound for random integer.
 *
 * @return {number}
 */
export function rand(low: number, high: number, random: () => number = Math.random): number {
  return floor(random() * (high - low + 1)) + low;
}
