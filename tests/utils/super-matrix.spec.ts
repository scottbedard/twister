import { SuperMatrix } from '@/utils/super-matrix';

describe('SuperMatrix', () => {
  describe('output', () => {
    it('5 sides, 4 layers', () => {
      const matrix = new SuperMatrix(5, 4, 1);

      expect(matrix.output()).toEqual([
        [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
      ]);
    });

    it('5 sides, 5 layers', () => {
      const odd = new SuperMatrix(5, 5, 1);

      expect(odd.output()).toEqual([
        [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
        [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
        1,
      ]);
    });
  });
});
