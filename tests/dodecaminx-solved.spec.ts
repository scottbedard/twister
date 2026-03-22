import { describe, expect, it } from 'vitest'
import { Dodecaminx } from '@/index'
import { flatten, sample, shuffle, times } from '@/utils/array'
import { dodecaminxFaces } from '@/dodecaminx/constants'
import { createDodecaminxCenters } from '@/dodecaminx/utils'

describe('dodecaminx solved', () => {
  it('solved and super solved', () => {
    const dodecaminx = new Dodecaminx(3)
    expect(dodecaminx.solved()).toBe(true)

    // executing a t-perm once scrambles the puzzle
    const tperm = 'R U R- U- R- F R2 U- R- U- R U R- F-'
    dodecaminx.turn(tperm)
    expect(dodecaminx.solved()).toBe(false)
    expect(dodecaminx.solved({ super: true })).toBe(false)

    // another restores general solved state
    dodecaminx.turn(`${tperm} ${tperm}`)
    expect(dodecaminx.solved()).toBe(true)
    expect(dodecaminx.solved({ super: true })).toBe(false)

    // and 12 more times return super solved state
    dodecaminx.turn(times(12, tperm).join(' '))
    expect(dodecaminx.solved()).toBe(true)
    expect(dodecaminx.solved({ super: true })).toBe(true)
  })

  it('fuzz scramble and unscramble', () => {
    const dodecaminx = new Dodecaminx(9)

    // create a very deep scramble that is ensured to turn every face many
    // times, and rotate the entire puzzle many times across all axes
    const scramble = flatten(
      times(100).map(() => shuffle(dodecaminxFaces)),
    ).map((face) => {
      const t = dodecaminx.parseTurn(face)
      t.whole = sample([true, false])
      t.wide = t.whole ? false : sample([true, false])
      t.depth = t.whole ? 1 : sample([1, 2, 3, 4])
      t.rotation = sample([-2, -1, 1, 2])
      return t
    })

    // console.log(scramble.map(t => dodecaminx.stringifyTurn(t)).join('\n'))

    const unscramble = scramble
      .slice()
      .reverse()
      .map(turn => ({ ...turn, rotation: turn.rotation * -1 }))

    // apply all turns, and assert the puzzle is scrambled
    scramble.forEach(turn => dodecaminx.turn(turn))
    expect(dodecaminx.centers).not.toEqual(createDodecaminxCenters())

    // undo all turns, and assert the puzzle is solved
    unscramble.forEach(turn => dodecaminx.turn(turn))
    expect(dodecaminx.centers).toEqual(createDodecaminxCenters())
  })
})
