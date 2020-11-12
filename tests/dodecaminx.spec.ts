import {
  DodecaminxFace,
  DodecaminxSliceObject,
  DodecaminxStateSummary,
  DodecaminxTurn,
} from '../src/dodecaminx/dodecaminx';

import Dodecaminx from '../src/dodecaminx/dodecaminx';

import {
  createFace,
  extractSlice,
  injectSlice,
  rotateFace,
  simplifyFace,
} from '../src/dodecaminx/helpers';

import { identity } from '../src/utils/function';

// the abilty to set custom values was added after many of these
// assertions were made. faces are not ordered alphabetically,
// which broke all of the existing tests. to avoid re-writing a
// bunch of long assertions, we'll just shim in the original values
const alphaValues = {
  b: 'b',
  bl: 'bl',
  br: 'br',
  d: 'd',
  dbl: 'dbl',
  dbr: 'dbr',
  dl: 'dl',
  dr: 'dr',
  f: 'f',
  l: 'l',
  r: 'r',
  u: 'u',
};

const testValues = {
  b: 7,
  bl: 3,
  br: 4,
  d: 6,
  dbl: 8,
  dbr: 11,
  dl: 9,
  dr: 10,
  f: 1,
  l: 2,
  r: 5,
  u: 0,
};

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

  it('accepts custom initial values', () => {
    const kilo = new Dodecaminx({
      size: 2,
      values: {
        b: 'b',
        bl: 'bl',
        br: 'br',
        d: 'd',
        dbl: 'dbl',
        dbr: 'dbr',
        dl: 'dl',
        dr: 'dr',
        f: 'f',
        l: 'l',
        r: 'r',
        u: 'u',
      },
    });

    expect(simplifyFace(kilo.state.b)).toEqual([[['b'], ['b'], ['b'], ['b'], ['b']]]);
    expect(simplifyFace(kilo.state.bl)).toEqual([[['bl'], ['bl'], ['bl'], ['bl'], ['bl']]]);
    expect(simplifyFace(kilo.state.br)).toEqual([[['br'], ['br'], ['br'], ['br'], ['br']]]);
    expect(simplifyFace(kilo.state.d)).toEqual([[['d'], ['d'], ['d'], ['d'], ['d']]]);
    expect(simplifyFace(kilo.state.dbl)).toEqual([[['dbl'], ['dbl'], ['dbl'], ['dbl'], ['dbl']]]);
    expect(simplifyFace(kilo.state.dbr)).toEqual([[['dbr'], ['dbr'], ['dbr'], ['dbr'], ['dbr']]]);
    expect(simplifyFace(kilo.state.dl)).toEqual([[['dl'], ['dl'], ['dl'], ['dl'], ['dl']]]);
    expect(simplifyFace(kilo.state.dr)).toEqual([[['dr'], ['dr'], ['dr'], ['dr'], ['dr']]]);
    expect(simplifyFace(kilo.state.f)).toEqual([[['f'], ['f'], ['f'], ['f'], ['f']]]);
    expect(simplifyFace(kilo.state.l)).toEqual([[['l'], ['l'], ['l'], ['l'], ['l']]]);
    expect(simplifyFace(kilo.state.r)).toEqual([[['r'], ['r'], ['r'], ['r'], ['r']]]);
    expect(simplifyFace(kilo.state.u)).toEqual([[['u'], ['u'], ['u'], ['u'], ['u']]]);
  });

  //
  // helpers
  //
  describe('helpers', () => {
    // this helper creates faces with a unique values for each
    // sticker, which is useful for rotate / slice assertions
    const createTestFace = (size: number, prefix = '') => {
      const face = createFace(size);
      const letters = ['a', 'b', 'c', 'd', 'e'];

      face.corners = face.corners
        .map((matrices, i) => matrices
          .map((val, j) => ({ data: {}, value: `${prefix ? `${prefix}-` : ''}corner-${letters[i]}-${j}` })));

      face.middles = face.middles
        .map((arr, i) => arr
          .map((val, j) => ({ data: {}, value: `${prefix ? `${prefix}-` : ''}edge-${letters[i]}-${j}` })));

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

      it('master [depth: 1]', () => {
        const master = createTestFace(4);
        const slice_2 = extractSlice(master, 1, -2);
        const slice_1 = extractSlice(master, 1, -1);
        const slice0 = extractSlice(master, 1, 0);
        const slice1 = extractSlice(master, 1, 1);
        const slice2 = extractSlice(master, 1, 2);

        expect(simplifySlice(slice_2)).toEqual({
          leading: ['corner-c-0', 'corner-c-1'],
          middle: null,
          trailing: ['corner-d-0', 'corner-d-2'],
        });

        expect(simplifySlice(slice_1)).toEqual({
          leading: ['corner-b-0', 'corner-b-1'],
          middle: null,
          trailing: ['corner-c-0', 'corner-c-2'],
        });

        expect(simplifySlice(slice0)).toEqual({
          leading: ['corner-a-0', 'corner-a-1'],
          middle: null,
          trailing: ['corner-b-0', 'corner-b-2'],
        });

        expect(simplifySlice(slice1)).toEqual({
          leading: ['corner-e-0', 'corner-e-1'],
          middle: null,
          trailing: ['corner-a-0', 'corner-a-2'],
        });

        expect(simplifySlice(slice2)).toEqual({
          leading: ['corner-d-0', 'corner-d-1'],
          middle: null,
          trailing: ['corner-e-0', 'corner-e-2'],
        });
      });

      it('master [depth: 2]', () => {
        const master = createTestFace(4);
        const slice_2 = extractSlice(master, 2, -2);
        const slice_1 = extractSlice(master, 2, -1);
        const slice0 = extractSlice(master, 2, 0);
        const slice1 = extractSlice(master, 2, 1);
        const slice2 = extractSlice(master, 2, 2);

        expect(simplifySlice(slice_2)).toEqual({
          leading: ['corner-c-2', 'corner-c-3'],
          middle: null,
          trailing: ['corner-d-1', 'corner-d-3'],
        });

        expect(simplifySlice(slice_1)).toEqual({
          leading: ['corner-b-2', 'corner-b-3'],
          middle: null,
          trailing: ['corner-c-1', 'corner-c-3'],
        });

        expect(simplifySlice(slice0)).toEqual({
          leading: ['corner-a-2', 'corner-a-3'],
          middle: null,
          trailing: ['corner-b-1', 'corner-b-3'],
        });

        expect(simplifySlice(slice1)).toEqual({
          leading: ['corner-e-2', 'corner-e-3'],
          middle: null,
          trailing: ['corner-a-1', 'corner-a-3'],
        });

        expect(simplifySlice(slice2)).toEqual({
          leading: ['corner-d-2', 'corner-d-3'],
          middle: null,
          trailing: ['corner-e-1', 'corner-e-3'],
        });
      });

      it('giga [depth: 1]', () => {
        const giga = createTestFace(5);
        const slice_2 = extractSlice(giga, 1, -2);
        const slice_1 = extractSlice(giga, 1, -1);
        const slice0 = extractSlice(giga, 1, 0);
        const slice1 = extractSlice(giga, 1, 1);
        const slice2 = extractSlice(giga, 1, 2);

        expect(simplifySlice(slice_2)).toEqual({
          leading: ['corner-c-0', 'corner-c-1'],
          middle: 'edge-c-0',
          trailing: ['corner-d-0', 'corner-d-2'],
        });

        expect(simplifySlice(slice_1)).toEqual({
          leading: ['corner-b-0', 'corner-b-1'],
          middle: 'edge-b-0',
          trailing: ['corner-c-0', 'corner-c-2'],
        });

        expect(simplifySlice(slice0)).toEqual({
          leading: ['corner-a-0', 'corner-a-1'],
          middle: 'edge-a-0',
          trailing: ['corner-b-0', 'corner-b-2'],
        });

        expect(simplifySlice(slice1)).toEqual({
          leading: ['corner-e-0', 'corner-e-1'],
          middle: 'edge-e-0',
          trailing: ['corner-a-0', 'corner-a-2'],
        });

        expect(simplifySlice(slice2)).toEqual({
          leading: ['corner-d-0', 'corner-d-1'],
          middle: 'edge-d-0',
          trailing: ['corner-e-0', 'corner-e-2'],
        });
      });

      it('giga [depth: 2]', () => {
        const giga = createTestFace(5);
        const slice_2 = extractSlice(giga, 2, -2);
        const slice_1 = extractSlice(giga, 2, -1);
        const slice0 = extractSlice(giga, 2, 0);
        const slice1 = extractSlice(giga, 2, 1);
        const slice2 = extractSlice(giga, 2, 2);

        expect(simplifySlice(slice_2)).toEqual({
          leading: ['corner-c-2', 'corner-c-3'],
          middle: 'edge-c-1',
          trailing: ['corner-d-1', 'corner-d-3'],
        });

        expect(simplifySlice(slice_1)).toEqual({
          leading: ['corner-b-2', 'corner-b-3'],
          middle: 'edge-b-1',
          trailing: ['corner-c-1', 'corner-c-3'],
        });

        expect(simplifySlice(slice0)).toEqual({
          leading: ['corner-a-2', 'corner-a-3'],
          middle: 'edge-a-1',
          trailing: ['corner-b-1', 'corner-b-3'],
        });

        expect(simplifySlice(slice1)).toEqual({
          leading: ['corner-e-2', 'corner-e-3'],
          middle: 'edge-e-1',
          trailing: ['corner-a-1', 'corner-a-3'],
        });

        expect(simplifySlice(slice2)).toEqual({
          leading: ['corner-d-2', 'corner-d-3'],
          middle: 'edge-d-1',
          trailing: ['corner-e-1', 'corner-e-3'],
        });
      });
    });

    describe('injectSlice', () => {
      it('kilo', () => {
        const slice = extractSlice(createTestFace(2, 'source'), 1, 0);
        const target_2 = createTestFace(2);
        const target_1 = createTestFace(2);
        const target0 = createTestFace(2);
        const target1 = createTestFace(2);
        const target2 = createTestFace(2);
      
        injectSlice(target_2, slice, 1, -2);
        injectSlice(target_1, slice, 1, -1);
        injectSlice(target0, slice, 1, 0);
        injectSlice(target1, slice, 1, 1);
        injectSlice(target2, slice, 1, 2);

        expect(simplifyFace(target_2)).toEqual([
          [
            ['corner-a-0'],
            ['corner-b-0'],
            ['source-corner-a-0'],
            ['source-corner-b-0'],
            ['corner-e-0'],
          ],
        ]);

        expect(simplifyFace(target_1)).toEqual([
          [
            ['corner-a-0'],
            ['source-corner-a-0'],
            ['source-corner-b-0'],
            ['corner-d-0'],
            ['corner-e-0'],
          ],
        ]);
        
        expect(simplifyFace(target0)).toEqual([
          [
            ['source-corner-a-0'],
            ['source-corner-b-0'],
            ['corner-c-0'],
            ['corner-d-0'],
            ['corner-e-0'],
          ],
        ]);

        expect(simplifyFace(target1)).toEqual([
          [
            ['source-corner-b-0'],
            ['corner-b-0'],
            ['corner-c-0'],
            ['corner-d-0'],
            ['source-corner-a-0'],
          ],
        ]);

        expect(simplifyFace(target2)).toEqual([
          [
            ['corner-a-0'],
            ['corner-b-0'],
            ['corner-c-0'],
            ['source-corner-a-0'],
            ['source-corner-b-0'],
          ],
        ]);
      });

      it('mega', () => {
        const slice = extractSlice(createTestFace(3, 'source'), 1, 0);
        const target_2 = createTestFace(3);
        const target_1 = createTestFace(3);
        const target0 = createTestFace(3);
        const target1 = createTestFace(3);
        const target2 = createTestFace(3);
      
        injectSlice(target_2, slice, 1, -2);
        injectSlice(target_1, slice, 1, -1);
        injectSlice(target0, slice, 1, 0);
        injectSlice(target1, slice, 1, 1);
        injectSlice(target2, slice, 1, 2);

        expect(simplifyFace(target_2)).toEqual([
          [
            ['corner-a-0'],
            ['corner-b-0'],
            ['source-corner-a-0'],
            ['source-corner-b-0'],
            ['corner-e-0'],
          ],
          [
            ['edge-a-0'],
            ['edge-b-0'],
            ['source-edge-a-0'],
            ['edge-d-0'],
            ['edge-e-0'],
          ],
          null
        ]);

        expect(simplifyFace(target_1)).toEqual([
          [
            ['corner-a-0'],
            ['source-corner-a-0'],
            ['source-corner-b-0'],
            ['corner-d-0'],
            ['corner-e-0'],
          ],
          [
            ['edge-a-0'],
            ['source-edge-a-0'],
            ['edge-c-0'],
            ['edge-d-0'],
            ['edge-e-0'],
          ],
          null
        ]);

        expect(simplifyFace(target0)).toEqual([
          [
            ['source-corner-a-0'],
            ['source-corner-b-0'],
            ['corner-c-0'],
            ['corner-d-0'],
            ['corner-e-0'],
          ],
          [
            ['source-edge-a-0'],
            ['edge-b-0'],
            ['edge-c-0'],
            ['edge-d-0'],
            ['edge-e-0'],
          ],
          null
        ]);

        expect(simplifyFace(target1)).toEqual([
          [
            ['source-corner-b-0'],
            ['corner-b-0'],
            ['corner-c-0'],
            ['corner-d-0'],
            ['source-corner-a-0'],
          ],
          [
            ['edge-a-0'],
            ['edge-b-0'],
            ['edge-c-0'],
            ['edge-d-0'],
            ['source-edge-a-0'],
          ],
          null
        ]);

        expect(simplifyFace(target2)).toEqual([
          [
            ['corner-a-0'],
            ['corner-b-0'],
            ['corner-c-0'],
            ['source-corner-a-0'],
            ['source-corner-b-0'],
          ],
          [
            ['edge-a-0'],
            ['edge-b-0'],
            ['edge-c-0'],
            ['source-edge-a-0'],
            ['edge-e-0'],
          ],
          null
        ]);
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
  // notation
  //
  describe('notation', () => {
    describe('parse', () => {
      const giga = new Dodecaminx({ size: 5 });

      const turns: Record<string, DodecaminxTurn> = {
        // standard turns
        'F': { depth: 1, pochmann: false, rotation: 1, target: 'f', wide: false, whole: false },
        'F2': { depth: 1, pochmann: false, rotation: 2, target: 'f', wide: false, whole: false },
        'F-': { depth: 1, pochmann: false, rotation: -1, target: 'f', wide: false, whole: false },
        'F2-': { depth: 1, pochmann: false, rotation: -2, target: 'f', wide: false, whole: false },
        'Fw': { depth: 2, pochmann: false, rotation: 1, target: 'f', wide: true, whole: false },
        'Fw-': { depth: 2, pochmann: false, rotation: -1, target: 'f', wide: true, whole: false },
        '2Fw-': { depth: 2, pochmann: false, rotation: -1, target: 'f', wide: true, whole: false },
        'Fw2-': { depth: 2, pochmann: false, rotation: -2, target: 'f', wide: true, whole: false },
        '2F': { depth: 2, pochmann: false, rotation: 1, target: 'f', wide: false, whole: false },
        
        // puzzle rotations
        '*F': { depth: 1, pochmann: false, rotation: 1, target: 'f', wide: false, whole: true },
        
        // pochmann
        'R++': { depth: 1, pochmann: true, rotation: 2, target: 'r', wide: false, whole: false },
        'R--': { depth: 1, pochmann: true, rotation: -2, target: 'r', wide: false, whole: false },
        'D++': { depth: 1, pochmann: true, rotation: 2, target: 'd', wide: false, whole: false },
        'D--': { depth: 1, pochmann: true, rotation: -2, target: 'd', wide: false, whole: false },
      };

      it('throws error when turn is invalid', () => {
        expect(() => giga.parse('invalid')).toThrow();
      });

      it('throws error when depth exceeds available layers', () => {
        const mega = new Dodecaminx({ size: 3 });
        const master = new Dodecaminx({ size: 4 });

        expect(() => mega.parse('2R')).toThrow();
        expect(() => mega.parse('Rw')).toThrow();
        expect(() => master.parse('2R')).not.toThrow();
        expect(() => master.parse('3R')).toThrow();
      });

      Object.keys(turns).forEach(turn => {
        it(turn, () => {
          expect(giga.parse(turn)).toEqual(turns[turn]);
        });
      });
    });
  });

  //
  // apply
  //
  describe('apply', () => {
    it('kilo', () => {
      const kilo = new Dodecaminx({ size: 2 });
      
      const state: DodecaminxStateSummary = {
        b: [
          [['b-corner-0'], ['b-corner-1'], ['b-corner-2'], ['b-corner-3'], ['b-corner-4']],
        ],
        bl: [
          [['bl-corner-0'], ['bl-corner-1'], ['bl-corner-2'], ['bl-corner-3'], ['bl-corner-4']],
        ],
        br: [
          [['br-corner-0'], ['br-corner-1'], ['br-corner-2'], ['br-corner-3'], ['br-corner-4']],
        ],
        d: [
          [['d-corner-0'], ['d-corner-1'], ['d-corner-2'], ['d-corner-3'], ['d-corner-4']],
        ],
        dbl: [
          [['dbl-corner-0'], ['dbl-corner-1'], ['dbl-corner-2'], ['dbl-corner-3'], ['dbl-corner-4']],
        ],
        dbr: [
          [['dbr-corner-0'], ['dbr-corner-1'], ['dbr-corner-2'], ['dbr-corner-3'], ['dbr-corner-4']],
        ],
        dl: [
          [['dl-corner-0'], ['dl-corner-1'], ['dl-corner-2'], ['dl-corner-3'], ['dl-corner-4']],
        ],
        dr: [
          [['dr-corner-0'], ['dr-corner-1'], ['dr-corner-2'], ['dr-corner-3'], ['dr-corner-4']],
        ],
        f: [
          [['f-corner-0'], ['f-corner-1'], ['f-corner-2'], ['f-corner-3'], ['f-corner-4']],
        ],
        l: [
          [['l-corner-0'], ['l-corner-1'], ['l-corner-2'], ['l-corner-3'], ['l-corner-4']],
        ],
        r: [
          [['r-corner-0'], ['r-corner-1'], ['r-corner-2'], ['r-corner-3'], ['r-corner-4']],
        ],
        u: [
          [['u-corner-0'], ['u-corner-1'], ['u-corner-2'], ['u-corner-3'], ['u-corner-4']],
        ],
      };

      expect(kilo.output()).not.toEqual(state);

      kilo.apply(state);

      expect(kilo.output()).toEqual(state);
    });

    it('mega', () => {
      const mega = new Dodecaminx({ size: 3 });
      
      const state: DodecaminxStateSummary = {
        b: [
          [['b-corner-0'], ['b-corner-1'], ['b-corner-2'], ['b-corner-3'], ['b-corner-4']],
          [['b-middle-0'], ['b-middle-1'], ['b-middle-2'], ['b-middle-3'], ['b-middle-4']],
          'b-center',
        ],
        bl: [
          [['bl-corner-0'], ['bl-corner-1'], ['bl-corner-2'], ['bl-corner-3'], ['bl-corner-4']],
          [['bl-middle-0'], ['bl-middle-1'], ['bl-middle-2'], ['bl-middle-3'], ['bl-middle-4']],
          'bl-center',
        ],
        br: [
          [['br-corner-0'], ['br-corner-1'], ['br-corner-2'], ['br-corner-3'], ['br-corner-4']],
          [['br-middle-0'], ['br-middle-1'], ['br-middle-2'], ['br-middle-3'], ['br-middle-4']],
          'br-center',
        ],
        d: [
          [['d-corner-0'], ['d-corner-1'], ['d-corner-2'], ['d-corner-3'], ['d-corner-4']],
          [['d-middle-0'], ['d-middle-1'], ['d-middle-2'], ['d-middle-3'], ['d-middle-4']],
          'd-center',
        ],
        dbl: [
          [['dbl-corner-0'], ['dbl-corner-1'], ['dbl-corner-2'], ['dbl-corner-3'], ['dbl-corner-4']],
          [['dbl-middle-0'], ['dbl-middle-1'], ['dbl-middle-2'], ['dbl-middle-3'], ['dbl-middle-4']],
          'dbl-center',
        ],
        dbr: [
          [['dbr-corner-0'], ['dbr-corner-1'], ['dbr-corner-2'], ['dbr-corner-3'], ['dbr-corner-4']],
          [['dbr-middle-0'], ['dbr-middle-1'], ['dbr-middle-2'], ['dbr-middle-3'], ['dbr-middle-4']],
          'dbr-center',
        ],
        dl: [
          [['dl-corner-0'], ['dl-corner-1'], ['dl-corner-2'], ['dl-corner-3'], ['dl-corner-4']],
          [['dl-middle-0'], ['dl-middle-1'], ['dl-middle-2'], ['dl-middle-3'], ['dl-middle-4']],
          'dl-center',
        ],
        dr: [
          [['dr-corner-0'], ['dr-corner-1'], ['dr-corner-2'], ['dr-corner-3'], ['dr-corner-4']],
          [['dr-middle-0'], ['dr-middle-1'], ['dr-middle-2'], ['dr-middle-3'], ['dr-middle-4']],
          'dr-center',
        ],
        f: [
          [['f-corner-0'], ['f-corner-1'], ['f-corner-2'], ['f-corner-3'], ['f-corner-4']],
          [['f-middle-0'], ['f-middle-1'], ['f-middle-2'], ['f-middle-3'], ['f-middle-4']],
          'f-center',
        ],
        l: [
          [['l-corner-0'], ['l-corner-1'], ['l-corner-2'], ['l-corner-3'], ['l-corner-4']],
          [['l-middle-0'], ['l-middle-1'], ['l-middle-2'], ['l-middle-3'], ['l-middle-4']],
          'l-center',
        ],
        r: [
          [['r-corner-0'], ['r-corner-1'], ['r-corner-2'], ['r-corner-3'], ['r-corner-4']],
          [['r-middle-0'], ['r-middle-1'], ['r-middle-2'], ['r-middle-3'], ['r-middle-4']],
          'r-center',
        ],
        u: [
          [['u-corner-0'], ['u-corner-1'], ['u-corner-2'], ['u-corner-3'], ['u-corner-4']],
          [['u-middle-0'], ['u-middle-1'], ['u-middle-2'], ['u-middle-3'], ['u-middle-4']],
          'u-center',
        ],
      };

      expect(mega.output()).not.toEqual(state);

      mega.apply(state);

      expect(mega.output()).toEqual(state);
    });
  });

  //
  // isSolved
  //
  describe('isSolved', () => {
    it('standard faces', () => {
      const kilo = new Dodecaminx({ size: 2 });

      kilo.turn('U');
      expect(kilo.isSolved()).toBe(false);

      kilo.turn('U-');
      expect(kilo.isSolved()).toBe(true);
    });

    it('void stickers', () => {
      // nullify all faces in the upper hemisphere except U
      const kilo = new Dodecaminx({
        size: 2,
        values: {
          b: 0,
          bl: null,
          br: null,
          d: 3,
          dbl: 4,
          dbr: 5,
          dl: 6,
          dr: 7,
          f: null,
          l: null,
          r: null,
          u: 11,
        },
      });

      kilo.turn('U');
      expect(kilo.isSolved()).toBe(true);

      kilo.turn('F');
      expect(kilo.isSolved()).toBe(false);

      kilo.turn('F-');
      expect(kilo.isSolved()).toBe(true);
    });
  })

  //
  // getStickersForTurn
  //
  describe('getStickersForTurn', () => {
    const mega = new Dodecaminx({ size: 3 });
    const giga = new Dodecaminx({ size: 5 });

    it('*U', () => {
      const allStickers = (Object.keys(mega.state) as DodecaminxFace[]).reduce((acc, face) => {
        mega.state[face].corners.forEach((arr) => acc.push(...arr));
        mega.state[face].middles.forEach((arr) => acc.push(...arr));
        return acc.concat(mega.state[face].center);
      }, []).filter(identity);

      expect(new Set(mega.getStickersForTurn('*U'))).toEqual(new Set(allStickers));
    });

    it('U, 2U, Uw', () => {
      expect(giga.getStickersForTurn('U').length).toBe((5 * 5) + 31); // face and first layer
      expect(giga.getStickersForTurn('2U').length).toBe((5 * 5)); // second layer only
      expect(giga.getStickersForTurn('Uw').length).toBe((5 * 5) + (5 * 5) + 31); // face and both layers
    });

    it('Provides correct slice extraction angles', () => {
      const kilo = new Dodecaminx({ size: 2 });
      const stickers = kilo.getStickersForTurn('U');

      [
        kilo.state.u.corners[0][0],
        kilo.state.u.corners[1][0],
        kilo.state.u.corners[2][0],
        kilo.state.u.corners[3][0],
        kilo.state.u.corners[4][0],
        kilo.state.f.corners[0][0],
        kilo.state.f.corners[4][0],
        kilo.state.l.corners[0][0],
        kilo.state.l.corners[1][0],
        kilo.state.bl.corners[1][0],
        kilo.state.bl.corners[2][0],
        kilo.state.br.corners[2][0],
        kilo.state.br.corners[3][0],
        kilo.state.r.corners[3][0],
        kilo.state.r.corners[4][0],
      ].forEach(sticker => {
        expect(stickers).toContain(sticker);
      });
    });
  });

  //
  // generateScramble
  //
  it('generateScramble', () => {
    const kilo = new Dodecaminx({ size: 2 });
    expect(kilo.generateScramble(10).split(' ').length).toBe(10);
  });

  //
  // scramble
  //
  it('scramble', () => {
    const kilo = new Dodecaminx({ size: 2 });
    expect(kilo.isSolved()).toBe(true);

    kilo.scramble();
    expect(kilo.isSolved()).toBe(false);
  });

  //
  // turns
  //
  describe('turns', () => {
    it('*U', () => {
      const kilo = new Dodecaminx({ size: 2, values: alphaValues });
      kilo.turn('*U');

      expect(kilo.output()).toEqual({
        u: [
          [['u'], ['u'], ['u'], ['u'], ['u']],
        ],
        f: [
          [['r'], ['r'], ['r'], ['r'], ['r']],
        ],
        l: [
          [['f'], ['f'], ['f'], ['f'], ['f']],
        ],
        bl: [
          [['l'], ['l'], ['l'], ['l'], ['l']],
        ],
        br: [
          [['bl'], ['bl'], ['bl'], ['bl'], ['bl']],
        ],
        r: [
          [['br'], ['br'], ['br'], ['br'], ['br']],
        ],
        d: [
          [['d'], ['d'], ['d'], ['d'], ['d']],
        ],
        b: [
          [['dbl'], ['dbl'], ['dbl'], ['dbl'], ['dbl']],
        ],
        dbl: [
          [['dl'], ['dl'], ['dl'], ['dl'], ['dl']],
        ],
        dl: [
          [['dr'], ['dr'], ['dr'], ['dr'], ['dr']],
        ],
        dr: [
          [['dbr'], ['dbr'], ['dbr'], ['dbr'], ['dbr']],
        ],
        dbr: [
          [['b'], ['b'], ['b'], ['b'], ['b']],
        ],
      });
    });
  });

  //
  // output
  //
  describe('output', () => {
    it('2', () => {
      const minx = new Dodecaminx({ size: 2, values: testValues });

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
      const minx = new Dodecaminx({ size: 3, values: testValues });

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
      const minx = new Dodecaminx({ size: 4, values: testValues });

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
      const minx = new Dodecaminx({ size: 5, values: testValues });

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
});
