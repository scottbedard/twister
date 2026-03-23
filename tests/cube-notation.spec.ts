import { describe, expect, it } from 'vitest'
import { Cube } from '@/index'
import type { CubeTurn } from '@/cube/types'

it('unchanging serialization', () => {
  const cube = new Cube(4)

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
})

it('transforming serialization', () => {
  const cube = new Cube(4)

  const transforms = [
    ['R\'', 'R-'],
    ['5Rw', 'X'],
    ['4Rw-', 'X-'],
    ['4Rw2', 'X2'],
    ['4Uw', 'Y'],
    ['4Uw-', 'Y-'],
    ['4Uw2', 'Y2'],
    ['4Fw', 'Z'],
    ['4Fw-', 'Z-'],
    ['4Fw2', 'Z2'],
    ['4Lw', 'X-'],
    ['4Lw-', 'X'],
    ['4Lw2', 'X2'],
    ['4Dw', 'Y-'],
    ['4Dw-', 'Y'],
    ['4Dw2', 'Y2'],
    ['4Bw', 'Z-'],
    ['4Bw-', 'Z'],
    ['4Bw2', 'Z2'],
  ]

  for (const [source, target] of transforms) {
    expect(
      cube.stringifyTurn(cube.parseTurn(source)),
      `${source} → ${target}`,
    ).toBe(target)
  }
})

describe('invalid', () => {
  it('invalid turn', () => {
    expect(() => new Cube(3).parseTurn('whoops')).toThrow()
  })

  it('reverse double turn', () => {
    expect(() => new Cube(3).parseTurn('R2-')).toThrow()
  })

  it('multiple wide characters', () => {
    expect(() => new Cube(3).parseTurn('Rww')).toThrow()
  })

  it('1 deep with wide suffix', () => {
    expect(() => new Cube(3).parseTurn('1Rw')).toThrow()
  })

  it('invalid depth', () => {
    expect(() => new Cube(3).stringifyTurn({ depth: 0, rotation: 1, target: 'r', wide: false })).toThrow()
    expect(() => new Cube(3).stringifyTurn({ depth: -1, rotation: 1, target: 'r', wide: false })).toThrow()
    expect(() => new Cube(3).stringifyTurn({ depth: 1.5, rotation: 1, target: 'r', wide: false })).toThrow()
    expect(() => new Cube(3).stringifyTurn({ depth: NaN, rotation: 1, target: 'r', wide: false })).toThrow()
    expect(() => new Cube(3).stringifyTurn({ depth: Infinity, rotation: 1, target: 'r', wide: false })).toThrow()
    expect(() => new Cube(3).stringifyTurn({ depth: -Infinity, rotation: 1, target: 'r', wide: false })).toThrow()
  })
})

it('stringifyTurn', () => {
  const cube = new Cube(3)

  const cases: Array<[string, CubeTurn]> = [
    ['R', { depth: 1, rotation: 1, target: 'r', wide: false }],
    ['R-', { depth: 1, rotation: -1, target: 'r', wide: false }],
    ['2R', { depth: 2, rotation: 1, target: 'r', wide: false }],
    ['Rw', { depth: 2, rotation: 1, target: 'r', wide: true }],
    ['X2', { depth: 3, rotation: 2, target: 'r', wide: true }],
    ['X', { depth: 1, rotation: 1, target: 'x', wide: false }],
    ['Y', { depth: 1, rotation: 1, target: 'y', wide: false }],
    ['Z', { depth: 1, rotation: 1, target: 'z', wide: false }],
  ]

  for (const [expected, turn] of cases) {
    expect(
      cube.stringifyTurn(turn),
      `${turn} → ${expected}`,
    ).toBe(expected)
  }
})
