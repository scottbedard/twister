import { describe, expect, it } from 'vitest'
import { Dodecaminx } from '@/index'

describe('dodecaminx whole turn', () => {
  it('rotates the target face', () => {
    const d = new Dodecaminx(3).turn('u')
    expect(d.centers.u).toBe(1)
  })

  it('rotates the opposite face', () => {
    const d = new Dodecaminx(3).turn('u')
    // u opposite is d; rotation -1 mod 5 = 4
    expect(d.centers.d).toBe(4)
  })
})
