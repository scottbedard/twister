import {
  cols,
  flattenCols,
  flattenRows,
  flip,
  inject,
  rotate,
  rows,
} from '@/utils/matrix';

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
    ]);
  });

  it('flattenCols', () => {
    expect(flattenCols([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ])).toEqual([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ]);
  });

  it('flattenRows', () => {
    expect(flattenRows([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])).toEqual([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ]);
  });

  it('flip', () => {
    expect(flip([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);
  });

  it('inject', () => {
    const arr = [-1, -2, -3];

    const matrix = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ];

    // angle
    expect(inject(arr, matrix, 1, 0)).toEqual([
      -3, 2, 3,
      -2, 5, 6,
      -1, 8, 9,
    ]);

    expect(inject(arr, matrix, 2, 0)).toEqual([
      1, 2, 3,
      4, 5, 6,
      -3, -2, -1,
    ]);

    expect(inject(arr, matrix, 3, 0)).toEqual([
      1, 2, -1,
      4, 5, -2,
      7, 8, -3,
    ]);

    // depth
    expect(inject(arr, matrix, 0, 0)).toEqual([
      -1, -2, -3,
      4, 5, 6,
      7, 8, 9,
    ]);

    expect(inject(arr, matrix, 0, 1)).toEqual([
      1, 2, 3,
      -1, -2, -3,
      7, 8, 9,
    ]);

    expect(inject(arr, matrix, 0, 2)).toEqual([
      1, 2, 3,
      4, 5, 6,
      -1, -2, -3,
    ]);

    // angle & depth
    expect(inject(arr, matrix, 1, 1)).toEqual([
      1, -3, 3,
      4, -2, 6,
      7, -1, 9,
    ]);
  });

  it('rotate', () => {
    const matrix = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ];

    expect(rotate(matrix, -1)).toEqual([
      3, 6, 9,
      2, 5, 8,
      1, 4, 7,
    ]);

    expect(rotate(matrix, 0)).toEqual([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ]);

    expect(rotate(matrix, 1)).toEqual([
      7, 4, 1,
      8, 5, 2,
      9, 6, 3,
    ]);

    expect(rotate(matrix, 2)).toEqual([
      9, 8, 7,
      6, 5, 4,
      3, 2, 1,
    ]);
  });

  it('rows', () => {
    expect(rows([
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
    ])).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });
});
