import type { CubeFace, CubeSticker } from './types'

export function createFace(size: number, face: CubeFace): CubeSticker[] {
  return Array.from({ length: size * size }, (_, index) => ({
    face,
    index,
  }))
}

export function getQuadrant(index: number, size: number) {
  const row = Math.floor(index / size)
  const col = index % size
  const mid = size / 2
  return row >= mid
    ? (col >= mid ? 2 : 3) // bottom-right 2, bottom-left 3
    : (col >= mid ? 1 : 0) // top-left 0, top-right 1
}
