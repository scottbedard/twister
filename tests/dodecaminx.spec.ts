/* eslint-disable */
import { PolygonFace } from '../src/utils/polygon';
import { DodecaminxTurn } from '../src/dodecaminx/dodecaminx';

import Dodecaminx from '../src/dodecaminx/dodecaminx';
import { parseDodecaminxTurn } from '../src/dodecaminx/helpers';

// helpers to map sticker falues
const mv = (face: PolygonFace) => face.stickers.map(s => s.value);

describe('dodecaminx', () => {
  it('throws an error if the size is not an integer', () => {
    expect(() => new Dodecaminx({ size: 3.5 })).toThrow();
  });

  it('throws an error if the size is less than two', () => {
    expect(() => new Dodecaminx({ size: 1 })).toThrow();
  });

  it('sets the initial state', () => {
    const kilominx = new Dodecaminx({ size: 2 });
    const { U, F, L, R, BL, BR, DL, DR, DBL, DBR, B, D } = kilominx.state;

    expect(mv(U)).toEqual([0, 0, 0, 0, 0]);
    expect(mv(F)).toEqual([1, 1, 1, 1, 1]);
    expect(mv(L)).toEqual([2, 2, 2, 2, 2]);
    expect(mv(R)).toEqual([3, 3, 3, 3, 3]);
    expect(mv(BL)).toEqual([4, 4, 4, 4, 4]);
    expect(mv(BR)).toEqual([5, 5, 5, 5, 5]);
    expect(mv(DL)).toEqual([6, 6, 6, 6, 6]);
    expect(mv(DR)).toEqual([7, 7, 7, 7, 7]);
    expect(mv(DBL)).toEqual([8, 8, 8, 8, 8]);
    expect(mv(DBR)).toEqual([9, 9, 9, 9, 9]);
    expect(mv(B)).toEqual([10, 10, 10, 10, 10]);
    expect(mv(D)).toEqual([11, 11, 11, 11, 11]);
  });

  describe('parseDodecaminxTurn', () => {
    const turns: { [key: string]: DodecaminxTurn } = {
      'F': { depth: 1, rotation: 1, target: 'F', wide: false },
      'F2': { depth: 1, rotation: 2, target: 'F', wide: false },
      'F-': { depth: 1, rotation: -1, target: 'F', wide: false },
      'F2-': { depth: 1, rotation: -2, target: 'F', wide: false },
      'Fw': { depth: 2, rotation: 1, target: 'F', wide: true },
      'Fw-': { depth: 2, rotation: -1, target: 'F', wide: true },
      '2F': { depth: 2, rotation: 1, target: 'F', wide: false },
    };

    Object.keys(turns).forEach(turn => {
      it(turn, () => {
        expect(parseDodecaminxTurn(turn)).toEqual(turns[turn]);
      });
    });
  });
});
