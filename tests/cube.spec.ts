import { describe, expect, test } from 'vitest'
import { Cube } from '@/index'

describe('Cube', () => {
  test('new Cube(n)', () => {
    const cube = new Cube(2)
    expect(cube).toBeInstanceOf(Cube)
    expect(cube.size).toBe(2)
  })

  test('new Cube(opts)', () => {
    const cube = new Cube({ size: 2, rand: () => 0.5 })
    expect(cube).toBeInstanceOf(Cube)
    expect(cube.size).toBe(2)
    expect(cube.rand()).toBe(0.5)

    for (const face of ['u', 'd', 'l', 'r', 'f', 'b'] as const) {
      expect(cube.state[face]).toHaveLength(4)

      for (const sticker of cube.state[face]) {
        expect(sticker).toMatchObject({
          face,
          index: expect.any(Number),
        })
      }
    }
  })

  test('throws for invalid sizes', () => {
    expect(() => new Cube(0)).toThrow()
    expect(() => new Cube(-1)).toThrow()
    expect(() => new Cube(1.5)).toThrow()
    expect(() => new Cube(NaN)).toThrow()
  })

  test('parses', () => {
    expect(new Cube(3).parse('R')).toMatchObject({
      depth: 1,
      rotation: 1,
      target: 'r',
      wide: false,
    })

    expect(new Cube(3).parse('R\'')).toMatchObject({
      depth: 1,
      rotation: -1,
      target: 'r',
      wide: false,
    })

    expect(new Cube(3).parse('R-')).toMatchObject({
      depth: 1,
      rotation: -1,
      target: 'r',
      wide: false,
    })

    expect(new Cube(3).parse('2R')).toMatchObject({
      depth: 2,
      rotation: 1,
      target: 'r',
      wide: false,
    })

    expect(new Cube(3).parse('Rw')).toMatchObject({
      depth: 2,
      rotation: 1,
      target: 'r',
      wide: true,
    })

    expect(new Cube(3).parse('3Rw2')).toMatchObject({
      depth: 3,
      rotation: 2,
      target: 'r',
      wide: true,
    })

    expect(new Cube(3).parse('X')).toMatchObject({
      depth: 1,
      rotation: 1,
      target: 'x',
      wide: false,
    })

    expect(new Cube(3).parse('Y')).toMatchObject({
      depth: 1,
      rotation: 1,
      target: 'y',
      wide: false,
    })

    expect(new Cube(3).parse('Z')).toMatchObject({
      depth: 1,
      rotation: 1,
      target: 'z',
      wide: false,
    })
  })
})
