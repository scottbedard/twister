import { DodecaminxTurn } from '../src/dodecaminx/dodecaminx';

import Dodecaminx from '../src/dodecaminx/dodecaminx';
import { createFace, rotateFace, simplifyFace } from '../src/dodecaminx/helpers';

describe('dodecaminx', () => {
  it('throws an error if the size is not an integer', () => {
    expect(() => new Dodecaminx({ size: 3.5 })).toThrow();
  });

  it('throws an error if the size is less than two', () => {
    expect(() => new Dodecaminx({ size: 1 })).toThrow();
  });

  it('creates center for odd sizes', () => {
    const even = new Dodecaminx({ size: 2 });
    const odd = new Dodecaminx({ size: 3 });

    expect(even.state.f.center).toBe(null);
    expect(odd.state.f.center).not.toBe(null);
  });

  it('creates middles for odd sizes', () => {
    const even = new Dodecaminx({ size: 2 });
    const odd = new Dodecaminx({ size: 3 });

    expect(even.state.f.middles.length).toBe(0);
    expect(odd.state.f.middles.length > 0).toBe(true);
  });

  //
  // helpers
  //
  describe('helpers', () => {
    describe('rotateFace', () => {
      // convert face stickers to unique values
      const createTestFace = (size: number) => {
        const face = createFace(size);
        const letters = ['a', 'b', 'c', 'd', 'e'];

        face.corners = face.corners
          .map((matrices, i) => matrices
            .map((val, j) => ({ data: {}, value: `corner-${letters[i]}-${j}` })));

        face.middles = face.middles
          .map((arr, i) => arr
            .map((val, j) => ({ data: {}, value: `edge-${letters[i]}-${j}` })));

        return face;
      }

      it('kilo', () => {
        const kilo = createTestFace(2);
        const rotate_2 = rotateFace(kilo, -2);
        const rotate_1 = rotateFace(kilo, -1);
        const rotate0 = rotateFace(kilo, 0);
        const rotate1 = rotateFace(kilo, 1);
        const rotate2 = rotateFace(kilo, 2);

        expect(simplifyFace(rotate_2)).toEqual([
          [
            ['corner-c-0'],
            ['corner-d-0'],
            ['corner-e-0'],
            ['corner-a-0'],
            ['corner-b-0'],
          ],
        ]);

        expect(simplifyFace(rotate_1)).toEqual([
          [
            ['corner-b-0'],
            ['corner-c-0'],
            ['corner-d-0'],
            ['corner-e-0'],
            ['corner-a-0'],
          ],
        ]);

        expect(simplifyFace(rotate0)).toEqual([
          [
            ['corner-a-0'],
            ['corner-b-0'],
            ['corner-c-0'],
            ['corner-d-0'],
            ['corner-e-0'],
          ],
        ]);
        
        expect(simplifyFace(rotate1)).toEqual([
          [
            ['corner-e-0'],
            ['corner-a-0'],
            ['corner-b-0'],
            ['corner-c-0'],
            ['corner-d-0'],
          ],
        ]);

        expect(simplifyFace(rotate2)).toEqual([
          [
            ['corner-d-0'],
            ['corner-e-0'],
            ['corner-a-0'],
            ['corner-b-0'],
            ['corner-c-0'],
          ],
        ]);
      });

      it('mega', () => {
        const mega = createTestFace(3);
        const rotate_2 = rotateFace(mega, -2);
        const rotate_1 = rotateFace(mega, -1);
        const rotate0 = rotateFace(mega, 0);
        const rotate1 = rotateFace(mega, 1);
        const rotate2 = rotateFace(mega, 2);

        expect(simplifyFace(rotate_2)).toEqual([
          [
            ['corner-c-0'],
            ['corner-d-0'],
            ['corner-e-0'],
            ['corner-a-0'],
            ['corner-b-0'],
          ],
          [
            ['edge-c-0'],
            ['edge-d-0'],
            ['edge-e-0'],
            ['edge-a-0'],
            ['edge-b-0'],
          ],
          null,
        ]);

        expect(simplifyFace(rotate_1)).toEqual([
          [
            ['corner-b-0'],
            ['corner-c-0'],
            ['corner-d-0'],
            ['corner-e-0'],
            ['corner-a-0'],
          ],
          [
            ['edge-b-0'],
            ['edge-c-0'],
            ['edge-d-0'],
            ['edge-e-0'],
            ['edge-a-0'],
          ],
          null,
        ]);

        expect(simplifyFace(rotate0)).toEqual([
          [
            ['corner-a-0'],
            ['corner-b-0'],
            ['corner-c-0'],
            ['corner-d-0'],
            ['corner-e-0'],
          ],
          [
            ['edge-a-0'],
            ['edge-b-0'],
            ['edge-c-0'],
            ['edge-d-0'],
            ['edge-e-0'],
          ],
          null,
        ]);

        expect(simplifyFace(rotate1)).toEqual([
          [
            ['corner-e-0'],
            ['corner-a-0'],
            ['corner-b-0'],
            ['corner-c-0'],
            ['corner-d-0'],
          ],
          [
            ['edge-e-0'],
            ['edge-a-0'],
            ['edge-b-0'],
            ['edge-c-0'],
            ['edge-d-0'],
          ],
          null,
        ]);

        expect(simplifyFace(rotate2)).toEqual([
          [
            ['corner-d-0'],
            ['corner-e-0'],
            ['corner-a-0'],
            ['corner-b-0'],
            ['corner-c-0'],
          ],
          [
            ['edge-d-0'],
            ['edge-e-0'],
            ['edge-a-0'],
            ['edge-b-0'],
            ['edge-c-0'],
          ],
          null,
        ]);
      });
    });
  });

  //
  // parsing
  //
  describe('turn parsing', () => {
    const minx = new Dodecaminx({ size: 2 });

    const turns: Record<string, DodecaminxTurn> = {
      'F': { depth: 1, rotation: 1, target: 'f', wide: false, whole: false },
      'F2': { depth: 1, rotation: 2, target: 'f', wide: false, whole: false },
      'F-': { depth: 1, rotation: -1, target: 'f', wide: false, whole: false },
      'F2-': { depth: 1, rotation: -2, target: 'f', wide: false, whole: false },
      'Fw': { depth: 2, rotation: 1, target: 'f', wide: true, whole: false },
      'Fw-': { depth: 2, rotation: -1, target: 'f', wide: true, whole: false },
      '2F': { depth: 2, rotation: 1, target: 'f', wide: false, whole: false },
    };

    Object.keys(turns).forEach(turn => {
      it(turn, () => {
        expect(minx.parse(turn)).toEqual(turns[turn]);
      });
    });

    it('invalid', () => {
      expect(() => minx.parse('invalid')).toThrow();
    });
  });

  //
  // output
  //
  describe('output', () => {
    it('2', () => {
      const minx = new Dodecaminx({ size: 2 });

      expect(minx.output()).toEqual({
        u: [
          [[0], [0], [0], [0], [0]],
        ],
        f: [
          [[1], [1], [1], [1], [1]],
        ],
        l: [
          [[2], [2], [2], [2], [2]],
        ],
        bl: [
          [[3], [3], [3], [3], [3]],
        ],
        br: [
          [[4], [4], [4], [4], [4]],
        ],
        r: [
          [[5], [5], [5], [5], [5]],
        ],
        d: [
          [[6], [6], [6], [6], [6]],
        ],
        b: [
          [[7], [7], [7], [7], [7]],
        ],
        dbl: [
          [[8], [8], [8], [8], [8]],
        ],
        dl: [
          [[9], [9], [9], [9], [9]],
        ],
        dr: [
          [[10], [10], [10], [10], [10]],
        ],
        dbr: [
          [[11], [11], [11], [11], [11]],
        ],
      });
    });

    it('3', () => {
      const minx = new Dodecaminx({ size: 3 });

      expect(minx.output()).toEqual({
        u: [
          [[0], [0], [0], [0], [0]],
          [[0], [0], [0], [0], [0]],
          0,
        ],
        f: [
          [[1], [1], [1], [1], [1]],
          [[1], [1], [1], [1], [1]],
          1,
        ],
        l: [
          [[2], [2], [2], [2], [2]],
          [[2], [2], [2], [2], [2]],
          2,
        ],
        bl: [
          [[3], [3], [3], [3], [3]],
          [[3], [3], [3], [3], [3]],
          3,
        ],
        br: [
          [[4], [4], [4], [4], [4]],
          [[4], [4], [4], [4], [4]],
          4,
        ],
        r: [
          [[5], [5], [5], [5], [5]],
          [[5], [5], [5], [5], [5]],
          5,
        ],
        d: [
          [[6], [6], [6], [6], [6]],
          [[6], [6], [6], [6], [6]],
          6,
        ],
        b: [
          [[7], [7], [7], [7], [7]],
          [[7], [7], [7], [7], [7]],
          7,
        ],
        dbl: [
          [[8], [8], [8], [8], [8]],
          [[8], [8], [8], [8], [8]],
          8,
        ],
        dl: [
          [[9], [9], [9], [9], [9]],
          [[9], [9], [9], [9], [9]],
          9,
        ],
        dr: [
          [[10], [10], [10], [10], [10]],
          [[10], [10], [10], [10], [10]],
          10,
        ],
        dbr: [
          [[11], [11], [11], [11], [11]],
          [[11], [11], [11], [11], [11]],
          11,
        ],
      });
    });

    it('4', () => {
      const minx = new Dodecaminx({ size: 4 });

      expect(minx.output()).toEqual({
        u: [
          [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        ],
        f: [
          [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
        ],
        l: [
          [[2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2]],
        ],
        bl: [
          [[3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3]],
        ],
        br: [
          [[4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4]],
        ],
        r: [
          [[5, 5, 5, 5], [5, 5, 5, 5], [5, 5, 5, 5], [5, 5, 5, 5], [5, 5, 5, 5]],
        ],
        d: [
          [[6, 6, 6, 6], [6, 6, 6, 6], [6, 6, 6, 6], [6, 6, 6, 6], [6, 6, 6, 6]],
        ],
        b: [
          [[7, 7, 7, 7], [7, 7, 7, 7], [7, 7, 7, 7], [7, 7, 7, 7], [7, 7, 7, 7]],
        ],
        dbl: [
          [[8, 8, 8, 8], [8, 8, 8, 8], [8, 8, 8, 8], [8, 8, 8, 8], [8, 8, 8, 8]],
        ],
        dl: [
          [[9, 9, 9, 9], [9, 9, 9, 9], [9, 9, 9, 9], [9, 9, 9, 9], [9, 9, 9, 9]],
        ],
        dr: [
          [[10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10]],
        ],
        dbr: [
          [[11, 11, 11, 11], [11, 11, 11, 11], [11, 11, 11, 11], [11, 11, 11, 11], [11, 11, 11, 11]],
        ],
      });
    });

    it('5', () => {
      const minx = new Dodecaminx({ size: 5 });

      expect(minx.output()).toEqual({
        u: [
          [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
          [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
          0,
        ],
        f: [
          [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]],
          [[1, 1], [1, 1], [1, 1], [1, 1], [1, 1]],
          1,
        ],
        l: [
          [[2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2], [2, 2, 2, 2]],
          [[2, 2], [2, 2], [2, 2], [2, 2], [2, 2]],
          2,
        ],
        bl: [
          [[3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3], [3, 3, 3, 3]],
          [[3, 3], [3, 3], [3, 3], [3, 3], [3, 3]],
          3,
        ],
        br: [
          [[4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4], [4, 4, 4, 4]],
          [[4, 4], [4, 4], [4, 4], [4, 4], [4, 4]],
          4,
        ],
        r: [
          [[5, 5, 5, 5], [5, 5, 5, 5], [5, 5, 5, 5], [5, 5, 5, 5], [5, 5, 5, 5]],
          [[5, 5], [5, 5], [5, 5], [5, 5], [5, 5]],
          5,
        ],
        d: [
          [[6, 6, 6, 6], [6, 6, 6, 6], [6, 6, 6, 6], [6, 6, 6, 6], [6, 6, 6, 6]],
          [[6, 6], [6, 6], [6, 6], [6, 6], [6, 6]],
          6,
        ],
        b: [
          [[7, 7, 7, 7], [7, 7, 7, 7], [7, 7, 7, 7], [7, 7, 7, 7], [7, 7, 7, 7]],
          [[7, 7], [7, 7], [7, 7], [7, 7], [7, 7]],
          7,
        ],
        dbl: [
          [[8, 8, 8, 8], [8, 8, 8, 8], [8, 8, 8, 8], [8, 8, 8, 8], [8, 8, 8, 8]],
          [[8, 8], [8, 8], [8, 8], [8, 8], [8, 8]],
          8,
        ],
        dl: [
          [[9, 9, 9, 9], [9, 9, 9, 9], [9, 9, 9, 9], [9, 9, 9, 9], [9, 9, 9, 9]],
          [[9, 9], [9, 9], [9, 9], [9, 9], [9, 9]],
          9,
        ],
        dr: [
          [[10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10], [10, 10, 10, 10]],
          [[10, 10], [10, 10], [10, 10], [10, 10], [10, 10]],
          10,
        ],
        dbr: [
          [[11, 11, 11, 11], [11, 11, 11, 11], [11, 11, 11, 11], [11, 11, 11, 11], [11, 11, 11, 11]],
          [[11, 11], [11, 11], [11, 11], [11, 11], [11, 11]],
          11,
        ],
      });
    });
  });

  //
  // turns
  //
  describe.skip('turns', () => {
    it('R', () => {
      const minx = new Dodecaminx({ size: 4 });
      
      // ...
    });
  });
});
