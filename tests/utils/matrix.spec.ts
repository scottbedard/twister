import {
  cols,
  extract,
  flattenCols,
  flattenRows,
  flip,
  inject,
  rotate,
  rows,
} from '@/utils/matrix'

describe('matrix utils', () => {
  it('cols', () => {
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
    it('angle 0, depth 0', () => {
      expect(extract(matrix, 0, 0)).toEqual([1, 2, 3])
    })

    it('angle 1, depth 0', () => {
      expect(extract(matrix, 1, 0)).toEqual([3, 6, 9])
    })

    it('angle 2, depth 0', () => {
      expect(extract(matrix, 2, 0)).toEqual([9, 8, 7])
    })

    it('angle 3, depth 0', () => {
      expect(extract(matrix, 3, 0)).toEqual([7, 4, 1])
    })

    // depth
    it('angle 0, depth 1', () => {
      expect(extract(matrix, 0, 1)).toEqual([4, 5, 6])
    })

    it('angle 0, depth 2', () => {
      expect(extract(matrix, 0, 2)).toEqual([7, 8, 9])
    })

    // angle & depth
    it('angle 1, depth 1', () => {
      expect(extract(matrix, 1, 1)).toEqual([2, 5, 8])
    })

    it('angle 2, depth 2', () => {
      expect(extract(matrix, 2, 2)).toEqual([3, 2, 1])
    })

    it('angle 3, depth 2', () => {
      expect(extract(matrix, 3, 2)).toEqual([9, 6, 3])
    })
  })

  it('flattenCols', () => {
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

  it('flattenRows', () => {
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

  it('flip', () => {
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
    it('angle 0, depth 0', () => {
      expect(inject(arr, matrix, 0, 0)).toEqual([
        A, B, C,
        4, 5, 6,
        7, 8, 9,
      ])
    })

    it('angle 1, depth 0', () => {
      expect(inject(arr, matrix, 1, 0)).toEqual([
        1, 2, A,
        4, 5, B,
        7, 8, C,
      ])
    })

    it('angle 2, depth 0', () => {
      expect(inject(arr, matrix, 2, 0)).toEqual([
        1, 2, 3,
        4, 5, 6,
        C, B, A,
      ])
    })

    it('angle 3, depth 0', () => {
      expect(inject(arr, matrix, 3, 0)).toEqual([
        C, 2, 3,
        B, 5, 6,
        A, 8, 9,
      ])
    })

    // depth
    it('angle 0, depth 1', () => {
      expect(inject(arr, matrix, 0, 1)).toEqual([
        1, 2, 3,
        A, B, C,
        7, 8, 9,
      ])
    })

    it('angle 0, depth 2', () => {
      expect(inject(arr, matrix, 0, 2)).toEqual([
        1, 2, 3,
        4, 5, 6,
        A, B, C,
      ])
    })

    // angle & depth
    it('angle 1, depth 1', () => {
      expect(inject(arr, matrix, 1, 1)).toEqual([
        1, A, 3,
        4, B, 6,
        7, C, 9,
      ])
    })

    it('angle 2, depth 2', () => {
      expect(inject(arr, matrix, 2, 2)).toEqual([
        C, B, A,
        4, 5, 6,
        7, 8, 9,
      ])
    })

    it('angle 3, depth 2', () => {
      expect(inject(arr, matrix, 3, 2)).toEqual([
        1, 2, C,
        4, 5, B,
        7, 8, A,
      ])
    })
  })

  it('rotate', () => {
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

  it('rows', () => {
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
