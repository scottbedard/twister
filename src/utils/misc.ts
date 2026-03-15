/**
 * Returns the greatest integer less than or equal to its numeric argument.
 */
export function floor(n: number): number {
  return Math.floor(n)
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function int(min: number, max: number, rand: () => number): number {
  return Math.floor(rand() * (max - min + 1)) + min
}

/**
 * Returns the larger of a set of supplied numeric expressions.
 */
export function max(...values: number[]): number {
  return Math.max(...values)
}

/**
 * Returns the smaller of a set of supplied numeric expressions.
 */
export function min(...values: number[]): number {
  return Math.min(...values)
}

/**
 * Test if a number is odd
 */
export function odd(n: number): boolean {
  return n % 2 === 1
}
