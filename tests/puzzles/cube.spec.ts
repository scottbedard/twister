/* eslint-disable quote-props */
import { Cube } from '@/index';
import cubeNotation from './cube-notation';
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

  describe('parse', () => {
    const debug = '';
    const model = new Cube({ size: 3 });

    Object.entries(cubeNotation).forEach(([turn, expected]) => {
      if (!debug || debug === turn) {
        it(turn, () => {
          expect(model.parse(turn)).toEqual(expected);
        });
      } else {
        it.todo(turn);
      }
    });

    it('bad turn', () => {
      expect(() => model.parse('bad turn')).toThrow();
    });
  });

  describe('turn', () => {
    Object.entries(cubeTurns).forEach(([turn, expected]) => {
      const debug = '';
      const name = `3x3 - ${turn}`;

      if (!debug || debug === turn) {
        it(name, () => {
          const model = new Cube({ size: 3 });

          model.turn(turn);

          expect(model.output()).toEqual(expected);
        });
      } else {
        it.todo(name);
      }
    });
  });
});
