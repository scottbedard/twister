import { describe, expect, test } from 'vitest'
import { Cube } from '@/cube'
import type { CubeFace } from '@/cube/types'

describe('cube turns', () => {
  const [y, o, b, r, g, w] = ['u', 'l', 'f', 'r', 'b', 'd'] as const

  const turn = (notation: string, expected: Record<CubeFace, CubeFace[]>) => {
    const cube = new Cube(3).turn(notation)

    expect(expected).toEqual({
      u: cube.state.u.map(sticker => sticker.face),
      l: cube.state.l.map(sticker => sticker.face),
      f: cube.state.f.map(sticker => sticker.face),
      r: cube.state.r.map(sticker => sticker.face),
      b: cube.state.b.map(sticker => sticker.face),
      d: cube.state.d.map(sticker => sticker.face),
    })
  }

  test('U', () => {
    turn('U', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        b, b, b,
        o, o, o,
        o, o, o,
      ],
      f: [
        r, r, r,
        b, b, b,
        b, b, b,
      ],
      r: [
        g, g, g,
        r, r, r,
        r, r, r,
      ],
      b: [
        o, o, o,
        g, g, g,
        g, g, g,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('U-', () => {
    turn('U-', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        g, g, g,
        o, o, o,
        o, o, o,
      ],
      f: [
        o, o, o,
        b, b, b,
        b, b, b,
      ],
      r: [
        b, b, b,
        r, r, r,
        r, r, r,
      ],
      b: [
        r, r, r,
        g, g, g,
        g, g, g,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('U2', () => {
    turn('U2', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        r, r, r,
        o, o, o,
        o, o, o,
      ],
      f: [
        g, g, g,
        b, b, b,
        b, b, b,
      ],
      r: [
        o, o, o,
        r, r, r,
        r, r, r,
      ],
      b: [
        b, b, b,
        g, g, g,
        g, g, g,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('3U', () => {
    turn('3U', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        o, o, o,
        o, o, o,
        b, b, b,
      ],
      f: [
        b, b, b,
        b, b, b,
        r, r, r,
      ],
      r: [
        r, r, r,
        r, r, r,
        g, g, g,
      ],
      b: [
        g, g, g,
        g, g, g,
        o, o, o,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('3U-', () => {
    turn('3U-', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        o, o, o,
        o, o, o,
        g, g, g,
      ],
      f: [
        b, b, b,
        b, b, b,
        o, o, o,
      ],
      r: [
        r, r, r,
        r, r, r,
        b, b, b,
      ],
      b: [
        g, g, g,
        g, g, g,
        r, r, r,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('3U2', () => {
    turn('3U2', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        o, o, o,
        o, o, o,
        r, r, r,
      ],
      f: [
        b, b, b,
        b, b, b,
        g, g, g,
      ],
      r: [
        r, r, r,
        r, r, r,
        o, o, o,
      ],
      b: [
        g, g, g,
        g, g, g,
        b, b, b,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('L', () => {
    turn('L', {
      u: [
        g, y, y,
        g, y, y,
        g, y, y,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        y, b, b,
        y, b, b,
        y, b, b,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        g, g, w,
        g, g, w,
        g, g, w,
      ],
      d: [
        b, w, w,
        b, w, w,
        b, w, w,
      ],
    })
  })

  test('L-', () => {
    turn('L-', {
      u: [
        b, y, y,
        b, y, y,
        b, y, y,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        w, b, b,
        w, b, b,
        w, b, b,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        g, g, y,
        g, g, y,
        g, g, y,
      ],
      d: [
        g, w, w,
        g, w, w,
        g, w, w,
      ],
    })
  })

  test('L2', () => {
    turn('L2', {
      u: [
        w, y, y,
        w, y, y,
        w, y, y,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        g, b, b,
        g, b, b,
        g, b, b,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        g, g, b,
        g, g, b,
        g, g, b,
      ],
      d: [
        y, w, w,
        y, w, w,
        y, w, w,
      ],
    })
  })

  test('F', () => {
    turn('F', {
      u: [
        y, y, y,
        y, y, y,
        o, o, o,
      ],
      l: [
        o, o, w,
        o, o, w,
        o, o, w,
      ],
      f: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      r: [
        y, r, r,
        y, r, r,
        y, r, r,
      ],
      b: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      d: [
        r, r, r,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('F-', () => {
    turn('F-', {
      u: [
        y, y, y,
        y, y, y,
        r, r, r,
      ],
      l: [
        o, o, y,
        o, o, y,
        o, o, y,
      ],
      f: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      r: [
        w, r, r,
        w, r, r,
        w, r, r,
      ],
      b: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      d: [
        o, o, o,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('F2', () => {
    turn('F2', {
      u: [
        y, y, y,
        y, y, y,
        w, w, w,
      ],
      l: [
        o, o, r,
        o, o, r,
        o, o, r,
      ],
      f: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      r: [
        o, r, r,
        o, r, r,
        o, r, r,
      ],
      b: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      d: [
        y, y, y,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('R', () => {
    turn('R', {
      u: [
        y, y, b,
        y, y, b,
        y, y, b,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        b, b, w,
        b, b, w,
        b, b, w,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        y, g, g,
        y, g, g,
        y, g, g,
      ],
      d: [
        w, w, g,
        w, w, g,
        w, w, g,
      ],
    })
  })

  test('R-', () => {
    turn('R-', {
      u: [
        y, y, g,
        y, y, g,
        y, y, g,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        b, b, y,
        b, b, y,
        b, b, y,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        w, g, g,
        w, g, g,
        w, g, g,
      ],
      d: [
        w, w, b,
        w, w, b,
        w, w, b,
      ],
    })
  })

  test('R2', () => {
    turn('R2', {
      u: [
        y, y, w,
        y, y, w,
        y, y, w,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        b, b, g,
        b, b, g,
        b, b, g,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        b, g, g,
        b, g, g,
        b, g, g,
      ],
      d: [
        w, w, y,
        w, w, y,
        w, w, y,
      ],
    })
  })

  test('Rw', () => {
    turn('Rw', {
      u: [
        y, b, b,
        y, b, b,
        y, b, b,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        b, w, w,
        b, w, w,
        b, w, w,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        y, y, g,
        y, y, g,
        y, y, g,
      ],
      d: [
        w, g, g,
        w, g, g,
        w, g, g,
      ],
    })
  })

  test('Rw-', () => {
    turn('Rw-', {
      u: [
        y, g, g,
        y, g, g,
        y, g, g,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        b, y, y,
        b, y, y,
        b, y, y,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        w, w, g,
        w, w, g,
        w, w, g,
      ],
      d: [
        w, b, b,
        w, b, b,
        w, b, b,
      ],
    })
  })

  test('Rw2', () => {
    turn('Rw2', {
      u: [
        y, w, w,
        y, w, w,
        y, w, w,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        b, g, g,
        b, g, g,
        b, g, g,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        b, b, g,
        b, b, g,
        b, b, g,
      ],
      d: [
        w, y, y,
        w, y, y,
        w, y, y,
      ],
    })
  })

  test('B', () => {
    turn('B', {
      u: [
        r, r, r,
        y, y, y,
        y, y, y,
      ],
      l: [
        y, o, o,
        y, o, o,
        y, o, o,
      ],
      f: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      r: [
        r, r, w,
        r, r, w,
        r, r, w,
      ],
      b: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      d: [
        w, w, w,
        w, w, w,
        o, o, o,
      ],
    })
  })

  test('B-', () => {
    turn('B-', {
      u: [
        o, o, o,
        y, y, y,
        y, y, y,
      ],
      l: [
        w, o, o,
        w, o, o,
        w, o, o,
      ],
      f: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      r: [
        r, r, y,
        r, r, y,
        r, r, y,
      ],
      b: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      d: [
        w, w, w,
        w, w, w,
        r, r, r,
      ],
    })
  })

  test('B2', () => {
    turn('B2', {
      u: [
        w, w, w,
        y, y, y,
        y, y, y,
      ],
      l: [
        r, o, o,
        r, o, o,
        r, o, o,
      ],
      f: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      r: [
        r, r, o,
        r, r, o,
        r, r, o,
      ],
      b: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      d: [
        w, w, w,
        w, w, w,
        y, y, y,
      ],
    })
  })

  test('D', () => {
    turn('D', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        o, o, o,
        o, o, o,
        g, g, g,
      ],
      f: [
        b, b, b,
        b, b, b,
        o, o, o,
      ],
      r: [
        r, r, r,
        r, r, r,
        b, b, b,
      ],
      b: [
        g, g, g,
        g, g, g,
        r, r, r,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('D-', () => {
    turn('D-', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        o, o, o,
        o, o, o,
        b, b, b,
      ],
      f: [
        b, b, b,
        b, b, b,
        r, r, r,
      ],
      r: [
        r, r, r,
        r, r, r,
        g, g, g,
      ],
      b: [
        g, g, g,
        g, g, g,
        o, o, o,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('D2', () => {
    turn('D2', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        o, o, o,
        o, o, o,
        r, r, r,
      ],
      f: [
        b, b, b,
        b, b, b,
        g, g, g,
      ],
      r: [
        r, r, r,
        r, r, r,
        o, o, o,
      ],
      b: [
        g, g, g,
        g, g, g,
        b, b, b,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('X', () => {
    turn('X', {
      u: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      d: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
    })
  })

  test('X-', () => {
    turn('X-', {
      u: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
      d: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
    })
  })

  test('X2', () => {
    turn('X2', {
      u: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
      l: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      f: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      r: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      b: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      d: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
    })
  })

  test('Y', () => {
    turn('Y', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      f: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      r: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      b: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('Y-', () => {
    turn('Y-', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      f: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      r: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      b: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('Y2', () => {
    turn('Y2', {
      u: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      l: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      f: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      r: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      b: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      d: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
    })
  })

  test('Z', () => {
    turn('Z', {
      u: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      l: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
      f: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      r: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      b: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      d: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
    })
  })

  test('Z-', () => {
    turn('Z-', {
      u: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      l: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
      f: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      r: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
      b: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      d: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
    })
  })

  test('Z2', () => {
    turn('Z2', {
      u: [
        w, w, w,
        w, w, w,
        w, w, w,
      ],
      l: [
        r, r, r,
        r, r, r,
        r, r, r,
      ],
      f: [
        b, b, b,
        b, b, b,
        b, b, b,
      ],
      r: [
        o, o, o,
        o, o, o,
        o, o, o,
      ],
      b: [
        g, g, g,
        g, g, g,
        g, g, g,
      ],
      d: [
        y, y, y,
        y, y, y,
        y, y, y,
      ],
    })
  })
})
