import { lowercase, trim } from '@/utils/string'

describe('string utils', () => {
  it('lowercase', () => {
    expect(lowercase('HELLO')).toEqual('hello')
  })

  it('trim', () => {
    expect(trim(' hello ')).toEqual('hello')
  })
})
