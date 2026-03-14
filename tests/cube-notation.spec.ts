import { describe, expect, test } from 'vitest'
import { Cube } from '@/index'

test('serialization', () => {
  const cube = new Cube(4)

  // simple notation is deserialized and serialized identically
  const simple = [
    'R',
    'R-',
    '2R',
    'Rw',
    '3Rw2',
    'X',
    'Y',
    'Z',
    'X-',
    'Y-',
    'Z-',
    'X2',
    'Y2',
    'Z2',
  ]

  for (const notation of simple) {
    expect(cube.stringifyTurn(cube.parseTurn(notation))).toBe(notation)
  }

  // transforms change during serialization
  const transforms = [
    ['R\'', 'R-'],
    ['5Rw', '4Rw'],
  ]

  for (const [source, target] of transforms) {
    expect(cube.stringifyTurn(cube.parseTurn(source))).toBe(target)
  }
})

describe('invalid', () => {
  test('invalid turn', () => {
    expect(() => new Cube(3).parseTurn('whoops')).toThrow()
  })

  test('reverse double turn', () => {
    expect(() => new Cube(3).parseTurn('R2-')).toThrow()
  })

  test('multiple wide characters', () => {
    expect(() => new Cube(3).parseTurn('Rww')).toThrow()
  })
})

describe('stringifyTurn', () => {
  const cube = new Cube(3)

  test('R', () => {
    expect(
      cube.stringifyTurn({
        depth: 1,
        rotation: 1,
        target: 'r',
        wide: false,
      }),
    ).toBe('R')
  })

  test('R-', () => {
    expect(
      cube.stringifyTurn({
        depth: 1,
        rotation: -1,
        target: 'r',
        wide: false,
      }),
    ).toBe('R-')
  })

  test('2R', () => {
    expect(
      cube.stringifyTurn({
        depth: 2,
        rotation: 1,
        target: 'r',
        wide: false,
      }),
    ).toBe('2R')
  })

  test('Rw', () => {
    expect(
      cube.stringifyTurn({
        depth: 2,
        rotation: 1,
        target: 'r',
        wide: true,
      }),
    ).toBe('Rw')
  })

  test('3Rw2', () => {
    expect(
      cube.stringifyTurn({
        depth: 3,
        rotation: 2,
        target: 'r',
        wide: true,
      }),
    ).toBe('3Rw2')
  })

  test('X', () => {
    expect(
      cube.stringifyTurn({
        depth: 1,
        rotation: 1,
        target: 'x',
        wide: false,
      }),
    ).toBe('X')
  })

  test('Y', () => {
    expect(
      cube.stringifyTurn({
        depth: 1,
        rotation: 1,
        target: 'y',
        wide: false,
      }),
    ).toBe('Y')
  })

  test('Z', () => {
    expect(
      cube.stringifyTurn({
        depth: 1,
        rotation: 1,
        target: 'z',
        wide: false,
      }),
    ).toBe('Z')
  })
})
