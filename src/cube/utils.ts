import type { CubeFace, CubeSticker } from './types'

export function createFace(size: number, face: CubeFace): CubeSticker[] {
  return Array.from({ length: size * size }, (_, index) => ({
    face,
    index,
    orientation: 0,
  }))
}
