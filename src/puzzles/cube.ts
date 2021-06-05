import { error } from '@/utils/function';
import { flattenBy, times } from '@/utils/array';
import { max } from '@/utils/number';
import { Puzzle } from './puzzle';

/**
 * Cube types
 */
type Axis = 'X' | 'Y' | 'Z';

type Face = 'U' | 'L' | 'F' | 'R' | 'B' | 'D';

type Options = {
  size: number,
};

type State = Record<Lowercase<Face>, Sticker[]>;

type SimpleState = Record<Lowercase<Face>, any>;

type Sticker = {
  meta: Record<string, unknown>,
  value: any,
};

type Turn = {
  depth: number,
  rotation: -1 | 1 | 2,
  target: Axis | Face,
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

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  apply(state: SimpleState): void {
    error('not implemented');
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  execute(algorithm: string): void {
    error('not implemented');
  }

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  generateScramble(depth: number): string {
    return '';
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
    };
  }

  parse(turn: string): Turn {
    const parts = turn.match(/^(\d)*([ulfrbdxyzULFRBDXYZ]){1}(w)*(['-2])*$/);

    if (!parts) {
      error(`Invalid turn: ${turn}`);
    }

    const depth = parts[1] ? parseInt(parts[1], 10) : 1;
    const target = <Face | Axis>parts[2].toLowerCase();
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

    (['u', 'l', 'f', 'r', 'b', 'd'] as Lowercase<Face>[]).forEach((face, value) => {
      this.state[face] = times(stickers).map(() => ({ meta: {}, value }));
    });
  }

  test(): boolean {
    return false;
  }
}
