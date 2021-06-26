import {
  floor,
  isInteger,
  isOdd,
  max,
  rand,
} from '@/utils/number';

describe('number utils', () => {
  it('floor', () => {
    expect(floor(1.5)).toBe(1);
  });

  it('isInteger', () => {
    expect(isInteger(0.5)).toBe(false);
    expect(isInteger(1)).toBe(true);
  });

  it('isOdd', () => {
    expect(isOdd(1)).toBe(true);
    expect(isOdd(2)).toBe(false);
  });

  it('max', () => {
    expect(max(0, 1, 2)).toBe(2);
  });

  it('rand', () => {
    const random = jest.fn(() => 0.5);

    expect(rand(0, 9, random)).toBe(5);
  });
});
