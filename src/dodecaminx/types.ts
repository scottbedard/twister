export type DodecaminxFace = 'u' | 'l' | 'f' | 'r' | 'bl' | 'br' | 'd' | 'dl' | 'dr' | 'dbl' | 'dbr' | 'b'

export interface DodecaminxTurn {
  depth: number
  rotation: number
  target: DodecaminxFace
  whole: boolean
  wide: boolean
}

export interface DodecaminxSolvedOptions {
  size: number
}

export interface DodecaminxSticker {
  face: DodecaminxFace
  index: number
  rotation: 0 | 1 | 2 | 3
}

export interface DodecaminxOptions {
  rand?: () => number
  size: number
}
