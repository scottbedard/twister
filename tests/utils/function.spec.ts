import { error } from '@/utils/function';

describe('function utils', () => {
  it('error', () => {
    expect(() => error()).toThrow();
  });
});
