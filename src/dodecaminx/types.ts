import type { BlockMatrix } from '@/utils/block-matrix'

export type DodecaminxFace = 'u' | 'l' | 'f' | 'r' | 'bl' | 'br' | 'd' | 'dl' | 'dr' | 'dbl' | 'dbr' | 'b'

export type DodecaminxOpposite<T extends DodecaminxFace>
  = T extends 'b' ? 'f'
    : T extends 'bl' ? 'dr'
      : T extends 'br' ? 'dl'
        : T extends 'd' ? 'u'
          : T extends 'dbl' ? 'r'
            : T extends 'dbr' ? 'l'
              : T extends 'dl' ? 'br'
                : T extends 'dr' ? 'bl'
                  : T extends 'f' ? 'b'
                    : T extends 'l' ? 'dbr'
                      : T extends 'r' ? 'dbl'
                        : T extends 'u' ? 'd'
                          : never

export interface DodecaminxTurn {
  depth: number
  rotation: number
  target: DodecaminxFace
  whole: boolean
  wide: boolean
}

export interface DodecaminxSolvedOptions {
  super?: boolean
}

export type DodecaminxState<T = null> = Record<DodecaminxFace, BlockMatrix<DodecaminxSticker<T>>>

export interface DodecaminxSticker<T = null> {
  data: T
  face: DodecaminxFace
  index: number
  matrix: number
}

export interface DodecaminxOptions<T = null> {
  data?: () => T
  rand?: () => number
  size?: number
}
