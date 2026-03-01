export type CubeFace = 0 | 1 | 2 | 3 | 4 | 5

export type CubeOptions = {
  rand: () => number
  size: number
}

export interface CubeSticker {
  face: CubeFace
  index: number
  orientation: 0 | 1 | 2 | 3
}
