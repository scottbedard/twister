import type { CompositeMatrix } from '@/utils/composite-matrix'

export type DodecaminxFace = 'u' | 'l' | 'f' | 'r' | 'bl' | 'br' | 'd' | 'dl' | 'dr' | 'dbl' | 'dbr' | 'b'

export interface DodecaminxTurn {
  depth: number
  rotation: number
  target: DodecaminxFace
  whole: boolean
  wide: boolean
}

export interface DodecaminxSolvedOptions {
  super?: boolean
}

export type DodecaminxState = Record<DodecaminxFace, CompositeMatrix<DodecaminxSticker>>

export interface DodecaminxSticker {
  face: DodecaminxFace
  index: number
  matrix: number
  /** Pentagon steps 0..4 (0 = identity) */
  rotation?: 0 | 1 | 2 | 3 | 4
}

export interface DodecaminxOptions {
  rand?: () => number
  size: number
}
