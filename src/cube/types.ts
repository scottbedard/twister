import type { Range } from '@/utils/types'

export type CubeAxis = 'x' | 'y' | 'z'

export type CubeFace = 'u' | 'd' | 'l' | 'r' | 'f' | 'b'

export type CubeOptions<T = null> = {
  data?: () => T
  rand?: () => number
  size?: number
}

export type CubeSolvedOptions = {
  super?: boolean
}

export type CubeOpposite<T extends CubeFace>
  = T extends 'u' ? 'd'
    : T extends 'd' ? 'u'
      : T extends 'l' ? 'r'
        : T extends 'r' ? 'l'
          : T extends 'f' ? 'b'
            : T extends 'b' ? 'f'
              : never

export interface CubeSticker<T = null> {
  data: T
  face: CubeFace
  index: number
  rotation: Range<4>
}

export type CubeTurn = {
  depth: number
  rotation: number
  target: CubeFace | CubeAxis
  wide: boolean
}
