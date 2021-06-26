import {
  error,
  identity,
} from '@/utils/function';

describe('function utils', () => {
  it('error', () => {
    expect(() => error()).toThrow();
  });

  it('identity', () => {
    const obj = {};

    expect(identity(obj)).toBe(obj);
  });
});
