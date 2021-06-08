/**
 * Cube axes.
 */
export type CubeAxis = 'X' | 'Y' | 'Z';

/**
 * Lowercase cube axis.
 */
export type CubeAxisLower = Lowercase<CubeAxis>;

/**
 * Cube faces.
 */
export type CubeFace = 'U' | 'L' | 'F' | 'R' | 'B' | 'D';

/**
 * Lowercase cube faces.
 */
export type CubeFaceLower = Lowercase<CubeFace>;

/**
 * Cube constructor options.
 */
export type CubeOptions = {
  size: number,
};

/**
 * Simplified cube state.
 */
export type CubeSimpleState = Record<CubeFaceLower, any>;

/**
 * Full cube state.
 */
export type CubeState = Record<CubeFaceLower, CubeSticker[]>;

/**
 * Sticker object.
 */
export type CubeSticker = {
  meta: Record<string, unknown>,
  value: any,
};

/**
 * A parsed cube turn.
 */
export type CubeTurn = {
  depth: number,
  rotation: -1 | 1 | 2,
  target: CubeFaceLower | CubeAxisLower,
  wide: boolean,
};
