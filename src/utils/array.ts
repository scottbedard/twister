import { rand } from './number';

/**
 * Chunk a face array into columns.
 *
 * [                [
 *     1, 2, 3,         [1, 4, 7],
 *     4, 5, 6,  ->     [2, 5, 8],
 *     7, 8, 9,         [3, 6, 9],
 * ]                ]
 */
export function chunkCols<T>(arr: T[]): T[][] {
  return flip(chunkRows(arr));
}

/**
 * Chunk a face array into rows.
 *
 * [                [
 *     1, 2, 3,         [1, 2, 3],
 *     4, 5, 6,  ->     [4, 5, 6], 
 *     7, 8, 9,         [7, 8, 9],
 * ]                ]
 */
export function chunkRows<T>(arr: T[]): T[][] {
  const size = Math.sqrt(arr.length);

  return times(size).map((val, i) => {
    const start = i * size;
    return slice(arr, start, start + size);
  });
}

/**
 * Slice then shift an array.
 */
export function first<T>(arr: T[], begin?: number): T {
  return slice(arr, begin).shift();
}

/**
 * Convert row and column chunks. A good way to visualize
 * this operation is to imagine holding a card by the
 * top-left / bottom-right corners, and flipping it over.
 *
 * [                    [
 *     [1, 2, 3],           [1, 4, 7],
 *     [4, 5, 6],  ->       [2, 5, 8],    
 *     [7, 8, 9],           [3, 6, 9],
 * ]                    ]
 */
export function flip<T>(arr: T[][]): T[][] {
  return arr[0].map((x, i) => arr.map(chunk => chunk[i]));
}

/**
 * Make an array of a given size.
 *
 * @param {number} length
 * @param {T} value
 *
 * @return {Array}
 */
export function times<T>(length: number, value: T = undefined): T[] {
  return new Array(length).fill(value);
}

/**
 * Pick a random item from an array.
 *
 * @param {T[]} arr
 *
 * @return {T}
 */
export function sample<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)];
}

/**
 * Returns a reversed array without mutating the source.
 *
 * @param {T[]} arr,
 *
 * @return {T[]}
 */
export function reverse<T>(arr: T[]): T[] {
  return slice(arr).reverse();
}

/**
 * Rotate an array forwards or backwards.
 *
 * @param {T[]}   arr 
 * @param {number}  elements
 *
 * @return {T[]} 
 */
export function roll<T>(arr: T[], elements: number): T[] {
  const offset = (((elements % arr.length) + arr.length) % arr.length);

  return arr.slice(offset).concat(arr.slice(0, offset));
}

/**
 * Slice an array.
 *
 * @param {T[]} arr
 * @param {number?} begin
 * @param {number?} end
 *
 * @return {T[]}
 */
export function slice<T>(arr: T[], begin?: number, end?: number): T[] {
  return arr.slice(begin, end);
}

/**
 * Splice an array.
 * 
 * @param {T[]} arr
 * @param {number} start
 * @param {number} deleteCount
 * @param {T[]} items
 *
 * @return {T[]}
 */
export function splice<T>(arr: T[], start: number, deleteCount: number, ...items: T[]): T[] {
  return arr.splice(start, deleteCount, ...items);
}
