import {
  flattenBy,
  head,
  reverse,
  roll,
  sample,
  slice,
  splice,
  times,
} from '@/utils/array';

describe('array utils', () => {
  it('flattenBy', () => {
    const arr = [
      { foo: 0, bar: 'a' },
      { foo: 1, bar: 'b' },
      { foo: 2, bar: 'c' },
    ];

    expect(flattenBy(arr, 'foo')).toEqual([0, 1, 2]);
  });

  it('head', () => {
    const arr = [0, 1, 2];
    const item = head(arr);

    expect(arr).toEqual([0, 1, 2]);
    expect(item).toEqual(0);
  });

  it('reverse', () => {
    const arr = [0, 1, 2];
    const reversed = reverse(arr);

    expect(arr).toEqual([0, 1, 2]);
    expect(reversed).toEqual([2, 1, 0]);
  });

  it('roll', () => {
    const arr = [0, 1, 2];
    const right = roll(arr, 1);
    const left = roll(arr, -1);

    expect(arr).toEqual([0, 1, 2]);
    expect(right).toEqual([2, 0, 1]);
    expect(left).toEqual([1, 2, 0]);
  });

  it('sample', () => {
    const random = jest.fn(() => 0.5);
    const arr = [0, 1, 2];
    const item = sample(arr, random);

    expect(arr).toEqual([0, 1, 2]);
    expect(item).toEqual(1);
    expect(random).toHaveBeenCalledTimes(1);
  });

  it('slice', () => {
    const arr = [0, 1, 2];
    const subset = slice(arr, 1, 2);

    expect(arr).toEqual([0, 1, 2]);
    expect(subset).toEqual([1]);
  });

  it('splice', () => {
    const arr = [0, 1, 2];
    const items = splice(arr, 1, 1, -1);

    expect(arr).toEqual([0, -1, 2]);
    expect(items).toEqual([1]);
  });

  it('times', () => {
    const arr = times(3, 'a');

    expect(arr).toEqual(['a', 'a', 'a']);
  });
});
