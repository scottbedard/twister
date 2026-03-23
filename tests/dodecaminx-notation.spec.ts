import { describe, expect, it } from 'vitest'
import { Dodecaminx } from '@/index'
import type { DodecaminxTurn } from '@/dodecaminx/types'

const stringifyCases: Record<string, DodecaminxTurn> = {
  'R': {
    depth: 1,
    rotation: 1,
    target: 'r',
    whole: false,
    wide: false,
  },
  'R\'': {
    depth: 1,
    rotation: -1,
    target: 'r',
    whole: false,
    wide: false,
  },
  'R2\'': {
    depth: 1,
    rotation: -2,
    target: 'r',
    whole: false,
    wide: false,
  },
  'R-': {
    depth: 1,
    rotation: -1,
    target: 'r',
    whole: false,
    wide: false,
  },
  'R2-': {
    depth: 1,
    rotation: -2,
    target: 'r',
    whole: false,
    wide: false,
  },
  '2R': {
    depth: 2,
    rotation: 1,
    target: 'r',
    whole: false,
    wide: false,
  },
  'Rw': {
    depth: 2,
    rotation: 1,
    target: 'r',
    whole: false,
    wide: true,
  },
  '3Rw2': {
    depth: 3,
    rotation: 2,
    target: 'r',
    whole: false,
    wide: true,
  },
  'r': {
    depth: 1,
    rotation: 1,
    target: 'r',
    whole: true,
    wide: false,
  },
  'dbl2-': {
    depth: 1,
    rotation: -2,
    target: 'dbl',
    whole: true,
    wide: false,
  },
}

describe('dodecaminx parseTurn', () => {
  const dodecaminx = new Dodecaminx(3)

  for (const [str, obj] of Object.entries(stringifyCases)) {
    it(`parses: '${str}'`, () => {
      expect(dodecaminx.parseTurn(str)).toEqual(obj)
    })
  }
})
