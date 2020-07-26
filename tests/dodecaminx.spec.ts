/* eslint-disable */
import { DodecaminxTurn } from '../src/dodecaminx/dodecaminx';

import Dodecaminx from '../src/dodecaminx/dodecaminx';
import { parseDodecaminxTurn } from '../src/dodecaminx/helpers';

describe('dodecaminx', () => {
  it('throws an error if the size is not an integer', () => {
    expect(() => new Dodecaminx({ size: 3.5 })).toThrow();
  });

  it('throws an error if the size is less than two', () => {
    expect(() => new Dodecaminx({ size: 1 })).toThrow();
  });

  it('creates a center sticker for odd sizes', () => {
    const even = new Dodecaminx({ size: 2 });
    const odd = new Dodecaminx({ size: 3 });

    expect(even.state.f.center).toBe(null);
    expect(odd.state.f.center).not.toBe(null);
  });

  describe('parseDodecaminxTurn', () => {
    const turns: { [key: string]: DodecaminxTurn } = {
      'F': { depth: 1, rotation: 1, target: 'f', wide: false },
      'F2': { depth: 1, rotation: 2, target: 'f', wide: false },
      'F-': { depth: 1, rotation: -1, target: 'f', wide: false },
      'F2-': { depth: 1, rotation: -2, target: 'f', wide: false },
      'Fw': { depth: 2, rotation: 1, target: 'f', wide: true },
      'Fw-': { depth: 2, rotation: -1, target: 'f', wide: true },
      '2F': { depth: 2, rotation: 1, target: 'f', wide: false },
    };

    Object.keys(turns).forEach(turn => {
      it(turn, () => {
        expect(parseDodecaminxTurn(turn)).toEqual(turns[turn]);
      });
    });
  });
});
