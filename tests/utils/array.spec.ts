import { times, rollArray } from '../../src/utils/array';

describe('utils', () => {
  describe('times', () => {
    expect(times(3)).toEqual([undefined, undefined, undefined]);
  });

  describe('roll', () => {
    it('returns a new array', () => {
      const original = [1, 2, 3];
      const rolled = rollArray(original, 0);

      expect(rolled).not.toBe(original);
      expect(rolled).toEqual(original);
      expect(rolled).toEqual([1, 2, 3]);
    });

    it('backwards', () => {
      expect(rollArray([1, 2, 3], -1)).toEqual([3, 1, 2]);
      expect(rollArray([1, 2, 3], -2)).toEqual([2, 3, 1]);
      expect(rollArray([1, 2, 3], -3)).toEqual([1, 2, 3]);
      expect(rollArray([1, 2, 3], -4)).toEqual([3, 1, 2]);
    });

    it('forwards', () => {
      expect(rollArray([1, 2, 3], 1)).toEqual([2, 3, 1]);
      expect(rollArray([1, 2, 3], 2)).toEqual([3, 1, 2]);
      expect(rollArray([1, 2, 3], 3)).toEqual([1, 2, 3]);
      expect(rollArray([1, 2, 3], 4)).toEqual([2, 3, 1]);
    });
  });
});
