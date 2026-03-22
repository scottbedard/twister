import { createCompositeMatrix } from '@/utils'
import type { CompositeMatrix } from '@/utils/composite-matrix'
import type { DodecaminxFace, DodecaminxSticker, DodecaminxState } from './types'

export function createDodecaminxCenters(): Record<DodecaminxFace, number> {
  return {
    b: 0,
    bl: 0,
    br: 0,
    d: 0,
    dbl: 0,
    dbr: 0,
    dl: 0,
    dr: 0,
    f: 0,
    l: 0,
    r: 0,
    u: 0,
  }
}

function createDodecaminxFace(
  face: DodecaminxFace,
  matrix: number,
  size: number,
): CompositeMatrix<DodecaminxSticker> {
  return createCompositeMatrix(5, size, index => ({ face, index, matrix }))
}

export function createDodecaminxState(size: number): DodecaminxState {
  return {
    b: createDodecaminxFace('b', 0, size),
    bl: createDodecaminxFace('bl', 1, size),
    br: createDodecaminxFace('br', 2, size),
    d: createDodecaminxFace('d', 3, size),
    dbl: createDodecaminxFace('dbl', 4, size),
    dbr: createDodecaminxFace('dbr', 5, size),
    dl: createDodecaminxFace('dl', 6, size),
    dr: createDodecaminxFace('dr', 7, size),
    f: createDodecaminxFace('f', 8, size),
    l: createDodecaminxFace('l', 9, size),
    r: createDodecaminxFace('r', 10, size),
    u: createDodecaminxFace('u', 11, size),
  }
}
