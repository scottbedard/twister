import type { Range } from './types'

export type Vector = [number, number]
export type Line = [Vector, Vector]

/**
 * Modulo N to a range of 0 to M-1
 */
export function mod<T extends number>(n: number, bound: T): Range<T> {
  return (n + bound) % bound as Range<T>
}

/**
 * Linear interpolation between two 2D points.
 */
export function bilerp(a: Vector, b: Vector, t: number): Vector {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
}

/**
 * Distance between two 2D points.
 */
export function measure(a: Vector, b: Vector): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1])
}

/**
 * Point at given angle (degrees) and distance from origin. Angle 0 = right, counterclockwise positive.
 */
export function angleFrom(origin: Vector, angleDeg: number, distance: number): Vector {
  const rad = (angleDeg * Math.PI) / 180
  return [origin[0] + distance * Math.cos(rad), origin[1] + distance * Math.sin(rad)]
}

/**
 * Line-line intersection. Returns the intersection point or null if parallel.
 */
export function intersect([a, b]: Line, [c, d]: Line): Vector | null {
  const dx1 = b[0] - a[0]
  const dy1 = b[1] - a[1]
  const dx2 = d[0] - c[0]
  const dy2 = d[1] - c[1]
  const denom = dx1 * dy2 - dy1 * dx2
  if (Math.abs(denom) < 1e-10) return null
  const t = ((c[0] - a[0]) * dy2 - (c[1] - a[1]) * dx2) / denom
  return [a[0] + t * dx1, a[1] + t * dy1]
}

/**
 * Convert math coords (y-up) to SVG coords (y-down) for path/position.
 */
export function toSvgCoords(v: Vector): Vector {
  return [v[0], -v[1]]
}

/**
 * Convert array of math vectors to SVG path coordinates.
 */
export function toPathCoords(arr: Vector[]): Vector[] {
  return arr.map(toSvgCoords)
}
