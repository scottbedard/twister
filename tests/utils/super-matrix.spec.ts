import { SuperMatrix } from '@/utils/super-matrix';

describe('SuperMatrix', () => {
  describe('apply', () => {
    it('5x4', () => {
      const model = new SuperMatrix(5, 4, 0);

      model.apply([
        [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
          [17, 18, 19, 20],
        ],
      ]);

      expect(model.output()).toEqual([
        [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
          [17, 18, 19, 20],
        ],
      ]);
    });

    it('5x5', () => {
      const model = new SuperMatrix(5, 5, 0);

      model.apply([
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
      ]);

      expect(model.output()).toEqual([
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
      ]);
    });
  });

  describe('output', () => {
    it('5x4', () => {
      const model = new SuperMatrix(5, 4, 1);

      expect(model.output()).toEqual([
        [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
      ]);
    });

    it('5x5', () => {
      const model = new SuperMatrix(5, 5, 1);

      expect(model.output()).toEqual([
        [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
        [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
        1,
      ]);
    });
  });
});
