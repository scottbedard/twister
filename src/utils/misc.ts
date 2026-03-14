/**
 * Sample an element from the array
 */
export function sample<T>(arr: T[], rand: () => number): T {
  return arr[Math.floor(rand() * arr.length)]
}

/**
 * Generate a random integer between min and max (inclusive)
 */
export function int(min: number, max: number, rand: () => number): number {
  return Math.floor(rand() * (max - min + 1)) + min
}
