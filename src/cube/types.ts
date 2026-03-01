export type CubeAxis = 'x' | 'y' | 'z'

export type CubeFace = 'u' | 'd' | 'l' | 'r' | 'f' | 'b'

export type CubeOptions = {
  rand: () => number
  size: number
}

export interface CubeSticker {
  face: CubeFace
  index: number
  orientation: 0 | 1 | 2 | 3
}

export type CubeTurn = {
  depth: number
  rotation: number
  target: CubeFace | CubeAxis
  wide: boolean
}
