import { Cube } from '../src/index';
import { CubeFace, CubeSticker, CubeTurn, SimplifiedCubeState } from '../src/cube/cube';
import { getOppositeFace, parseTurn, stringifyTurn } from '../src/cube/helpers';

type Data = {
}

describe('cube', () => {
  const w = 0, o = 1, g = 2, r = 3, b = 4, y = 5;

  const faceValues = (face: CubeSticker<Data>[]) => face.map(s => s.value);

  const simplifiedState = (cube: Cube<Data>): SimplifiedCubeState => ({
    u: faceValues(cube.state.u),
    l: faceValues(cube.state.l),
    f: faceValues(cube.state.f),
    r: faceValues(cube.state.r),
    b: faceValues(cube.state.b),
    d: faceValues(cube.state.d),
  });

  it('throws an error if the cube size is not an integer', () => {
    expect(() => new Cube({ size: 3.5 })).toThrow();
  });

  it('throws an error if the size is less than two', () => {
    expect(() => new Cube({ size: 1 })).toThrow();
  });

  it('sets the initial state', () => {
    const cube = new Cube({ size: 3 });
    const { u, l, f, r, b, d } = cube.state;

    expect(faceValues(u)).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    expect(faceValues(l)).toEqual([1, 1, 1, 1, 1, 1, 1, 1, 1]);
    expect(faceValues(f)).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2]);
    expect(faceValues(r)).toEqual([3, 3, 3, 3, 3, 3, 3, 3, 3]);
    expect(faceValues(b)).toEqual([4, 4, 4, 4, 4, 4, 4, 4, 4]);
    expect(faceValues(d)).toEqual([5, 5, 5, 5, 5, 5, 5, 5, 5]);
  });

  describe('helpers', () => {
    it('getOppositeFace', () => {
      const cube = new Cube({ size: 2 });

      const faces = {
        u: 'd',
        l: 'r',
        f: 'b',
        r: 'l',
        b: 'f',
        d: 'u',
      };

      Object.keys(faces).forEach((face: CubeFace) => {
        const turn = cube.parseTurn(face);
        expect(getOppositeFace(turn)).toBe(faces[face]);
      });
    });

    it('stringifyTurn', () => {
      expect(stringifyTurn(parseTurn('F'))).toBe('F');
      expect(stringifyTurn(parseTurn('F-'))).toBe('F-');
      expect(stringifyTurn(parseTurn('F2'))).toBe('F2');
      expect(stringifyTurn(parseTurn('Fw'))).toBe('Fw');
      expect(stringifyTurn(parseTurn('2F'))).toBe('2F');
      expect(stringifyTurn(parseTurn('3F'))).toBe('3F');
      expect(stringifyTurn(parseTurn('3Fw'))).toBe('3Fw');
      expect(stringifyTurn(parseTurn('3Fw-'))).toBe('3Fw-');
      expect(stringifyTurn(parseTurn('3Fw2'))).toBe('3Fw2');
    });
  });

  describe('methods', () => {
    it('applyState', () => {
      const cube = new Cube({ size: 2 });

      cube.applyState({
        u: [0, 1, 2, 3],
        l: [1, 2, 3, 4],
        f: [2, 3, 4, 5],
        r: [3, 4, 5, 0],
        b: [4, 5, 0, 1],
        d: [5, 0, 1, 2],
      });

      expect(cube.state.u.map(o => o.value)).toEqual([0, 1, 2, 3]);
      expect(cube.state.l.map(o => o.value)).toEqual([1, 2, 3, 4]);
      expect(cube.state.f.map(o => o.value)).toEqual([2, 3, 4, 5]);
      expect(cube.state.r.map(o => o.value)).toEqual([3, 4, 5, 0]);
      expect(cube.state.b.map(o => o.value)).toEqual([4, 5, 0, 1]);
      expect(cube.state.d.map(o => o.value)).toEqual([5, 0, 1, 2]);
    });

    it('isSolved', () => {
      const cube = new Cube({ size: 2 });

      expect(cube.isSolved()).toBe(true);

      cube.turn('R');

      expect(cube.isSolved()).toBe(false);
    });

    it('scramble', () => {
      const cube = new Cube({ size: 2 });

      cube.scramble();

      expect(cube.isSolved()).toBe(false);
    });

    it('toState', () => {
      const cube = new Cube({ size: 2 });
      
      expect(cube.toState()).toEqual({
        u: [ 0, 0, 0, 0 ],
        l: [ 1, 1, 1, 1 ],
        f: [ 2, 2, 2, 2 ],
        r: [ 3, 3, 3, 3 ],
        b: [ 4, 4, 4, 4 ],
        d: [ 5, 5, 5, 5 ],
      });
    });
  });

  describe('notation', () => {
    it('throws an exception for invalid turns', () => {
      expect(() => parseTurn('invalid turn')).toThrow();
    });

    describe('turn parsing', () => {
      const turns: { [key: string]: CubeTurn } = {
        // standard
        'U': { depth: 1, rotation: 1, target: 'u', wide: false },
        'U2': { depth: 1, rotation: 2, target: 'u', wide: false },
        'U-': { depth: 1, rotation: -1, target: 'u', wide: false },
        'U\'': { depth: 1, rotation: -1, target: 'u', wide: false },

        // deep
        '2L': { depth: 2, rotation: 1, target: 'l', wide: false },
        '2L2': { depth: 2, rotation: 2, target: 'l', wide: false },
        '2L-': { depth: 2, rotation: -1, target: 'l', wide: false },
        '2L\'': { depth: 2, rotation: -1, target: 'l', wide: false },

        // wide
        'Fw': { depth: 2, rotation: 1, target: 'f', wide: true },
        'Fw2': { depth: 2, rotation: 2, target: 'f', wide: true },
        'Fw-': { depth: 2, rotation: -1, target: 'f', wide: true },
        'Fw\'': { depth: 2, rotation: -1, target: 'f', wide: true },
        '3Fw': { depth: 3, rotation: 1, target: 'f', wide: true },
      };
        
      Object.keys(turns).forEach((turn) => {
        const result = turns[turn];

        it(turn, () => expect(parseTurn(turn)).toEqual(result));
      });
    });
  });

  describe('turns', () => {
    const turns: { [turn: string]: { [face: string]: number[] }} = {
      'U': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          g, g, g,
          o, o, o,
          o, o, o,
        ],
        f: [
          r, r, r,
          g, g, g,
          g, g, g,
        ],
        r: [
          b, b, b,
          r, r, r,
          r, r, r,
        ],
        b: [
          o, o, o,
          b, b, b,
          b, b, b,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      'U-': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          b, b, b,
          o, o, o,
          o, o, o,
        ],
        f: [
          o, o, o,
          g, g, g,
          g, g, g,
        ],
        r: [
          g, g, g,
          r, r, r,
          r, r, r,
        ],
        b: [
          r, r, r,
          b, b, b,
          b, b, b,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      'U2': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          r, r, r,
          o, o, o,
          o, o, o,
        ],
        f: [
          b, b, b,
          g, g, g,
          g, g, g,
        ],
        r: [
          o, o, o,
          r, r, r,
          r, r, r,
        ],
        b: [
          g, g, g,
          b, b, b,
          b, b, b,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      '3U': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          o, o, o,
          o, o, o,
          g, g, g,
        ],
        f: [
          g, g, g,
          g, g, g,
          r, r, r,
        ],
        r: [
          r, r, r,
          r, r, r,
          b, b, b,
        ],
        b: [
          b, b, b,
          b, b, b,
          o, o, o,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      '3U-': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          o, o, o,
          o, o, o,
          b, b, b,
        ],
        f: [
          g, g, g,
          g, g, g,
          o, o, o,
        ],
        r: [
          r, r, r,
          r, r, r,
          g, g, g,
        ],
        b: [
          b, b, b,
          b, b, b,
          r, r, r,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      '3U2': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          o, o, o,
          o, o, o,
          r, r, r,
        ],
        f: [
          g, g, g,
          g, g, g,
          b, b, b,
        ],
        r: [
          r, r, r,
          r, r, r,
          o, o, o,
        ],
        b: [
          b, b, b,
          b, b, b,
          g, g, g,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      'L': {
        u: [
          b, w, w,
          b, w, w,
          b, w, w,
        ],
        l: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        f: [
          w, g, g,
          w, g, g,
          w, g, g,
        ],
        r: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        b: [
          b, b, y,
          b, b, y,
          b, b, y,
        ],
        d: [
          g, y, y,
          g, y, y,
          g, y, y,
        ],
      },
      'L-': {
        u: [
          g, w, w,
          g, w, w,
          g, w, w,
        ],
        l: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        f: [
          y, g, g,
          y, g, g,
          y, g, g,
        ],
        r: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        b: [
          b, b, w,
          b, b, w,
          b, b, w,
        ],
        d: [
          b, y, y,
          b, y, y,
          b, y, y,
        ],
      },
      'L2': {
        u: [
          y, w, w,
          y, w, w,
          y, w, w,
        ],
        l: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        f: [
          b, g, g,
          b, g, g,
          b, g, g,
        ],
        r: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        b: [
          b, b, g,
          b, b, g,
          b, b, g,
        ],
        d: [
          w, y, y,
          w, y, y,
          w, y, y,
        ],
      },
      'F': {
        u: [
          w, w, w,
          w, w, w,
          o, o, o,
        ],
        l: [
          o, o, y,
          o, o, y,
          o, o, y,
        ],
        f: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        r: [
          w, r, r,
          w, r, r,
          w, r, r,
        ],
        b: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        d: [
          r, r, r,
          y, y, y,
          y, y, y,
        ],
      },
      'F-': {
        u: [
          w, w, w,
          w, w, w,
          r, r, r,
        ],
        l: [
          o, o, w,
          o, o, w,
          o, o, w,
        ],
        f: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        r: [
          y, r, r,
          y, r, r,
          y, r, r,
        ],
        b: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        d: [
          o, o, o,
          y, y, y,
          y, y, y,
        ],
      },
      'F2': {
        u: [
          w, w, w,
          w, w, w,
          y, y, y,
        ],
        l: [
          o, o, r,
          o, o, r,
          o, o, r,
        ],
        f: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        r: [
          o, r, r,
          o, r, r,
          o, r, r,
        ],
        b: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        d: [
          w, w, w,
          y, y, y,
          y, y, y,
        ],
      },
      'R': {
        u: [
          w, w, g,
          w, w, g,
          w, w, g,
        ],
        l: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        f: [
          g, g, y,
          g, g, y,
          g, g, y,
        ],
        r: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        b: [
          w, b, b,
          w, b, b,
          w, b, b,
        ],
        d: [
          y, y, b,
          y, y, b,
          y, y, b,
        ],
      },
      'R-': {
        u: [
          w, w, b,
          w, w, b,
          w, w, b,
        ],
        l: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        f: [
          g, g, w,
          g, g, w,
          g, g, w,
        ],
        r: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        b: [
          y, b, b,
          y, b, b,
          y, b, b,
        ],
        d: [
          y, y, g,
          y, y, g,
          y, y, g,
        ],
      },
      'R2': {
        u: [
          w, w, y,
          w, w, y,
          w, w, y,
        ],
        l: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        f: [
          g, g, b,
          g, g, b,
          g, g, b,
        ],
        r: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        b: [
          g, b, b,
          g, b, b,
          g, b, b,
        ],
        d: [
          y, y, w,
          y, y, w,
          y, y, w,
        ],
      },
      'B': {
        u: [
          r, r, r,
          w, w, w,
          w, w, w,
        ],
        l: [
          w, o, o,
          w, o, o,
          w, o, o,
        ],
        f: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        r: [
          r, r, y,
          r, r, y,
          r, r, y,
        ],
        b: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        d: [
          y, y, y,
          y, y, y,
          o, o, o,
        ],
      },
      'B-': {
        u: [
          o, o, o,
          w, w, w,
          w, w, w,
        ],
        l: [
          y, o, o,
          y, o, o,
          y, o, o,
        ],
        f: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        r: [
          r, r, w,
          r, r, w,
          r, r, w,
        ],
        b: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        d: [
          y, y, y,
          y, y, y,
          r, r, r,
        ],
      },
      'B2': {
        u: [
          y, y, y,
          w, w, w,
          w, w, w,
        ],
        l: [
          r, o, o,
          r, o, o,
          r, o, o,
        ],
        f: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        r: [
          r, r, o,
          r, r, o,
          r, r, o,
        ],
        b: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        d: [
          y, y, y,
          y, y, y,
          w, w, w,
        ],
      },
      'D': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          o, o, o,
          o, o, o,
          b, b, b,
        ],
        f: [
          g, g, g,
          g, g, g,
          o, o, o,
        ],
        r: [
          r, r, r,
          r, r, r,
          g, g, g,
        ],
        b: [
          b, b, b,
          b, b, b,
          r, r, r,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      'D-': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          o, o, o,
          o, o, o,
          g, g, g,
        ],
        f: [
          g, g, g,
          g, g, g,
          r, r, r,
        ],
        r: [
          r, r, r,
          r, r, r,
          b, b, b,
        ],
        b: [
          b, b, b,
          b, b, b,
          o, o, o,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      'D2': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          o, o, o,
          o, o, o,
          r, r, r,
        ],
        f: [
          g, g, g,
          g, g, g,
          b, b, b,
        ],
        r: [
          r, r, r,
          r, r, r,
          o, o, o,
        ],
        b: [
          b, b, b,
          b, b, b,
          g, g, g,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      'X': {
        u: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        l: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        f: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
        r: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        b: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        d: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
      },
      'X-': {
        u: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        l: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        f: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        r: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        b: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
        d: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
      },
      'X2': {
        u: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
        l: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        f: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        r: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        b: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        d: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
      },
      'Y': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        f: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        r: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        b: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      'Y-': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        f: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        r: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        b: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      'Y2': {
        u: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        l: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        f: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        r: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        b: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        d: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
      },
      'Z': {
        u: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        l: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
        f: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        r: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        b: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        d: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
      },
      'Z-': {
        u: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        l: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
        f: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        r: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
        b: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        d: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
      },
      'Z2': {
        u: [
          y, y, y,
          y, y, y,
          y, y, y,
        ],
        l: [
          r, r, r,
          r, r, r,
          r, r, r,
        ],
        f: [
          g, g, g,
          g, g, g,
          g, g, g,
        ],
        r: [
          o, o, o,
          o, o, o,
          o, o, o,
        ],
        b: [
          b, b, b,
          b, b, b,
          b, b, b,
        ],
        d: [
          w, w, w,
          w, w, w,
          w, w, w,
        ],
      },
    };

    Object.keys(turns).forEach((turn: string) => {
      it(turn, () => {
        const cube = new Cube({ size: 3 });

        cube.turn(turn);

        expect(simplifiedState(cube)).toEqual(turns[turn]);
      });
    });

    it('inner turns effect opposite face', () => {
      const cube = new Cube({ size: 3 });

      cube.turn('L R 3U');

      expect(faceValues(cube.state.d)).toEqual([
        4, 4, 4,
        5, 5, 5,
        2, 2, 2,
      ]);
    });
  });

  // scrambles are generated from the following WCA scrambler
  // https://www.worldcubeassociation.org/regulations/history/files/scrambles/scramble_cube.htm
  describe('scrambles', () => {
    it('2x2', () => {
      const cube = new Cube({ size: 2 });
            
      cube.turn(`F2 U2 F2 U' F' R F2 U2 F' U2`);
    
      expect(simplifiedState(cube)).toEqual({
        u: [
          w, g,
          b, g,
        ],
        l: [
          g, r,
          o, b,
        ],
        f: [
          y, o,
          r, o,
        ],
        r: [
          y, y,
          b, g,
        ],
        b: [
          r, o,
          w, b,
        ],
        d: [
          w, w,
          y, r,
        ],
      });
    });

    it('3x3', () => {
      const cube = new Cube({ size: 3 });
            
      cube.turn(`R U' L' B2 F2 L' R' U2 R D' L R' D' L D B' L B D' B2 F' L R D2 B' R' F2 L B2 D2`);
    
      expect(simplifiedState(cube)).toEqual({
        u: [
          o, r, b,
          w, w, o,
          b, y, g,
        ],
        l: [
          g, o, o,
          y, o, r,
          o, b, b,
        ],
        f: [
          w, g, y,
          g, g, r,
          y, w, y,
        ],
        r: [
          r, g, w,
          w, r, r,
          b, y, g,
        ],
        b: [
          r, y, y,
          b, b, b,
          w, w, g,
        ],
        d: [
          r, b, o,
          o, y, o,
          w, g, r,
        ],
      });
    });

    it('4x4', () => {
      const cube = new Cube({ size: 4 });

      cube.turn(`Rw2 U' B2 Fw D' R2 D2 R' Uw' L2 Fw' L2 B' D' R' F Rw B' L' Rw2 B2 Uw2 L' Fw Uw2 F Uw Fw' F L2`);
        
      expect(simplifiedState(cube)).toEqual({
        u: [
          y, o, g, b,
          r, g, o, g,
          g, b, y, y,
          g, b, y, r,
        ],
        l: [
          b, b, r, r,
          r, w, r, r,
          b, y, g, y,
          b, b, r, y,
        ],
        f: [
          w, y, o, g,
          b, y, b, b,
          o, r, r, w,
          o, g, y, w,
        ],
        r: [
          y, b, y, w,
          o, g, o, w,
          o, g, r, g,
          o, g, r, g,
        ],
        b: [
          r, r, b, o,
          o, w, w, w,
          w, b, w, w,
          o, w, g, r,
        ],
        d: [
          g, o, r, b,
          w, o, y, y,
          w, o, b, y,
          y, o, g, w,
        ],
      });
    });

    it('5x5', () => {
      const cube = new Cube({ size: 5 });

      cube.turn(`R' Dw2 L' D' U2 B R2 B2 U' Bw' Lw2 Dw' Rw' U' R Dw' Uw' F Dw' B' L2 Lw' Rw' R2 Bw' Fw2 F R' B' D`);
        
      expect(simplifiedState(cube)).toEqual({
        u: [
          g, y, r, b, y,
          o, y, w, g, r,
          o, b, w, o, g,
          b, r, w, r, y,
          o, b, o, o, o,
        ],
        l: [
          r, y, g, w, y,
          g, w, r, b, g,
          b, y, o, b, r,
          b, y, y, g, b,
          w, w, b, b, r,
        ],
        f: [
          g, o, y, y, w,
          w, r, y, y, y,
          y, b, g, o, w,
          w, w, g, g, g,
          g, o, w, g, r,
        ],
        r: [
          b, g, r, w, o,
          r, b, w, o, r,
          r, r, r, w, o,
          w, b, g, w, r,
          w, g, g, r, b,
        ],
        b: [
          b, r, b, b, y,
          y, g, r, o, o,
          b, b, b, y, y,
          w, r, g, y, y,
          y, r, o, b, o,
        ],
        d: [
          w, w, g, o, b,
          r, o, r, w, y,
          w, g, y, o, y,
          o, b, o, o, g,
          g, o, w, g, r,
        ],
      });
    });
  });
});