import {
  cols,
  coords,
  extract,
  flattenCols,
  flattenRows,
  flip,
  injectMatrix,
  quadrant,
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

  describe('coords', () => {
    test('3x3: row/col for each index', () => {
      const size = 3
      expect(coords(0, size)).toEqual({ col: 0, mid: 1, odd: true, row: 0 })
      expect(coords(1, size)).toEqual({ col: 1, mid: 1, odd: true, row: 0 })
      expect(coords(2, size)).toEqual({ col: 2, mid: 1, odd: true, row: 0 })
      expect(coords(3, size)).toEqual({ col: 0, mid: 1, odd: true, row: 1 })
      expect(coords(4, size)).toEqual({ col: 1, mid: 1, odd: true, row: 1 })
      expect(coords(5, size)).toEqual({ col: 2, mid: 1, odd: true, row: 1 })
      expect(coords(6, size)).toEqual({ col: 0, mid: 1, odd: true, row: 2 })
      expect(coords(7, size)).toEqual({ col: 1, mid: 1, odd: true, row: 2 })
      expect(coords(8, size)).toEqual({ col: 2, mid: 1, odd: true, row: 2 })
    })

    test('2x2: mid and odd', () => {
      expect(coords(0, 2)).toEqual({ col: 0, mid: 1, odd: false, row: 0 })
      expect(coords(3, 2)).toEqual({ col: 1, mid: 1, odd: false, row: 1 })
    })

    test('4x4: even size mid', () => {
      expect(coords(0, 4)).toEqual({ col: 0, mid: 2, odd: false, row: 0 })
      expect(coords(5, 4)).toEqual({ col: 1, mid: 2, odd: false, row: 1 })
      expect(coords(15, 4)).toEqual({ col: 3, mid: 2, odd: false, row: 3 })
    })

    test('5x5: odd size mid', () => {
      expect(coords(12, 5)).toEqual({ col: 2, mid: 2, odd: true, row: 2 })
    })
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

  describe('quadrant', () => {
    test('2x2', () => {
      const size = 2
      const expected = [
        0, 1,
        3, 2,
      ]

      for (let i = 0; i < size * size; i++) {
        expect(quadrant(i, size)).toBe(expected[i])
      }
    })

    test('3x3', () => {
      const size = 3
      const expected = [
        0, 0, 1,
        3, 4, 1,
        3, 2, 2,
      ]

      for (let i = 0; i < size * size; i++) {
        expect(quadrant(i, size)).toBe(expected[i])
      }
    })

    test('4x4', () => {
      const size = 4
      const expected = [
        0, 0, 1, 1,
        0, 0, 1, 1,
        3, 3, 2, 2,
        3, 3, 2, 2,
      ]

      for (let i = 0; i < size * size; i++) {
        expect(quadrant(i, size)).toBe(expected[i])
      }
    })

    test('5x5', () => {
      const size = 5
      const expected = [
        0, 0, 0, 1, 1,
        0, 0, 0, 1, 1,
        3, 3, 4, 1, 1,
        3, 3, 2, 2, 2,
        3, 3, 2, 2, 2,
      ]

      for (let i = 0; i < size * size; i++) {
        expect(quadrant(i, size)).toBe(expected[i])
      }
    })
  })
})
