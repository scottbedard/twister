import { Cube } from '@/index'
import cubeNotation from './cube-notation'
import cubeScrambles from './cube-scrambles'
import cubeTurns from './cube-turns'

describe('Cube', () => {
  it('apply', () => {
    const model = new Cube({ size: 2 })

    model.apply({
      u: ['u0', 'u1', 'u2', 'u3'],
      l: ['l0', 'l1', 'l2', 'l3'],
      f: ['f0', 'f1', 'f2', 'f3'],
      r: ['r0', 'r1', 'r2', 'r3'],
      b: ['b0', 'b1', 'b2', 'b3'],
      d: ['d0', 'd1', 'd2', 'd3'],
    })

    expect(model.state.u[0].value).toBe('u0')
    expect(model.state.u[1].value).toBe('u1')
    expect(model.state.u[2].value).toBe('u2')
    expect(model.state.u[3].value).toBe('u3')
    expect(model.state.l[0].value).toBe('l0')
    expect(model.state.l[1].value).toBe('l1')
    expect(model.state.l[2].value).toBe('l2')
    expect(model.state.l[3].value).toBe('l3')
    expect(model.state.f[0].value).toBe('f0')
    expect(model.state.f[1].value).toBe('f1')
    expect(model.state.f[2].value).toBe('f2')
    expect(model.state.f[3].value).toBe('f3')
    expect(model.state.r[0].value).toBe('r0')
    expect(model.state.r[1].value).toBe('r1')
    expect(model.state.r[2].value).toBe('r2')
    expect(model.state.r[3].value).toBe('r3')
    expect(model.state.b[0].value).toBe('b0')
    expect(model.state.b[1].value).toBe('b1')
    expect(model.state.b[2].value).toBe('b2')
    expect(model.state.b[3].value).toBe('b3')
    expect(model.state.d[0].value).toBe('d0')
    expect(model.state.d[1].value).toBe('d1')
    expect(model.state.d[2].value).toBe('d2')
    expect(model.state.d[3].value).toBe('d3')
  })

  it('clone', () => {
    const model = new Cube({ size: 2 })

    model.turn('F')

    const clone = model.clone()

    expect(clone.test()).toBe(false)

    clone.turn('F-')

    expect(clone.test()).toBe(true)
  })

  it('generateScramble', () => {
    const model = new Cube({
      random: () => 0.5,
    })

    const turn = model.generateScramble(1)

    expect(model.generateScramble(1, turn)).not.toBe(turn)

    const scramble = model.generateScramble(5)

    expect(scramble.split(' ').length).toBe(5)
  })

  it('output', () => {
    const model = new Cube({ size: 2 })

    expect(model.output()).toEqual({
      u: [0, 0, 0, 0],
      l: [1, 1, 1, 1],
      f: [2, 2, 2, 2],
      r: [3, 3, 3, 3],
      b: [4, 4, 4, 4],
      d: [5, 5, 5, 5],
    })
  })

  describe('parse', () => {
    const debug = ''
    const model = new Cube({ size: 3 })

    describe('valid', () => {
      Object.entries(cubeNotation).forEach(([turn, expected]) => {
        if (!debug || debug === turn) {
          it(turn, () => {
            expect(model.parse(turn)).toEqual(expected)
          })
        } else {
          it.todo(turn)
        }
      })
    })

    describe('invalid', () => {
      it('bad turn', () => {
        expect(() => model.parse('bad turn')).toThrow()
      })

      it('R2-', () => {
        expect(() => model.parse('R2-')).toThrow()
      })
    })

    describe('unturn', () => {
      [
        ['R', 'R-'],
        ['R-', 'R'],
        ['R2', 'R2'],
      ].forEach(([notation, reversedNotation]) => {
        it(`${notation} -> ${reversedNotation}`, () => {
          expect(model.parse(notation, true)).toEqual(model.parse(reversedNotation))
        })
      })
    })
  })

  describe('stickers', () => {
    it('all stickers', () => {
      const model = new Cube({ size: 3 })
      const stickers = model.stickers()

      expect(stickers.length).toBe((3 ** 2) * 6)
    })

    it('X', () => {
      const model = new Cube({ size: 3 })
      const stickers = model.stickers('X')

      expect(stickers.length).toBe((3 ** 2) * 6)
    })

    it('U', () => {
      const model = new Cube({ size: 3 })
      const stickers = model.stickers('U')

      expect(stickers.length).toBe((3 ** 2) + (3 * 4))
      expect(stickers).toContain(model.state.u[0])
      expect(stickers).toContain(model.state.u[1])
      expect(stickers).toContain(model.state.u[2])
      expect(stickers).toContain(model.state.u[3])
      expect(stickers).toContain(model.state.u[4])
      expect(stickers).toContain(model.state.u[5])
      expect(stickers).toContain(model.state.u[6])
      expect(stickers).toContain(model.state.u[7])
      expect(stickers).toContain(model.state.u[8])
      expect(stickers).toContain(model.state.l[0])
      expect(stickers).toContain(model.state.l[1])
      expect(stickers).toContain(model.state.l[2])
      expect(stickers).toContain(model.state.f[0])
      expect(stickers).toContain(model.state.f[1])
      expect(stickers).toContain(model.state.f[2])
      expect(stickers).toContain(model.state.r[0])
      expect(stickers).toContain(model.state.r[1])
      expect(stickers).toContain(model.state.r[2])
      expect(stickers).toContain(model.state.b[0])
      expect(stickers).toContain(model.state.b[1])
      expect(stickers).toContain(model.state.b[2])
    })

    it('Uw', () => {
      const model = new Cube({ size: 3 })
      const stickers = model.stickers('Uw')

      expect(stickers.length).toBe((3 ** 2) + (6 * 4))
      expect(stickers).toContain(model.state.u[0])
      expect(stickers).toContain(model.state.u[1])
      expect(stickers).toContain(model.state.u[2])
      expect(stickers).toContain(model.state.u[3])
      expect(stickers).toContain(model.state.u[4])
      expect(stickers).toContain(model.state.u[5])
      expect(stickers).toContain(model.state.u[6])
      expect(stickers).toContain(model.state.u[7])
      expect(stickers).toContain(model.state.u[8])
      expect(stickers).toContain(model.state.l[0])
      expect(stickers).toContain(model.state.l[1])
      expect(stickers).toContain(model.state.l[2])
      expect(stickers).toContain(model.state.l[3])
      expect(stickers).toContain(model.state.l[4])
      expect(stickers).toContain(model.state.l[5])
      expect(stickers).toContain(model.state.f[0])
      expect(stickers).toContain(model.state.f[1])
      expect(stickers).toContain(model.state.f[2])
      expect(stickers).toContain(model.state.f[3])
      expect(stickers).toContain(model.state.f[4])
      expect(stickers).toContain(model.state.f[5])
      expect(stickers).toContain(model.state.r[0])
      expect(stickers).toContain(model.state.r[1])
      expect(stickers).toContain(model.state.r[2])
      expect(stickers).toContain(model.state.r[3])
      expect(stickers).toContain(model.state.r[4])
      expect(stickers).toContain(model.state.r[5])
      expect(stickers).toContain(model.state.b[0])
      expect(stickers).toContain(model.state.b[1])
      expect(stickers).toContain(model.state.b[2])
      expect(stickers).toContain(model.state.b[3])
      expect(stickers).toContain(model.state.b[4])
      expect(stickers).toContain(model.state.b[5])
    })

    it('2U', () => {
      const model = new Cube({ size: 3 })
      const stickers = model.stickers('2U')

      expect(stickers.length).toBe(3 * 4)
      expect(stickers).toContain(model.state.l[3])
      expect(stickers).toContain(model.state.l[4])
      expect(stickers).toContain(model.state.l[5])
      expect(stickers).toContain(model.state.f[3])
      expect(stickers).toContain(model.state.f[4])
      expect(stickers).toContain(model.state.f[5])
      expect(stickers).toContain(model.state.r[3])
      expect(stickers).toContain(model.state.r[4])
      expect(stickers).toContain(model.state.r[5])
      expect(stickers).toContain(model.state.b[3])
      expect(stickers).toContain(model.state.b[4])
      expect(stickers).toContain(model.state.b[5])
    })

    it('3Uw', () => {
      const model = new Cube({ size: 3 })
      const stickers = model.stickers('3Uw')

      expect(stickers.length).toBe((3 ** 2) * 6)
    })
  })

  it('scramble', () => {
    const model = new Cube({ size: 3 })

    const scramble = model.scramble(10)

    expect(scramble.split(' ').length).toBe(10)

    expect(model.test()).toBe(false)
  })

  it('test', () => {
    const model = new Cube({ size: 3 })

    expect(model.test()).toBe(true)

    model.state.f[4].value = null

    expect(model.test()).toBe(true)

    model.turn('R')

    expect(model.test()).toBe(false)

    model.turn('R-')

    expect(model.test()).toBe(true)
  })

  it('test specific state', () => {
    const model = new Cube({ size: 2 })

    model.apply({
      f: [0, 0, 1, 1],
      l: [1, 1, 0, 0],
    })

    expect(model.test({
      f: [0, 0, 1, 1],
      l: [1, 1, 0, 0],
    })).toBe(true)

    expect(model.test({
      f: [1, 1, 1, 1],
    })).toBe(false)

    model.turn('U-')

    expect(model.test({
      f: [1, 1, 1, 1],
    })).toBe(true)
  })

  describe('turn', () => {
    // individual turns
    Object.entries(cubeTurns).forEach(([turn, expected]) => {
      const debug = ''
      const name = `3x3 - ${turn}`

      if (!debug || debug === turn) {
        it(name, () => {
          const model = new Cube({ size: 3 })

          model.turn(turn)

          expect(model.output()).toEqual(expected)
        })
      } else {
        it.todo(name)
      }
    })

    // scramble tests
    cubeScrambles.forEach(obj => {
      const debug = 0
      const name = `${obj.size}x${obj.size} - scramble`

      if (!debug || debug === obj.size) {
        it(name, () => {
          const model = new Cube({ size: obj.size })

          model.turn(obj.scramble)

          expect(model.output()).toEqual(obj.result)
        })
      } else {
        it.skip(name)
      }
    })
  })

  describe('unturn', () => {
    it('reverse a turn', () => {
      const cube = new Cube({ size: 3 })

      const scramble = cube.scramble()

      expect(cube.test()).toBe(false)

      cube.unturn(scramble)

      expect(cube.test()).toBe(true)
    })
  })
})
