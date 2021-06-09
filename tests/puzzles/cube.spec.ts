import { Cube } from '@/index';
import cubeNotation from './cube-notation';
import cubeScrambles from './cube-scrambles';
import cubeTurns from './cube-turns';

describe('Cube', () => {
  it('apply', () => {
    const model = new Cube({ size: 2 });

    model.apply({
      u: ['u0', 'u1', 'u2', 'u3'],
      l: ['l0', 'l1', 'l2', 'l3'],
      f: ['f0', 'f1', 'f2', 'f3'],
      r: ['r0', 'r1', 'r2', 'r3'],
      b: ['b0', 'b1', 'b2', 'b3'],
      d: ['d0', 'd1', 'd2', 'd3'],
    });

    expect(model.output()).toEqual({
      u: ['u0', 'u1', 'u2', 'u3'],
      l: ['l0', 'l1', 'l2', 'l3'],
      f: ['f0', 'f1', 'f2', 'f3'],
      r: ['r0', 'r1', 'r2', 'r3'],
      b: ['b0', 'b1', 'b2', 'b3'],
      d: ['d0', 'd1', 'd2', 'd3'],
    });
  });

  it('output', () => {
    const model = new Cube({ size: 2 });

    expect(model.output()).toEqual({
      u: [0, 0, 0, 0],
      l: [1, 1, 1, 1],
      f: [2, 2, 2, 2],
      r: [3, 3, 3, 3],
      b: [4, 4, 4, 4],
      d: [5, 5, 5, 5],
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
