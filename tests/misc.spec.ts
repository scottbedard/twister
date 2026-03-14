import { sample, int } from '@/utils/misc'

import { describe, expect, test } from 'vitest'

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

describe('int', () => {
  test('returns min when rand() is 0', () => {
    expect(int(1, 10, () => 0)).toBe(1)
    expect(int(-5, 5, () => 0)).toBe(-5)
  })

  test('returns max when rand() is just below 1', () => {
    expect(int(1, 10, () => 0.999)).toBe(10)
    expect(int(-5, 5, () => 0.999)).toBe(5)
  })

  test('returns value in range for deterministic rand', () => {
    // rand 0 -> 0/10 -> 0 + 1 = 1
    expect(int(1, 10, () => 0)).toBe(1)
    // rand 0.5 -> 5/10 -> 5 + 1 = 6
    expect(int(1, 10, () => 0.5)).toBe(6)
    // rand 0.99 -> 9.9/10 -> 9 + 1 = 10
    expect(int(1, 10, () => 0.99)).toBe(10)
  })

  test('single value range always returns that value', () => {
    expect(int(42, 42, () => 0)).toBe(42)
    expect(int(42, 42, () => 0.5)).toBe(42)
    expect(int(42, 42, () => 0.999)).toBe(42)
  })

  test('result is always in [min, max] inclusive', () => {
    const min = -3
    const max = 7
    for (let i = 0; i < 100; i++) {
      const r = int(min, max, () => i / 100)
      expect(r).toBeGreaterThanOrEqual(min)
      expect(r).toBeLessThanOrEqual(max)
      expect(Number.isInteger(r)).toBe(true)
    }
  })
})
