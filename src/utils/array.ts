import { floor } from './misc'

/**
 * Shallow-flatten an array
 */
export function flatten<T>(arr: T[][]): T[] {
  return arr.reduce((acc, curr) => acc.concat(curr), [])
}

/**
 * Roll an array forwards or backwards.
 *
 * @param {T[]} arr Source array to roll.
 * @param {number} n Number of elements to roll array. Positive values roll towards the end of the array, and negative values roll towards the start.
 *
 * @return {T[]}
 */
export function roll<T>(arr: T[], n: number): T[] {
  const offset = ((-n % arr.length) + arr.length) % arr.length

  return arr.slice(offset).concat(arr.slice(0, offset))
}

/**
 * Sample an element from the array
 */
export function sample<T>(arr: T[], rand: () => number = Math.random): T {
  return arr[floor(rand() * arr.length)]
}

/**
 * Shuffle an array
 */
export function shuffle<T>(arr: T[], rand: () => number = Math.random): T[] {
  return arr.sort(() => rand() - 0.5)
}

/**
 * Create an array of length length, filled with value.
 */
export function times<T>(length: number, value?: T): T[] {
  return new Array(length).fill(value)
}

/**
 * Create an array excluding given values.
 */
export function without<T>(arr: T[], ...values: T[]): T[] {
  return arr.filter(val => !values.includes(val))
}
