import {
  cols,
  flattenCols,
  flattenRows,
  flip,
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
