import type { DodecaminxFace, DodecaminxSticker } from './types'
import type { CompositeMatrix } from '@/utils/composite-matrix'
import { createCompositeMatrix } from '@/utils'

export function createDodecaminxFace(face: DodecaminxFace, size: number): CompositeMatrix<DodecaminxSticker> {
  return createCompositeMatrix(5, size, index => ({ face, index, rotation: 0 }))
}
