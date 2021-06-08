/* eslint-disable quote-props */
import { Cube } from '@/index';
import cubeTurns from './cube-turns';

// standard color scheme with yellow on top and blue in front
// yellow, orange, blue, red, green, white
const [y, o, b, r, g, w] = [0, 1, 2, 3, 4, 5];

describe('Cube', () => {
  it('output', () => {
    const model = new Cube({ size: 2 });

    expect(model.output()).toEqual({
      u: [y, y, y, y],
      l: [o, o, o, o],
      f: [b, b, b, b],
      r: [r, r, r, r],
      b: [g, g, g, g],
      d: [w, w, w, w],
    });
  });

  it('parse', () => {
    const model = new Cube({ size: 2 });

    const turns = {
      'R': {
        depth: 1,
        rotation: 1,
        target: 'r',
        wide: false,
      },
      'R\'': {
        depth: 1,
        rotation: -1,
        target: 'r',
        wide: false,
      },
      '2R': {
        depth: 2,
        rotation: 1,
        target: 'r',
        wide: false,
      },
      'Rw': {
        depth: 2,
        rotation: 1,
        target: 'r',
        wide: true,
      },
      '3Rw2': {
        depth: 3,
        rotation: 2,
        target: 'r',
        wide: true,
      },
    };

    (Object.keys(turns) as (keyof typeof turns)[]).forEach((key) => {
      expect(model.parse(key)).toEqual(turns[key]);
    });

    expect(() => model.parse('bad turn')).toThrow();
  });

  describe('turns', () => {
    (Object.keys(cubeTurns) as (keyof typeof cubeTurns)[]).forEach((turn) => {
      const debug = ''; // <- use this to debug a specific turn

      if (!debug || debug === turn) {
        it(`3x3 - ${turn}`, () => {
          const model = new Cube({ size: 3 });

          model.turn(turn);

          expect(model.output()).toEqual(cubeTurns[turn]);
        });
      }
    });
  });
});
