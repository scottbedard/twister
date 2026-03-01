import { expect, test } from 'vitest'
import { Cube } from '@/index'

test('test', () => {
  const cube = new Cube()
  expect(cube.test()).toBe('hello')
})
