import { mod } from './math'

/**
 * Chunk a matrix array into columns.
 *
 * [              [
 *   1, 2, 3,       [1, 4, 7],
 *   4, 5, 6,  ->   [2, 5, 8],
 *   7, 8, 9,       [3, 6, 9],
 * ]              ]
 */
export function cols<T>(matrix: T[]): T[][] {
  return flip(rows(matrix))
}

/**
 * Find the coordinates of an index inside a square matrix.
 */
export function coords(index: number, size: number) {
  return {
    col: index % size,
    mid: Math.floor(size / 2),
    odd: size % 2 === 1,
    row: Math.floor(index / size),
  }
}

/**
 * Create a matrix with arbitrary data.
 */
export function createMatrix<T extends Record<string, unknown>>(size: number, data: T): (T & { index: number })[] {
  return Array.from({ length: size * size }, (_, index) => ({ ...data, index }))
}

/**
 * Extract a layer of values.
 *
 * @param {T[]} target Matrix to extract values from.
 * @param {number} angle Angle to extract values from.
 * @param {number} depth Depth to extract values from.
 */
export function extract<T>(target: T[], angle: number, depth: number) {
  return rows(rotate(target, -angle))[depth]
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
  return flattenRows(flip(arr))
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
  return arr.slice().reduce((acc, row) => acc.concat(row), [])
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
  return arrs[0].map((_, i) => arrs.map(arr => arr[i]))
}

/**
 * Inject values into a matrix.
 *
 * @param {T[]} arr Values to inject.
 * @param {T[]} target Matrix to inject values into.
 * @param {number} angle Angle to inject values from.
 * @param {number} depth Depth to inject values at.
 *
 * @return {T[]}
 */
export function inject<T>(arr: T[], target: T[], angle: number, depth: number) {
  const rotated = rotate(target, -angle)
  const targetRows = rows(rotated)
  const newRows = targetRows.map((row, i) => (i === depth ? [...arr] : row))
  return rotate(flattenRows(newRows), angle)
}

/**
 * Rotate a matrix array.
 *
 * @param {T[]} matrix Source matrix to rotate.
 * @param {number} angle Integer number of rotations. Positive numbers rotate clockwise, negative rotates counter-clockwise.
 *
 * @return {T[]}
 */
export function rotate<T>(matrix: T[], angle: number): T[] {
  const rotation = mod(angle, 4)

  if (rotation === 1) {
    return flattenCols([...rows(matrix)].reverse())
  }

  if (rotation === 2) {
    return [...matrix].reverse()
  }

  if (rotation === 3) {
    return flattenRows([...cols(matrix)].reverse())
  }

  return [...matrix]
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
  const size = Math.sqrt(arr.length)

  return Array.from({ length: size }, (_, i) => {
    const start = i * size
    return arr.slice(start, start + size)
  })
}
