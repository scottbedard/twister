/* eslint-disable */
import { Puzzle } from './puzzle';
import { flattenBy, times } from '@/utils/array';

/**
 * Cube types
 */
type Axis = 'X' | 'Y' | 'Z';

type Face = 'U' | 'L' | 'F' | 'R' | 'B' | 'D';

type Options = {
  size: number
};

type State = Record<Lowercase<Face>, Sticker[]>;

type SimpleState = Record<Lowercase<Face>, any>;

type Sticker = {
  meta: Record<string, unknown>,
  value: any,
}

type Turn = {
  face: Axis | Face,
  rotation: -1 | 1 | 2,
  wide: boolean,
};

/**
 * Cube
 */
export class Cube extends Puzzle<Options, State, SimpleState, Turn> {

  constructor(options: Options) {
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

  apply(state: SimpleState): void {
    throw 'not implemented';
  }

  execute(algorithm: string): void {
    throw 'not implemented';
  }

  generateScramble(depth: number): string {
    throw 'not implemented';
  }

  output(): SimpleState {
    const simplify = (face: Lowercase<Face>) => flattenBy(this.state[face], 'value');

    return {
      u: simplify('u'),
      l: simplify('l'),
      f: simplify('f'),
      r: simplify('r'),
      b: simplify('b'),
      d: simplify('d'),
    }
  }

  parse(turn: string): Turn {
    throw 'not implemented';
  }

  reset() {
    const stickers = this.options.size ** 2;

    (['u', 'l', 'f', 'r', 'b', 'd'] as Lowercase<Face>[]).forEach((face, value) => {
      this.state[face] = times(stickers).map(() => ({ meta: {}, value }));
    });
  }

  test(): boolean {
    throw 'not implemented';
  }
}
