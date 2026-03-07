import { mod } from '@/utils/math'

import { describe, expect, test } from 'vitest'

describe('mod', () => {
  test('positive n: wraps to 0..m-1', () => {
    expect(mod(5, 3)).toBe(2)
    expect(mod(7, 4)).toBe(3)
    expect(mod(2, 5)).toBe(2)
  })

  test('n = 0 returns 0', () => {
    expect(mod(0, 3)).toBe(0)
    expect(mod(0, 5)).toBe(0)
  })

  test('n multiple of m returns 0', () => {
    expect(mod(6, 3)).toBe(0)
    expect(mod(10, 5)).toBe(0)
    expect(mod(9, 3)).toBe(0)
  })

  test('negative n in [-m, 0): wraps into 0..m-1', () => {
    expect(mod(-1, 3)).toBe(2)
    expect(mod(-2, 3)).toBe(1)
    expect(mod(-3, 3)).toBe(0)
    expect(mod(-1, 4)).toBe(3)
    expect(mod(-2, 5)).toBe(3)
  })

  test('m = 1: non-negative n returns 0', () => {
    expect(mod(0, 1)).toBe(0)
    expect(mod(7, 1)).toBe(0)
  })
})
