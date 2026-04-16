import type {
  CubeFace,
  CubeSticker,
} from './types'

export function createFace<T = null>(size: number, face: CubeFace, data: () => T): CubeSticker<T>[] {
  const rotation = 0

  return Array.from({ length: size * size }, (_, index) => ({
    data: data(),
    face,
    index,
    rotation,
  }))
}
