import { CubeAxisLower, CubeFaceLower } from './types';

/**
 * Test if turn target is an axis.
 */
export function isCubeAxis(target: CubeFaceLower | CubeAxisLower): target is CubeAxisLower {
  return 'xyz'.includes(target);
}
