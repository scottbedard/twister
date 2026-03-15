import type { Range } from './types'

/**
 * Modulo N to a range of 0 to M-1
 */
export function mod<T extends number>(n: number, bound: T): Range<T> {
  return (n + bound) % bound as Range<T>
}
