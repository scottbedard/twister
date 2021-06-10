import { SuperMatrix } from '@/utils/super-matrix';

const unique5x4: [number[][]] = [
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ],
];

const unique5x5: [number[][], number[][], number] = [
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ],
  [
    [21, 22],
    [23, 24],
    [25, 26],
    [27, 28],
    [29, 30],
  ],
  31,
];

describe('SuperMatrix', () => {
  describe('apply', () => {
    it('5x4', () => {
      const model = new SuperMatrix(5, 4, 0);

      model.apply(unique5x4);

      expect(model.output()).toEqual(unique5x4);
    });

    it('5x5', () => {
      const model = new SuperMatrix(5, 5, 0);

      model.apply(unique5x5);

      expect(model.output()).toEqual(unique5x5);
    });
  });

  describe('output', () => {
    it('5x4', () => {
      const model = new SuperMatrix(5, 4, 1);

      expect(model.output()).toEqual([
        [
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
        ],
      ]);
    });

    it('5x5', () => {
      const model = new SuperMatrix(5, 5, 1);

      expect(model.output()).toEqual([
        [
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
        ],
        [
          [1, 1],
          [1, 1],
          [1, 1],
          [1, 1],
          [1, 1],
        ],
        1,
      ]);
    });
  });

  describe('rotate', () => {
    it('5x4, 1', () => {
      const model = new SuperMatrix(5, 4, 0);

      model.apply(unique5x4);

      model.rotate(1);

      expect(model.output()).toEqual([
        [
          [17, 18, 19, 20],
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
        ],
      ]);
    });

    it('5x5, 1', () => {
      const model = new SuperMatrix(5, 5, 0);

      model.apply(unique5x5);

      model.rotate(1);

      expect(model.output()).toEqual([
        [
          [17, 18, 19, 20],
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
        ],
        [
          [29, 30],
          [21, 22],
          [23, 24],
          [25, 26],
          [27, 28],
        ],
        31,
      ]);
    });
  });
});
