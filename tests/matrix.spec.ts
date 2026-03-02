import {
  cols,
  extract,
  flattenCols,
  flattenRows,
  flip,
  injectMatrix,
  rotate,
  rows,
} from '@/utils/matrix'

import { describe, expect, test } from 'vitest'

describe('matrix utils', () => {
  test('cols', () => {
    expect(cols([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ])).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ])
  })

  describe('extract', () => {
    const matrix = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ]

    // angle
    test('angle 0, depth 0', () => {
      expect(extract(matrix, 0, 0)).toEqual([1, 2, 3])
    })

    test('angle 1, depth 0', () => {
      expect(extract(matrix, 1, 0)).toEqual([3, 6, 9])
    })

    test('angle 2, depth 0', () => {
      expect(extract(matrix, 2, 0)).toEqual([9, 8, 7])
    })

    test('angle 3, depth 0', () => {
      expect(extract(matrix, 3, 0)).toEqual([7, 4, 1])
    })

    // depth
    test('angle 0, depth 1', () => {
      expect(extract(matrix, 0, 1)).toEqual([4, 5, 6])
    })

    test('angle 0, depth 2', () => {
      expect(extract(matrix, 0, 2)).toEqual([7, 8, 9])
    })

    // angle & depth
    test('angle 1, depth 1', () => {
      expect(extract(matrix, 1, 1)).toEqual([2, 5, 8])
    })

    test('angle 2, depth 2', () => {
      expect(extract(matrix, 2, 2)).toEqual([3, 2, 1])
    })

    test('angle 3, depth 2', () => {
      expect(extract(matrix, 3, 2)).toEqual([9, 6, 3])
    })
  })

  test('flattenCols', () => {
    expect(flattenCols([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ])).toEqual([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ])
  })

  test('flattenRows', () => {
    expect(flattenRows([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])).toEqual([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ])
  })

  test('flip', () => {
    expect(flip([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ])
  })

  describe('inject', () => {
    const arr = [-1, -2, -3]

    const [A, B, C] = arr

    const matrix = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ]

    // angle
    test('angle 0, depth 0', () => {
      expect(injectMatrix(arr, matrix, 0, 0)).toEqual([
        A, B, C,
        4, 5, 6,
        7, 8, 9,
      ])
    })

    test('angle 1, depth 0', () => {
      expect(injectMatrix(arr, matrix, 1, 0)).toEqual([
        1, 2, A,
        4, 5, B,
        7, 8, C,
      ])
    })

    test('angle 2, depth 0', () => {
      expect(injectMatrix(arr, matrix, 2, 0)).toEqual([
        1, 2, 3,
        4, 5, 6,
        C, B, A,
      ])
    })

    test('angle 3, depth 0', () => {
      expect(injectMatrix(arr, matrix, 3, 0)).toEqual([
        C, 2, 3,
        B, 5, 6,
        A, 8, 9,
      ])
    })

    // depth
    test('angle 0, depth 1', () => {
      expect(injectMatrix(arr, matrix, 0, 1)).toEqual([
        1, 2, 3,
        A, B, C,
        7, 8, 9,
      ])
    })

    test('angle 0, depth 2', () => {
      expect(injectMatrix(arr, matrix, 0, 2)).toEqual([
        1, 2, 3,
        4, 5, 6,
        A, B, C,
      ])
    })

    // angle & depth
    test('angle 1, depth 1', () => {
      expect(injectMatrix(arr, matrix, 1, 1)).toEqual([
        1, A, 3,
        4, B, 6,
        7, C, 9,
      ])
    })

    test('angle 2, depth 2', () => {
      expect(injectMatrix(arr, matrix, 2, 2)).toEqual([
        C, B, A,
        4, 5, 6,
        7, 8, 9,
      ])
    })

    test('angle 3, depth 2', () => {
      expect(injectMatrix(arr, matrix, 3, 2)).toEqual([
        1, 2, C,
        4, 5, B,
        7, 8, A,
      ])
    })
  })

  test('rotate', () => {
    const matrix = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ]

    expect(rotate(matrix, -1)).toEqual([
      3, 6, 9,
      2, 5, 8,
      1, 4, 7,
    ])

    expect(rotate(matrix, 0)).toEqual([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ])

    expect(rotate(matrix, 1)).toEqual([
      7, 4, 1,
      8, 5, 2,
      9, 6, 3,
    ])

    expect(rotate(matrix, 2)).toEqual([
      9, 8, 7,
      6, 5, 4,
      3, 2, 1,
    ])
  })

  test('rows', () => {
    expect(rows([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ])).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  })
})
