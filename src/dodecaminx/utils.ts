import { createBlockMatrix } from '@/utils'
import type { BlockMatrix } from '@/utils/block-matrix'
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

function createDodecaminxFace<T = null>(
  face: DodecaminxFace,
  size: number,
  data: () => T,
): BlockMatrix<DodecaminxSticker<T>> {
  return createBlockMatrix(5, size, ({ index, matrix }) => ({
    data: data(),
    index,
    matrix,
    face,
  }))
}

export function createDodecaminxState<T = null>(size: number, data: () => T): DodecaminxState<T> {
  return {
    b: createDodecaminxFace('b', size, data),
    bl: createDodecaminxFace('bl', size, data),
    br: createDodecaminxFace('br', size, data),
    d: createDodecaminxFace('d', size, data),
    dbl: createDodecaminxFace('dbl', size, data),
    dbr: createDodecaminxFace('dbr', size, data),
    dl: createDodecaminxFace('dl', size, data),
    dr: createDodecaminxFace('dr', size, data),
    f: createDodecaminxFace('f', size, data),
    l: createDodecaminxFace('l', size, data),
    r: createDodecaminxFace('r', size, data),
    u: createDodecaminxFace('u', size, data),
  }
}
