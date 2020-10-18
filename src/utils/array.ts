import { rand } from './number';

/**
 * Gets the first element of an array.
 * 
 * @param {T[]} arr
 * @param {number} begin
 *
 * @return {T}
 */
export function head<T>(arr: T[], begin?: number): T {
  return slice(arr, begin).shift();
}

/**
 * Returns a reversed array without mutating the source.
 *
 * @param {T[]} arr
 *
 * @return {T[]}
 */
export function reverse<T>(arr: T[]): T[] {
  return slice(arr).reverse();
}

/**
 * Roll an array forwards or backwards.
 *
 * @param {T[]} arr 
 * @param {number} n
 *
 * @return {T[]} 
 */
export function roll<T>(arr: T[], n: number): T[] {
  const offset = (((n % arr.length) + arr.length) % arr.length);

  return slice(arr, offset).concat(slice(arr, 0, offset));
}

/**
 * Pick a random item from an array.
 *
 * @param {T[]} arr
 *
 * @return {T}
 */
export function sample<T>(arr: T[], random: () => number): T {
  return arr[rand(0, arr.length - 1, random)];
}

/**
 * Creates a slice of array from start up to, but not including, end.
 *
 * @param {T[]} arr
 * @param {number?} start
 * @param {number?} end
 *
 * @return {T[]}
 */
export function slice<T>(arr: T[], start?: number, end?: number): T[] {
  return arr.slice(start, end);
}

/**
 * Make an array of a given size.
 *
 * @param {number} length
 * @param {T?} val
 *
 * @return {Array}
 */
export function times<T>(length: number, val?: T): T[] {
  return new Array(length).fill(val);
}

/**
 * Splice an array.
 * 
 * @param {T[]} arr
 * @param {number} start
 * @param {number} take
 * @param {T[]} items
 *
 * @return {T[]}
 */
export function splice<T>(arr: T[], start: number, take: number, ...items: T[]): T[] {
  return arr.splice(start, take, ...items);
}
