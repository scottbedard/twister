import { Cube } from '@/index'
import { describe, expect, test } from 'vitest'
import { int } from '@/utils'

describe('cube solved', () => {
  test('fuzz scramble and unscramble', () => {
    const cube = new Cube(5)

    const scramble = cube.generateScramble(int(2, 10))
    cube.turn(scramble)

    expect(cube.solved()).toBe(false)
    expect(cube.solved({ super: false })).toBe(false)

    scramble.split(' ')
      .reverse()
      .map((notation) => {
        const turn = cube.parseTurn(notation)
        turn.rotation *= -1
        return turn
      })
      .forEach(turn => cube.turn(turn))

    expect(cube.solved()).toBe(true)
    expect(cube.solved({ super: true })).toBe(true)
  })

  test('3x3 super cube', () => {
    const cube = new Cube(3).turn(`
      D2 R- L B2 U2 F- U- D2 R U- L2 U2 R B U2 D B2 U- F2 R2 B- U- B- D2 B- R- L2
      F- U- F L2 B- F2 R- L2 F- R- U- F2 D2 U- R2 D2 R- L B D2 U- R2 D U2 R L- U-
    `)

    expect(cube.state).toEqual({
      b: [
        {
          face: 'l',
          index: 0,
          rotation: 0,
        },
        {
          face: 'f',
          index: 7,
          rotation: 2,
        },
        {
          face: 'b',
          index: 6,
          rotation: 2,
        },
        {
          face: 'r',
          index: 1,
          rotation: 3,
        },
        {
          face: 'b',
          index: 4,
          rotation: 2,
        },
        {
          face: 'b',
          index: 7,
          rotation: 3,
        },
        {
          face: 'f',
          index: 0,
          rotation: 3,
        },
        {
          face: 'l',
          index: 5,
          rotation: 1,
        },
        {
          face: 'd',
          index: 0,
          rotation: 2,
        },
      ],
      d: [
        {
          face: 'b',
          index: 8,
          rotation: 2,
        },
        {
          face: 'd',
          index: 5,
          rotation: 3,
        },
        {
          face: 'u',
          index: 2,
          rotation: 0,
        },
        {
          face: 'l',
          index: 3,
          rotation: 0,
        },
        {
          face: 'd',
          index: 4,
          rotation: 2,
        },
        {
          face: 'l',
          index: 1,
          rotation: 1,
        },
        {
          face: 'f',
          index: 6,
          rotation: 0,
        },
        {
          face: 'f',
          index: 3,
          rotation: 3,
        },
        {
          face: 'l',
          index: 2,
          rotation: 1,
        },
      ],
      f: [
        {
          face: 'u',
          index: 8,
          rotation: 2,
        },
        {
          face: 'u',
          index: 7,
          rotation: 2,
        },
        {
          face: 'f',
          index: 8,
          rotation: 3,
        },
        {
          face: 'l',
          index: 7,
          rotation: 1,
        },
        {
          face: 'f',
          index: 4,
          rotation: 0,
        },
        {
          face: 'b',
          index: 1,
          rotation: 1,
        },
        {
          face: 'd',
          index: 6,
          rotation: 0,
        },
        {
          face: 'r',
          index: 7,
          rotation: 0,
        },
        {
          face: 'b',
          index: 0,
          rotation: 2,
        },
      ],
      l: [
        {
          face: 'r',
          index: 8,
          rotation: 2,
        },
        {
          face: 'r',
          index: 3,
          rotation: 1,
        },
        {
          face: 'r',
          index: 0,
          rotation: 1,
        },
        {
          face: 'd',
          index: 7,
          rotation: 1,
        },
        {
          face: 'l',
          index: 4,
          rotation: 1,
        },
        {
          face: 'd',
          index: 3,
          rotation: 2,
        },
        {
          face: 'l',
          index: 8,
          rotation: 1,
        },
        {
          face: 'b',
          index: 5,
          rotation: 1,
        },
        {
          face: 'l',
          index: 6,
          rotation: 3,
        },
      ],
      r: [
        {
          face: 'd',
          index: 2,
          rotation: 3,
        },
        {
          face: 'b',
          index: 3,
          rotation: 1,
        },
        {
          face: 'b',
          index: 2,
          rotation: 0,
        },
        {
          face: 'u',
          index: 1,
          rotation: 3,
        },
        {
          face: 'r',
          index: 4,
          rotation: 0,
        },
        {
          face: 'u',
          index: 5,
          rotation: 0,
        },
        {
          face: 'r',
          index: 2,
          rotation: 2,
        },
        {
          face: 'u',
          index: 3,
          rotation: 3,
        },
        {
          face: 'u',
          index: 6,
          rotation: 3,
        },
      ],
      u: [
        {
          face: 'd',
          index: 8,
          rotation: 2,
        },
        {
          face: 'd',
          index: 1,
          rotation: 0,
        },
        {
          face: 'u',
          index: 0,
          rotation: 1,
        },
        {
          face: 'f',
          index: 5,
          rotation: 2,
        },
        {
          face: 'u',
          index: 4,
          rotation: 3,
        },
        {
          face: 'r',
          index: 5,
          rotation: 0,
        },
        {
          face: 'f',
          index: 2,
          rotation: 2,
        },
        {
          face: 'f',
          index: 1,
          rotation: 2,
        },
        {
          face: 'r',
          index: 6,
          rotation: 3,
        },
      ],
    })
  })
})
