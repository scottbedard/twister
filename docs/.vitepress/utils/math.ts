export type Point = [number, number]

export type Line = [Point, Point]

/**
 * Linear interpolation between two 2D points.
 */
export function bilerp(a: Point, b: Point, t: number): Point {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)]
}

/**
 * Centroid of a polygon defined by a path of 2D points.
 * Works whether the path is explicitly closed or not.
 */
export function centroid(points: Point[]) {
  if (!Array.isArray(points) || points.length === 0) return null

  // 1. filter invalid coordinates
  const pts = []
  for (const p of points) {
    if (
      p
      && Number.isFinite(p[0])
      && Number.isFinite(p[1])
    ) {
      pts.push([+p[0], +p[1]])
    }
  }

  const n = pts.length
  if (n === 0) return null

  // 2. remove duplicate closing point
  if (
    n > 1
    && pts[0][0] === pts[n - 1][0]
    && pts[0][1] === pts[n - 1][1]
  ) {
    pts.pop()
  }

  const m = pts.length

  // 3. small cases
  if (m === 1) return pts[0]
  if (m === 2) {
    return [
      (pts[0][0] + pts[1][0]) / 2,
      (pts[0][1] + pts[1][1]) / 2,
    ]
  }

  // 4. polygon centroid
  let area = 0
  let cx = 0
  let cy = 0

  for (let i = 0; i < m; i++) {
    const [x0, y0] = pts[i]
    const [x1, y1] = pts[(i + 1) % m]

    const cross = x0 * y1 - x1 * y0

    area += cross
    cx += (x0 + x1) * cross
    cy += (y0 + y1) * cross
  }

  area *= 0.5

  if (Math.abs(area) > 1e-12) {
    return [cx / (6 * area), cy / (6 * area)]
  }

  // 5. fallback: bounding box center
  let minX = Infinity, minY = Infinity
  let maxX = -Infinity, maxY = -Infinity

  for (const [x, y] of pts) {
    if (x < minX) minX = x
    if (y < minY) minY = y
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
  }

  if (minX !== maxX || minY !== maxY) {
    return [(minX + maxX) / 2, (minY + maxY) / 2]
  }

  // 6. final fallback: average of vertices
  let sx = 0, sy = 0
  for (const [x, y] of pts) {
    sx += x
    sy += y
  }

  return [sx / m, sy / m]
}

/**
 * Linear interpolation between two numbers.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/**
 * Distance between two 2D points.
 */
export function measure(a: Point, b: Point): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1])
}

/**
 * Point at given angle (degrees) and distance from origin. Angle 0 = right, counterclockwise positive.
 */
export function angleFrom(origin: Point, angleDeg: number, distance: number): Point {
  const rad = (angleDeg * Math.PI) / 180
  return [origin[0] + distance * Math.cos(rad), origin[1] + distance * Math.sin(rad)]
}

/**
 * Line-line intersection. Returns the intersection point or null if parallel.
 */
export function intersect([a, b]: Line, [c, d]: Line): Point | null {
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
export function toSvgCoords(v: Point): Point {
  return [v[0], -v[1]]
}

/**
 * Convert array of math vectors to SVG path coordinates.
 */
export function toPathCoords(arr: Point[]): Point[] {
  return arr.map(toSvgCoords)
}
