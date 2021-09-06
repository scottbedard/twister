import { Puzzle } from '@/index'

describe('Puzzle', () => {
  it('apply', () => {
    const puzzle = new Puzzle()

    expect(() => puzzle.apply({})).not.toThrow()
  })

  it('execute', () => {
    const puzzle = new Puzzle()

    expect(() => puzzle.execute({})).not.toThrow()
  })

  it('generateScramble', () => {
    const puzzle = new Puzzle()

    expect(puzzle.generateScramble()).toEqual('')
  })

  it('output', () => {
    const puzzle = new Puzzle()

    expect(puzzle.output()).toEqual({})
  })

  it('parse', () => {
    const puzzle = new Puzzle()

    expect(puzzle.parse('')).toEqual({})
  })

  it('parseAlgorithm', () => {
    const puzzle = new Puzzle()

    expect(puzzle.parseAlgorithm('')).toEqual([])
  })

  it('reset', () => {
    const puzzle = new Puzzle()

    expect(() => puzzle.reset()).not.toThrow()
  })

  it('scramble', () => {
    const puzzle = new Puzzle()

    expect(puzzle.scramble()).toEqual('')
  })

  it('stickers', () => {
    const puzzle = new Puzzle()

    expect(puzzle.stickers()).toEqual([])
  })

  it('test', () => {
    const puzzle = new Puzzle()

    expect(puzzle.test()).toBe(true)
  })

  it('turn', () => {
    const puzzle = new Puzzle()

    expect(() => puzzle.turn('')).not.toThrow()
  })
})
