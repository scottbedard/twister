import {
  DodecaminxSliceObject,
  DodecaminxTurn,
} from '../src/dodecaminx/dodecaminx';

import Dodecaminx from '../src/dodecaminx/dodecaminx';

import {
  createFace,
  extractSlice,
  rotateFace,
  simplifyFace,
} from '../src/dodecaminx/helpers';

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
    // this helper creates faces with a unique values for each
    // sticker, which is useful for rotate / slice assertions
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

    // this helper extracts the values from a slice to make
    // assertions easier to make
    const simplifySlice = (slice: DodecaminxSliceObject<unknown>) => {
      return {
        leading: slice.leading.map(obj => obj.value),
        middle: slice.middle?.value ?? null,
        trailing: slice.trailing.map(obj => obj.value),
      };
    }

    describe('extractSlice', () => {
      it('kilo', () => {
        const kilo = createTestFace(2);
        const slice_2 = extractSlice(kilo, 1, -2);
        const slice_1 = extractSlice(kilo, 1, -1);
        const slice0 = extractSlice(kilo, 1, 0);
        const slice1 = extractSlice(kilo, 1, 1);
        const slice2 = extractSlice(kilo, 1, 2);

        expect(simplifySlice(slice_2)).toEqual({
          leading: ['corner-c-0'],
          middle: null,
          trailing: ['corner-d-0'],
        });

        expect(simplifySlice(slice_1)).toEqual({
          leading: ['corner-b-0'],
          middle: null,
          trailing: ['corner-c-0'],
        });

        expect(simplifySlice(slice0)).toEqual({
          leading: ['corner-a-0'],
          middle: null,
          trailing: ['corner-b-0'],
        });

        expect(simplifySlice(slice1)).toEqual({
          leading: ['corner-e-0'],
          middle: null,
          trailing: ['corner-a-0'],
        });

        expect(simplifySlice(slice2)).toEqual({
          leading: ['corner-d-0'],
          middle: null,
          trailing: ['corner-e-0'],
        });
      });

      it('mega', () => {
        const mega = createTestFace(3);
        const slice_2 = extractSlice(mega, 1, -2);
        const slice_1 = extractSlice(mega, 1, -1);
        const slice0 = extractSlice(mega, 1, 0);
        const slice1 = extractSlice(mega, 1, 1);
        const slice2 = extractSlice(mega, 1, 2);

        expect(simplifySlice(slice_2)).toEqual({
          leading: ['corner-c-0'],
          middle: 'edge-c-0',
          trailing: ['corner-d-0'],
        });

        expect(simplifySlice(slice_1)).toEqual({
          leading: ['corner-b-0'],
          middle: 'edge-b-0',
          trailing: ['corner-c-0'],
        });

        expect(simplifySlice(slice0)).toEqual({
          leading: ['corner-a-0'],
          middle: 'edge-a-0',
          trailing: ['corner-b-0'],
        });

        expect(simplifySlice(slice1)).toEqual({
          leading: ['corner-e-0'],
          middle: 'edge-e-0',
          trailing: ['corner-a-0'],
        });
        
        expect(simplifySlice(slice2)).toEqual({
          leading: ['corner-d-0'],
          middle: 'edge-d-0',
          trailing: ['corner-e-0'],
        });
      });
    });

    describe('rotateFace', () => {
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
