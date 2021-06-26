/**
 * Cube axes
 */
export type CubeAxis = 'X' | 'Y' | 'Z';

/**
 * Lowercase cube axis
 */
export type CubeAxisLower = Lowercase<CubeAxis>;

/**
 * Cube faces.
 */
export type CubeFace = 'U' | 'L' | 'F' | 'R' | 'B' | 'D';

/**
 * Lowercase cube faces
 */
export type CubeFaceLower = Lowercase<CubeFace>;

/**
 * Cube options
 */
export type CubeOptions = {
  random: () => number,
  size: number,
};

/**
 * Cube state
 */
export type CubeState = Record<CubeFaceLower, CubeSticker[]>;

/**
 * Simplified cube state
 */
export type CubeSimpleState = Record<CubeFaceLower, unknown[]>;

/**
 * Cube sticker
 */
export type CubeSticker = {
  meta: Record<string, unknown>,
  value: unknown,
};

/**
 * Parsed cube turn
 */
export type CubeTurn = {
  depth: number,
  rotation: -1 | 1 | 2,
  target: CubeFaceLower | CubeAxisLower,
  wide: boolean,
};
