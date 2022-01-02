import { CompositeMatrix } from '@/utils/composite-matrix'

/**
 * Dodecaminx faces
 */
export type DodecaminxFace = 'U' | 'L' | 'F' | 'R' | 'BL' | 'BR' | 'D' | 'DL' | 'DR' | 'DBL' | 'DBR' | 'B'

/**
 * Lowercase dodecaminx faces
 */
export type DodecaminxFaceLower = Lowercase<DodecaminxFace>

/**
 * Dodecaminx options
 */
export type DodecaminxOptions = {
  random: () => number,
  size: number,
}

/**
 * Dodecaminx state
 */
export type DodecaminxState = Record<DodecaminxFaceLower, CompositeMatrix<DodecaminxSticker>>

/**
 * Simplified dodecaminx state
 */
export type DodecaminxStateSimple = Record<DodecaminxFaceLower, CompositeMatrix<number>>

/**
 * Dodecaminx sticker
 */
export type DodecaminxSticker<Meta = Record<string, any>> = {
  meta: Meta,
  value: number,
}

/**
 * Parsed dodecaminx turn
 */
export type DodecaminxTurn = {
  depth: number,
  rotation: number,
  target: DodecaminxFaceLower,
  whole: boolean,
  wide: boolean,
}
