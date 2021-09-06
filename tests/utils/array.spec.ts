import {
  flattenBy,
  flattenDeep,
  head,
  isUniform,
  last,
  reverse,
  roll,
  sample,
  slice,
  splice,
  times,
  without,
} from '@/utils/array'

describe('array utils', () => {
  it('flattenBy', () => {
    const arr = [
      { foo: 0, bar: 'a' },
      { foo: 1, bar: 'b' },
      { foo: 2, bar: 'c' },
    ]

    expect(flattenBy(arr, 'foo')).toEqual([0, 1, 2])
  })

  it('flattenDeep', () => {
    const arr = [0, 1, 2, [3, [4, [5]]]]

    expect(flattenDeep(arr)).toEqual([0, 1, 2, 3, 4, 5])
  })

  it('head', () => {
    const arr = [0, 1, 2]
    const item = head(arr)

    expect(arr).toEqual([0, 1, 2])
    expect(item).toEqual(0)
  })

  it('isUniform', () => {
    expect(isUniform([])).toBe(true)
    expect(isUniform([1])).toBe(true)
    expect(isUniform([1, 1])).toBe(true)
    expect(isUniform([1, 1, 1])).toBe(true)
    expect(isUniform([1, 1, 1, 1])).toBe(true)
    expect(isUniform([1, 1, 1, 1, 2])).toBe(false)
  })

  it('last', () => {
    expect(last([])).toBeUndefined()
    expect(last([0, 1, 2])).toBe(2)
  })

  it('reverse', () => {
    const arr = [0, 1, 2]
    const reversed = reverse(arr)

    expect(arr).toEqual([0, 1, 2])
    expect(reversed).toEqual([2, 1, 0])
  })

  it('roll', () => {
    const arr = [0, 1, 2]
    const right = roll(arr, 1)
    const left = roll(arr, -1)

    expect(arr).toEqual([0, 1, 2])
    expect(right).toEqual([2, 0, 1])
    expect(left).toEqual([1, 2, 0])
  })

  it('sample', () => {
    const random = jest.fn(() => 0.5)
    const arr = [0, 1, 2]
    const item = sample(arr, random)

    expect(arr).toEqual([0, 1, 2])
    expect(item).toEqual(1)
    expect(random).toHaveBeenCalledTimes(1)
  })

  it('slice', () => {
    const arr = [0, 1, 2]
    const subset = slice(arr, 1, 2)

    expect(arr).toEqual([0, 1, 2])
    expect(subset).toEqual([1])
  })

  it('splice', () => {
    const arr = [0, 1, 2]
    const items = splice(arr, 1, 1, -1)

    expect(arr).toEqual([0, -1, 2])
    expect(items).toEqual([1])
  })

  it('times', () => {
    const arr = times(3, 'a')

    expect(arr).toEqual(['a', 'a', 'a'])
  })

  it('without', () => {
    const arr = ['a', 'b', 'c']

    expect(without(arr)).toEqual(arr)
    expect(without(arr, 'a', 'b')).toEqual(['c'])
  })
})
