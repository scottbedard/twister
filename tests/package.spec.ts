import type { BlockMatrix } from '@/utils/block-matrix'
import { describe, expect, it } from 'vitest'
import * as twister from '@/index'

describe('twister package exports (src/index.ts)', () => {
  it('exposes the expected runtime members', () => {
    expect(Object.keys(twister).sort()).toEqual([
      'Cube',
      'Dodecaminx',
      'iterateBlockMatrix',
    ])
  })

  it('Cube', () => {
    expect(twister.Cube).toBeTypeOf('function')
    expect(new twister.Cube()).toBeInstanceOf(twister.Cube)
  })

  it('Dodecaminx', () => {
    expect(twister.Dodecaminx).toBeTypeOf('function')
    expect(new twister.Dodecaminx()).toBeInstanceOf(twister.Dodecaminx)
  })

  it('iterateBlockMatrix', () => {
    expect(twister.iterateBlockMatrix).toBeTypeOf('function')

    const seen: number[] = []
    const block = [[[1], [2], [3], [4], [5]]] as BlockMatrix<number>
    twister.iterateBlockMatrix(block, (v) => {
      seen.push(v)
    })
    expect(seen).toEqual([1, 2, 3, 4, 5])
  })
})
