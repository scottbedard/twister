import { describe, expect, it, vi } from 'vitest'
import { Dodecaminx } from '@/index'
import { iterateBlockMatrix } from '@/utils'

describe('constructor', () => {
  it('defaults to 3', () => {
    const dodecaminx = new Dodecaminx()
    expect(dodecaminx).toBeInstanceOf(Dodecaminx)
    expect(dodecaminx.size).toBe(3)
  })

  it('new Dodecaminx(n)', () => {
    const dodecaminx = new Dodecaminx(2)
    expect(dodecaminx).toBeInstanceOf(Dodecaminx)
    expect(dodecaminx.size).toBe(2)
  })

  it('new Dodecaminx(n) with invalid size', () => {
    expect(() => new Dodecaminx(0)).toThrow()
  })
})

describe('generateScramble', () => {
  it('generates a scramble', () => {
    const dodecaminx = new Dodecaminx(2)
    const scramble = dodecaminx.generateScramble(5)
    expect(typeof scramble).toBe('string')
    expect(scramble.split(' ').filter(Boolean)).toHaveLength(5)

    for (const turn of scramble.split(' ')) {
      expect(() => dodecaminx.parseTurn(turn)).not.toThrow()
    }
  })

  it('doesnt turn same face twice in a row', () => {
    for (let i = 0; i < 10; i++) {
      const [one, two] = new Dodecaminx({ size: 2, rand: vi.fn(() => 0.5) })
        .generateScramble(2)
        .split(' ')

      expect(one).not.toBe(two)
    }
  })
})

it('stringifyTurn / parseTurn', () => {
  const dodecaminx = new Dodecaminx({ size: 4 })

  const turns = [
    'R',
    'R-',
    'R2-',
    '2R',
    'Rw',
    'Rw-',
    'Rw2-',
    'R2',
    '2R2',
    '3Rw2',
    '3Rw2-',
    'R2-',
    'r2-',
    'r2',
    'r',
  ]

  turns.forEach((turn) => {
    expect(dodecaminx.stringifyTurn(dodecaminx.parseTurn(turn))).toBe(turn)
  })
})

describe('parseTurn', () => {
  const dodecaminx = new Dodecaminx({ size: 3 })

  it('bad turn', () => {
    expect(() => dodecaminx.parseTurn('bad turn')).toThrow()
  })
})

it('scramble / reset', () => {
  const dodecaminx = new Dodecaminx(2).scramble()
  expect(dodecaminx.solved()).toBe(false)
  dodecaminx.reset()
  expect(dodecaminx.solved()).toBe(true)
})

it('default initial data is null', () => {
  const dodecaminx = new Dodecaminx(2)

  let safety

  iterateBlockMatrix(dodecaminx.state.u, (sticker) => {
    expect(sticker.data).toBe(null)

    safety = true
  })

  expect(safety).toBe(true)
})

it('initial data can be set', () => {
  const symbol = Symbol()

  const dodecaminx = new Dodecaminx({
    data: () => symbol,
  })

  let safety = false

  iterateBlockMatrix(dodecaminx.state.u, ({ data }) => {
    expect(data).toBe(symbol)
    safety = true
  })

  expect(safety).toBe(true)
})
