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
    expect(new Cube(3).parseTurn('R')).toMatchObject({
      depth: 1,
      rotation: 1,
      target: 'r',
      wide: false,
    })

    expect(new Cube(3).parseTurn('R\'')).toMatchObject({
      depth: 1,
      rotation: -1,
      target: 'r',
      wide: false,
    })

    expect(new Cube(3).parseTurn('R-')).toMatchObject({
      depth: 1,
      rotation: -1,
      target: 'r',
      wide: false,
    })

    expect(new Cube(3).parseTurn('2R')).toMatchObject({
      depth: 2,
      rotation: 1,
      target: 'r',
      wide: false,
    })

    expect(new Cube(3).parseTurn('Rw')).toMatchObject({
      depth: 2,
      rotation: 1,
      target: 'r',
      wide: true,
    })

    expect(new Cube(3).parseTurn('3Rw2')).toMatchObject({
      depth: 3,
      rotation: 2,
      target: 'r',
      wide: true,
    })

    expect(new Cube(3).parseTurn('X')).toMatchObject({
      depth: 1,
      rotation: 1,
      target: 'x',
      wide: false,
    })

    expect(new Cube(3).parseTurn('Y')).toMatchObject({
      depth: 1,
      rotation: 1,
      target: 'y',
      wide: false,
    })

    expect(new Cube(3).parseTurn('Z')).toMatchObject({
      depth: 1,
      rotation: 1,
      target: 'z',
      wide: false,
    })
  })

  describe('generateScramble', () => {
    test('returns a string of space-separated turns', () => {
      const cube = new Cube(3)
      const scramble = cube.generateScramble(5)
      expect(typeof scramble).toBe('string')
      const tokens = scramble.split(' ').filter(Boolean)
      expect(tokens).toHaveLength(5)
    })

    test('respects explicit depth', () => {
      const cube = new Cube(3)
      expect(cube.generateScramble(1).split(' ').filter(Boolean)).toHaveLength(1)
      expect(cube.generateScramble(10).split(' ').filter(Boolean)).toHaveLength(10)
    })

    test('is deterministic with fixed rand', () => {
      const rand = () => 0.5
      const c1 = new Cube({ size: 3, rand })
      const c2 = new Cube({ size: 3, rand })
      expect(c1.generateScramble(5)).toBe(c2.generateScramble(5))
    })

    test('every token parses as a valid turn', () => {
      const cube = new Cube(3)
      const scramble = cube.generateScramble(8)
      for (const token of scramble.split(' ').filter(Boolean)) {
        expect(() => cube.parseTurn(token)).not.toThrow()
      }
    })
  })

  describe('solved', () => {
    test('fresh cube is solved (default and super)', () => {
      const cube = new Cube(3)
      expect(cube.solved()).toBe(true)
      expect(cube.solved({ super: true })).toBe(true)
    })

    test('after a turn, cube is not solved', () => {
      const cube = new Cube(3)
      cube.turn('R')
      expect(cube.solved()).toBe(false)
      expect(cube.solved({ super: true })).toBe(false)
    })

    test('super: true requires indexes in order and rotations 0', () => {
      const cube = new Cube(2)
      // Swap two stickers on one face so indices are wrong order
      const u = cube.state.u
      ;[u[0], u[1]] = [u[1], u[0]]
      expect(cube.solved()).toBe(true) // same face, correct set of indices
      expect(cube.solved({ super: true })).toBe(false)
    })

    test('super: true fails when rotation is non-zero', () => {
      const cube = new Cube(2)
      cube.state.u[0].rotation = 1
      expect(cube.solved()).toBe(true)
      expect(cube.solved({ super: true })).toBe(false)
    })
  })
})
