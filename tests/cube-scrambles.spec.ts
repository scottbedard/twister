import { Cube } from '@/index'
import { describe, expect, test } from 'vitest'
import type { CubeFace } from '@/index'

describe('cube scrambles', () => {
  const [y, o, b, r, g, w] = ['u', 'l', 'f', 'r', 'b', 'd'] as const

  const turn = (obj: {
    size: number
    scramble: string
    result: Record<CubeFace, CubeFace[]>
  }) => {
    const cube = new Cube(obj.size).turn(obj.scramble)
    expect(cube.state.u.map(s => s.face)).toEqual(obj.result.u)
    expect(cube.state.l.map(s => s.face)).toEqual(obj.result.l)
    expect(cube.state.f.map(s => s.face)).toEqual(obj.result.f)
    expect(cube.state.r.map(s => s.face)).toEqual(obj.result.r)
    expect(cube.state.b.map(s => s.face)).toEqual(obj.result.b)
    expect(cube.state.d.map(s => s.face)).toEqual(obj.result.d)
  }

  test('2x2', () => {
    turn({
      size: 2,
      scramble: 'F2 U2 F2 U- F- R F2 U2 F- U2',
      result: {
        u: [
          y, b,
          g, b,
        ],
        l: [
          b, r,
          o, g,
        ],
        f: [
          w, o,
          r, o,
        ],
        r: [
          w, w,
          g, b,
        ],
        b: [
          r, o,
          y, g,
        ],
        d: [
          y, y,
          w, r,
        ],
      },
    })
  })

  test('3x3', () => {
    turn({
      size: 3,
      scramble: 'R U- L- B2 F2 L- R- U2 R D- L R- D- L D B- L B D- B2 F- L R D2 B- R- F2 L B2 D2',
      result: {
        u: [
          o, r, g,
          y, y, o,
          g, w, b,
        ],
        l: [
          b, o, o,
          w, o, r,
          o, g, g,
        ],
        f: [
          y, b, w,
          b, b, r,
          w, y, w,
        ],
        r: [
          r, b, y,
          y, r, r,
          g, w, b,
        ],
        b: [
          r, w, w,
          g, g, g,
          y, y, b,
        ],
        d: [
          r, g, o,
          o, w, o,
          y, b, r,
        ],
      },
    })
  })

  test('4x4', () => {
    turn({
      size: 4,
      scramble: 'Rw2 U- B2 Fw D- R2 D2 R- Uw- L2 Fw- L2 B- D- R- F Rw B- L- Rw2 B2 Uw2 L- Fw Uw2 F Uw Fw- F L2',
      result: {
        u: [
          w, o, b, g,
          r, b, o, b,
          b, g, w, w,
          b, g, w, r,
        ],
        l: [
          g, g, r, r,
          r, y, r, r,
          g, w, b, w,
          g, g, r, w,
        ],
        f: [
          y, w, o, b,
          g, w, g, g,
          o, r, r, y,
          o, b, w, y,
        ],
        r: [
          w, g, w, y,
          o, b, o, y,
          o, b, r, b,
          o, b, r, b,
        ],
        b: [
          r, r, g, o,
          o, y, y, y,
          y, g, y, y,
          o, y, b, r,
        ],
        d: [
          b, o, r, g,
          y, o, w, w,
          y, o, g, w,
          w, o, b, y,
        ],
      },
    })
  })

  test('5x5', () => {
    turn({
      size: 5,
      scramble: 'R- Dw2 L- D- U2 B R2 B2 U- Bw- Lw2 Dw- Rw- U- R Dw- Uw- F Dw- B- L2 Lw- Rw- R2 Bw- Fw2 F R- B- D',
      result: {
        u: [
          b, w, r, g, w,
          o, w, y, b, r,
          o, g, y, o, b,
          g, r, y, r, w,
          o, g, o, o, o,
        ],
        l: [
          r, w, b, y, w,
          b, y, r, g, b,
          g, w, o, g, r,
          g, w, w, b, g,
          y, y, g, g, r,
        ],
        f: [
          b, o, w, w, y,
          y, r, w, w, w,
          w, g, b, o, y,
          y, y, b, b, b,
          b, o, y, b, r,
        ],
        r: [
          g, b, r, y, o,
          r, g, y, o, r,
          r, r, r, y, o,
          y, g, b, y, r,
          y, b, b, r, g,
        ],
        b: [
          g, r, g, g, w,
          w, b, r, o, o,
          g, g, g, w, w,
          y, r, b, w, w,
          w, r, o, g, o,
        ],
        d: [
          y, y, b, o, g,
          r, o, r, y, w,
          y, b, w, o, w,
          o, g, o, o, b,
          b, o, y, b, r,
        ],
      },
    })
  })
})
