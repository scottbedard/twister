import { reverse, slice, times } from './array';

/**
 * Chunk a matrix array into columns.
 *
 * [              [
 *   1, 2, 3,       [1, 4, 7],
 *   4, 5, 6,  ->   [2, 5, 8],
 *   7, 8, 9,       [3, 6, 9],
 * ]              ]
 *
 * @param {T[]} matrix Matrix array to chunk.
 *
 * @return {T[][]}
 */
export function cols<T>(matrix: T[]): T[][] {
  return flip(rows(matrix));
}

/**
 * Flatten an array of columns.
 *
 * [                [
 *   [1, 4, 7],       1, 2, 3,
 *   [2, 5, 8],  ->   4, 5, 6,
 *   [3, 6, 9],       7, 8, 9,
 * ]                ]
 *
 * @param {T[][]} arr Array of column values.
 *
 * @return {T[]}
 */
export function flattenCols<T>(arr: T[][]): T[] {
  return flattenRows(flip(arr));
}

/**
 * Flatten an array of rows.
 *
 * [                [
 *   [1, 2, 3],       1, 2, 3,
 *   [4, 5, 6],  ->   4, 5, 6,
 *   [7, 8, 9],       7, 8, 9,
 * ]                ]
 *
 * @param {T[][]} arr Array of row values.
 *
 * @return {T[]}
 */
export function flattenRows<T>(arr: T[][]): T[] {
  return arr.reduce((acc, row) => acc.concat(row), []);
}

/**
 * Convert between row and column arrays. A good way to
 * visualize this operation is holding a card by the top-left
 * and bottom-right corners and flipping it over.
 *
 * [                [
 *   [1, 2, 3],       [1, 4, 7],
 *   [4, 5, 6],  ->   [2, 5, 8],
 *   [7, 8, 9],       [3, 6, 9],
 * ]                ]
 *
 * @param {T[][]} arrs
 *
 * @return {T[][]}
 */
export function flip<T>(arrs: T[][]): T[][] {
  return arrs[0].map((x, i) => arrs.map(arr => arr[i]));
}

/**
 * Rotate a matrix array.
 *
 * @param {T[]} arr
 * @param {-1|1|2} n
 *
 * @return {T[]}
 */
export function rotate<T>(arr: T[], n: -1 | 1 | 2): T[] {
  return n === 2
    ? reverse(arr)
    : n === -1
      ? flattenRows(reverse(cols(arr)))
      : flattenCols(reverse(rows(arr)));
}

/**
 * Chunk a matrix array into rows.
 *
 * [              [
 *   1, 2, 3,       [1, 2, 3],
 *   4, 5, 6,  ->   [4, 5, 6],
 *   7, 8, 9,       [7, 8, 9],
 * ]              ]
 *
 * @param {T[]} arr
 *
 * @return {T[][]}
 */
export function rows<T>(arr: T[]): T[][] {
  const size = Math.sqrt(arr.length);

  return times(size).map((x, i) => {
    const start = i * size;

    return slice(arr, start, start + size);
  });
}
