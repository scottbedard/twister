import { describe, expect, test } from 'vitest'
import { roll, sample, times } from '@/utils'

test('roll', () => {
  const arr = [0, 1, 2]
  const right = roll(arr, 1)
  const left = roll(arr, -1)

  expect(arr).toEqual([0, 1, 2])
  expect(right).toEqual([2, 0, 1])
  expect(left).toEqual([1, 2, 0])
})

describe('sample', () => {
  test('returns element at index from rand() * length', () => {
    const arr = ['a', 'b', 'c']
    expect(sample(arr, () => 0)).toBe('a')
    expect(sample(arr, () => 0.33)).toBe('a')
    expect(sample(arr, () => 0.334)).toBe('b')
    expect(sample(arr, () => 0.666)).toBe('b')
    expect(sample(arr, () => 0.999)).toBe('c')
  })

  test('single-element array always returns that element', () => {
    const arr = [42]
    expect(sample(arr, () => 0)).toBe(42)
    expect(sample(arr, () => 0.5)).toBe(42)
    expect(sample(arr, () => 0.999)).toBe(42)
  })

  test('result is always an element of the array', () => {
    const arr = [1, 2, 3]
    for (let i = 0; i < 100; i++) {
      const r = sample(arr, () => i / 100)
      expect(arr).toContain(r)
    }
  })
})

test('times', () => {
  const arr = times(3, 'a')

  expect(arr).toEqual(['a', 'a', 'a'])
})
