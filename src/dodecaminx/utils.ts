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
  size: number,
): CompositeMatrix<DodecaminxSticker> {
  return createCompositeMatrix(5, size, ({ index, matrix }) => ({ index, matrix, face }))
}

export function createDodecaminxState(size: number): DodecaminxState {
  return {
    b: createDodecaminxFace('b', size),
    bl: createDodecaminxFace('bl', size),
    br: createDodecaminxFace('br', size),
    d: createDodecaminxFace('d', size),
    dbl: createDodecaminxFace('dbl', size),
    dbr: createDodecaminxFace('dbr', size),
    dl: createDodecaminxFace('dl', size),
    dr: createDodecaminxFace('dr', size),
    f: createDodecaminxFace('f', size),
    l: createDodecaminxFace('l', size),
    r: createDodecaminxFace('r', size),
    u: createDodecaminxFace('u', size),
  }
}
