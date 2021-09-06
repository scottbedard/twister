import { keys } from '@/utils/object'

describe('object utils', () => {
  it('keys', () => {
    expect(keys({ a: 1, b: 2, c: 3 })).toEqual(['a', 'b', 'c'])
  })
})
