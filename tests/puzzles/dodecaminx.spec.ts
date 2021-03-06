import { Dodecaminx } from '@/index';
import dodecaminxNotation from './dodecaminx-notation';
import dodecaminxTurns from './dodecaminx-turns';

describe('Dodecaminx', () => {
  it('apply', () => {
    const model = new Dodecaminx({ size: 3 });

    model.apply({
      f: [
        [[-1], [-2], [-3], [-4], [-5]],
        [[-6], [-7], [-8], [-9], [-10]],
        -11,
      ],
    });

    expect(model.state.f[0][0][0].value).toBe(-1);
    expect(model.state.f[0][1][0].value).toBe(-2);
    expect(model.state.f[0][2][0].value).toBe(-3);
    expect(model.state.f[0][3][0].value).toBe(-4);
    expect(model.state.f[0][4][0].value).toBe(-5);
    expect(model.state.f[1][0][0].value).toBe(-6);
    expect(model.state.f[1][1][0].value).toBe(-7);
    expect(model.state.f[1][2][0].value).toBe(-8);
    expect(model.state.f[1][3][0].value).toBe(-9);
    expect(model.state.f[1][4][0].value).toBe(-10);
    expect(model.state.f[2].value).toBe(-11);
  });

  it('generateScramble', () => {
    const model = new Dodecaminx({
      random: () => 0.5,
    });

    const turn = model.generateScramble(1);

    expect(model.generateScramble(1, turn)).not.toBe(turn);

    const scramble = model.generateScramble(5);

    expect(scramble.split(' ').length).toBe(5);
  });

  it('output', () => {
    const model = new Dodecaminx({ size: 3 });

    expect(model.output()).toEqual({
      b: [
        [[0], [0], [0], [0], [0]],
        [[0], [0], [0], [0], [0]],
        0,
      ],
      bl: [
        [[1], [1], [1], [1], [1]],
        [[1], [1], [1], [1], [1]],
        1,
      ],
      br: [
        [[2], [2], [2], [2], [2]],
        [[2], [2], [2], [2], [2]],
        2,
      ],
      d: [
        [[3], [3], [3], [3], [3]],
        [[3], [3], [3], [3], [3]],
        3,
      ],
      dbl: [
        [[4], [4], [4], [4], [4]],
        [[4], [4], [4], [4], [4]],
        4,
      ],
      dbr: [
        [[5], [5], [5], [5], [5]],
        [[5], [5], [5], [5], [5]],
        5,
      ],
      dl: [
        [[6], [6], [6], [6], [6]],
        [[6], [6], [6], [6], [6]],
        6,
      ],
      dr: [
        [[7], [7], [7], [7], [7]],
        [[7], [7], [7], [7], [7]],
        7,
      ],
      f: [
        [[8], [8], [8], [8], [8]],
        [[8], [8], [8], [8], [8]],
        8,
      ],
      l: [
        [[9], [9], [9], [9], [9]],
        [[9], [9], [9], [9], [9]],
        9,
      ],
      r: [
        [[10], [10], [10], [10], [10]],
        [[10], [10], [10], [10], [10]],
        10,
      ],
      u: [
        [[11], [11], [11], [11], [11]],
        [[11], [11], [11], [11], [11]],
        11,
      ],
    });
  });

  describe('parse', () => {
    const debug = '';
    const model = new Dodecaminx({ size: 3 });

    Object.entries(dodecaminxNotation).forEach(([turn, expected]) => {
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

  describe('stickers', () => {
    it('u', () => {
      const model = new Dodecaminx({ size: 3 });
      const stickers = model.stickers('u');

      expect(stickers.length).toBe(11 * 12);
    });

    it('U', () => {
      const model = new Dodecaminx({ size: 3 });
      const stickers = model.stickers('U');

      expect(stickers.length).toBe(11 + (3 * 5));
      expect(stickers).toContain(model.state.u[0][0][0]);
      expect(stickers).toContain(model.state.u[0][1][0]);
      expect(stickers).toContain(model.state.u[0][2][0]);
      expect(stickers).toContain(model.state.u[0][3][0]);
      expect(stickers).toContain(model.state.u[0][4][0]);
      expect(stickers).toContain(model.state.u[1][0][0]);
      expect(stickers).toContain(model.state.u[1][1][0]);
      expect(stickers).toContain(model.state.u[1][2][0]);
      expect(stickers).toContain(model.state.u[1][3][0]);
      expect(stickers).toContain(model.state.u[1][4][0]);
      expect(stickers).toContain(model.state.u[2]);
      expect(stickers).toContain(model.state.l[0][0][0]);
      expect(stickers).toContain(model.state.l[1][0][0]);
      expect(stickers).toContain(model.state.l[0][1][0]);
      expect(stickers).toContain(model.state.bl[0][1][0]);
      expect(stickers).toContain(model.state.bl[1][1][0]);
      expect(stickers).toContain(model.state.bl[0][2][0]);
      expect(stickers).toContain(model.state.br[0][2][0]);
      expect(stickers).toContain(model.state.br[1][2][0]);
      expect(stickers).toContain(model.state.br[0][3][0]);
      expect(stickers).toContain(model.state.r[0][3][0]);
      expect(stickers).toContain(model.state.r[1][3][0]);
      expect(stickers).toContain(model.state.r[0][4][0]);
      expect(stickers).toContain(model.state.f[0][4][0]);
      expect(stickers).toContain(model.state.f[1][4][0]);
      expect(stickers).toContain(model.state.f[0][0][0]);
    });
  });

  it('test', () => {
    const model = new Dodecaminx({ size: 3 });

    expect(model.test()).toBe(true);

    model.state.f[0][0][0].value = null;

    expect(model.test()).toBe(true);

    model.turn('R');

    expect(model.test()).toBe(false);

    model.turn('R-');

    expect(model.test()).toBe(true);
  });

  describe('turn', () => {
    // individual turns
    dodecaminxTurns.forEach((obj) => {
      const name = `${obj.size} - ${obj.turn}`;

      const fn = () => {
        const model = new Dodecaminx({ size: obj.size });

        model.turn(obj.turn);

        expect(model.output()).toEqual(obj.result);
      };

      if (obj.only) {
        it.only(name, fn);
      } else {
        it(name, fn);
      }
    });
  });
});
