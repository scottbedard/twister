export type DodecaminxFace = 'u' | 'l' | 'f' | 'r' | 'bl' | 'br' | 'd' | 'dl' | 'dr' | 'dbl' | 'dbr' | 'b'

export interface DodecaminxTurn {
  type: 'turn'
  axis: 'x' | 'y' | 'z'
  angle: number
}

export interface DodecaminxSolvedOptions {
  size: number
}

export interface DodecaminxOptions {
  rand?: () => number
  size: number
}
