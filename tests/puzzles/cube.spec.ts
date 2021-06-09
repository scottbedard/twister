/* eslint-disable quote-props */
import { Cube } from '@/index';
import cubeNotation from './cube-notation';
import cubeScrambles from './cube-scrambles';
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

  it('scramble', () => {
    const model = new Cube({ size: 3 });

    const scramble = model.scramble(10);

    expect(scramble.split(' ').length).toBe(10);

    expect(model.test()).toBe(false);
  });

  it('test', () => {
    const model = new Cube({ size: 3 });

    expect(model.test()).toBe(true);

    model.state.f[4].value = null;

    expect(model.test()).toBe(true);

    model.turn('R');

    expect(model.test()).toBe(false);

    model.turn('R-');

    expect(model.test()).toBe(true);
  });

  describe('turn', () => {
    // individual turns
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

    // scramble tests
    cubeScrambles.forEach((obj) => {
      const debug = 0;
      const name = `${obj.size}x${obj.size} - scramble`;

      if (!debug || debug === obj.size) {
        it(name, () => {
          const model = new Cube({ size: obj.size });

          model.turn(obj.scramble);

          expect(model.output()).toEqual(obj.result);
        });
      } else {
        it.skip(name);
      }
    });
  });
});
