/**
 * Modulo N to a range of 0 to M-1
 */
export function mod(n: number, m: number): number {
  return (n + m) % m
}
