import { lc, trim } from '@/utils/string';

describe('string utils', () => {
  it('lc', () => {
    expect(lc('HELLO')).toEqual('hello');
  });

  it('trim', () => {
    expect(trim(' hello ')).toEqual('hello');
  });
});
