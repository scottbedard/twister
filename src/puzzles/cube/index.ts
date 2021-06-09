import { error } from '@/utils/function';
import { extract, inject, rotate } from '@/utils/matrix';
import { flattenBy, isUniform, last, sample, times, without } from '@/utils/array';
import { floor, max, rand } from '@/utils/number';
import { keys } from '@/utils/object';
import { lowercase } from '@/utils/string';
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
  constructor(options: Partial<CubeOptions>) {
    const {
      random = Math.random,
      size = 3,
    } = options;

    super({
      random,
      size,
    });

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

      // rotate opposite face
      if (turn.depth >= this.options.size) {
        const oppositeFace = cubeOpposites[turn.target];

        this.state[oppositeFace] = rotate(this.state[oppositeFace], -turn.rotation);
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
  generateScramble(depth: number = max(20, this.options.size ** 3)): string {
    const turns: CubeTurn[] = [];
    const { random, size } = this.options;

    for (let i = 0; i < depth; i += 1) {
      turns.push({
        depth: rand(1, floor(size / 2), random),
        rotation: sample([-1, 1, 2], random),
        target: sample(without(keys(cubeNet), last(turns)?.target), random),
        wide: sample([true, false], random),
      });
    }

    return turns.map((turn) => {
      const wideSuffix = turn.wide && turn.depth > 1 && size > 2 ? 'w' : '';
      const depthPrefix = turn.depth > (wideSuffix ? 2 : 1) ? turn.depth : '';
      const rotationSuffix = turn.rotation === -1 ? '-' : (turn.rotation === 2 ? '2' : '');

      return `${depthPrefix}${turn.target.toUpperCase()}${wideSuffix}${rotationSuffix}`;
    }).join(' ');
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
    const stickers = times(this.options.size ** 2);

    keys(this.state).forEach((face, value) => {
      this.state[face] = stickers.map(() => ({ meta: {}, value }));
    });
  }

  test(): boolean {
    const { u, l, f, r, b, d } = this.output();

    const isSolved = (face: unknown[]) => isUniform(face.filter((val) => val !== null));

    return isSolved(u)
      && isSolved(l)
      && isSolved(f)
      && isSolved(r)
      && isSolved(b)
      && isSolved(d);
  }
}
