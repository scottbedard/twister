import { rand } from './number';
import { ValueOrArray } from './types';

/**
 * Flatten an array of objects by key.
 */
export function flattenBy<T extends Record<string, unknown>>(arr: T[], key: keyof T) {
  return arr.map((obj) => obj[key]);
}

/**
 * Flatten a recursive array.
 *
 * @param {ValueOrArray<T>[]} arr recursive array to flatten
 */
export function flattenDeep<T>(arr: ValueOrArray<T>[]): T[] {
  return arr.reduce<T[]>((acc, val) => acc.concat(Array.isArray(val) ? flattenDeep(val) : val), []);
}

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
 * Test if an array contains uniform values.
 *
 * @param {T[]} arr Array to test for uniformity.
 */
export function isUniform<T>(arr: T[]): boolean {
  if (arr.length > 1) {
    const val = arr[0];

    for (let i = 1; i < arr.length; i += 1) {
      if (arr[i] !== val) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Get the last item of an array.
 *
 * @param {T[]} arr Array to get last item from.
 */
export function last<T>(arr: T[]) {
  return arr[arr.length - 1];
}

/**
 * Returns a reversed array without mutating the source.
 *
 * @param {T[]} arr Array to clone and reverse.
 *
 * @return {T[]}
 */
export function reverse<T>(arr: T[]): T[] {
  return slice(arr).reverse();
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
  const offset = ((-n % arr.length) + arr.length) % arr.length;

  return slice(arr, offset).concat(slice(arr, 0, offset));
}

/**
 * Pick a random item from an array.
 *
 * @param {T[]} arr Source array to sample.
 *
 * @return {T}
 */
export function sample<T>(arr: T[], random: () => number): T {
  return arr[rand(0, arr.length - 1, random)];
}

/**
 * Creates a slice of array from start up to, but not including, end.
 *
 * @param {T[]} arr Source array to slice.
 * @param {number?} start The beginning index of the specified portion of the array. If start is undefined, then the slice begins at index 0.
 * @param {number?} end The end index of the specified portion of the array. This is exclusive of the element at the index 'end'. If end is undefined, then the slice extends to the end of the array.
 *
 * @return {T[]}
 */
export function slice<T>(arr: T[], start?: number, end?: number): T[] {
  return arr.slice(start, end);
}

/**
 * Splice an array.
 *
 * @param {T[]} arr Source array to splice.
 * @param {number} start The zero-based location in the array from which to start removing elements.
 * @param {number} take The number of elements to remove.
 * @param {T[]} items Elements to insert into the array in place of the deleted elements.
 *
 * @return {T[]} An array containing the elements that were deleted.
 */
export function splice<T>(arr: T[], start: number, take: number, ...items: T[]): T[] {
  return arr.splice(start, take, ...items);
}

/**
 * Make an array of a given size.
 *
 * @param {number} length Length of array to create.
 * @param {T?} value Value to fill array with.
 *
 * @return {Array}
 */
export function times<T>(length: number, value?: T): T[] {
  return new Array(length).fill(value);
}

/**
 * Create an array excluding given values.
 *
 * @param {T[]} arr The array to filter.
 * @param {...T[]} values Values to exclude.
 */
export function without<T>(arr: T[], ...values: T[]): T[] {
  return arr.filter((val) => !values.includes(val));
}
