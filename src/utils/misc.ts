/**
 * Returns the greatest integer less than or equal to its numeric argument.
 */
export function floor(n: number): number {
  return Math.floor(n)
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function int(min: number, max: number, rand: () => number = Math.random): number {
  return floor(rand() * (max - min + 1)) + min
}

/**
 * Get the keys of an object
 */
export function keys<T extends Record<string, unknown>>(obj: T) {
  return Object.keys(obj) as (keyof T)[]
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
