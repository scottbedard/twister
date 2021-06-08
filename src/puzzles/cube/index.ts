import { error } from '@/utils/function';
import { extract, inject, rotate } from '@/utils/matrix';
import { flattenBy, times } from '@/utils/array';
import { lowercase } from '@/utils/string';
import { max } from '@/utils/number';
import { Puzzle } from '@/puzzles/puzzle';

import {
  cubeNet,
  cubeOpposites,
} from './constants';

import {
  CubeAxis,
  CubeFace,
  CubeFaceLower,
  CubeOptions,
  CubeSimpleState,
  CubeState,
  CubeTurn,
} from './types';

import { isCubeAxis } from './utils';

/**
 * Cube
 */
export class Cube extends Puzzle<CubeOptions, CubeState, CubeSimpleState, CubeTurn> {
  constructor(options: CubeOptions) {
    super(options);

    this.state = {
      u: [],
      l: [],
      f: [],
      r: [],
      b: [],
      d: [],
    };

    this.reset();
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  apply(state: CubeSimpleState): void {
    error('not implemented');
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  execute(turn: CubeTurn): void {
    if (isCubeAxis(turn.target)) {
      // rotate entire puzzle
    } else {
      // rotate target face
      if (turn.depth === 1 || turn.wide) {
        this.state[turn.target] = rotate(this.state[turn.target], turn.rotation);
      }

      // rotate opposite face in opposite direction
      if (turn.depth >= this.options.size) {
        this.state[cubeOpposites[turn.target]] = rotate(this.state[turn.target], -turn.rotation);
      }

      // rotate slices
      const relatedFaces = cubeNet[turn.target];

      for (let i = turn.wide ? 0 : turn.depth - 1; i < turn.depth; i += 1) {
        relatedFaces.map((source, index) => {
          // extract slices from adjacent face
          const [face, angle] = relatedFaces[index];
          return extract(this.state[face], angle, i);
        }).forEach((slice, index) => {
          // inject slices into target faces
          const [relatedFace, angle] = relatedFaces[(index + 4 + turn.rotation) % 4];
          this.state[relatedFace] = inject(slice, this.state[relatedFace], angle, i);
        });
      }
    }
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  generateScramble(depth: number): string {
    return '';
  }

  output(): CubeSimpleState {
    const simplify = (face: CubeFaceLower) => flattenBy(this.state[face], 'value');

    return {
      u: simplify('u'),
      l: simplify('l'),
      f: simplify('f'),
      r: simplify('r'),
      b: simplify('b'),
      d: simplify('d'),
    };
  }

  parse(turn: string): CubeTurn {
    const parts = turn.match(/^(\d)*([ulfrbdxyzULFRBDXYZ]){1}(w)*(['-2])*$/);

    if (!parts) {
      error(`Invalid turn: ${turn}`);
    }

    const depth = parts[1] ? parseInt(parts[1], 10) : 1;
    const target = lowercase(<CubeFace | CubeAxis> parts[2]);
    const wide = !!parts[3];
    const rotation = "-'".includes(parts[4]) ? -1 : parts[4] === '2' ? 2 : 1;

    return {
      depth: wide ? max(2, depth) : depth,
      target,
      rotation,
      wide,
    };
  }

  reset() {
    const stickers = this.options.size ** 2;

    (['u', 'l', 'f', 'r', 'b', 'd'] as CubeFaceLower[]).forEach((face, value) => {
      this.state[face] = times(stickers).map(() => ({ meta: {}, value }));
    });
  }

  test(): boolean {
    return false;
  }
}
