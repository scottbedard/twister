import { trim } from '@/utils/string';

describe('string utils', () => {
  it('trim', () => {
    const str = ' hello ';

    expect(trim(str)).toEqual('hello');
  });
});
