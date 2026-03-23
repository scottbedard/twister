import type {
  CubeFace,
  CubeSticker,
} from './types'

export function createFace(size: number, face: CubeFace): CubeSticker[] {
  const rotation = 0

  return Array.from({ length: size * size }, (_, index) => ({
    face,
    index,
    rotation,
  }))
}
