/* eslint-disable quote-props */
import { Cube } from '@/index';

describe('Cube', () => {
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

  it('parse', () => {
    const model = new Cube({ size: 2 });

    const turns = {
      'R': {
        depth: 1,
        rotation: 1,
        target: 'r',
        wide: false,
      },
      'R\'': {
        depth: 1,
        rotation: -1,
        target: 'r',
        wide: false,
      },
      '2R': {
        depth: 2,
        rotation: 1,
        target: 'r',
        wide: false,
      },
      'Rw': {
        depth: 2,
        rotation: 1,
        target: 'r',
        wide: true,
      },
      '3Rw2': {
        depth: 3,
        rotation: 2,
        target: 'r',
        wide: true,
      },
    };

    (Object.keys(turns) as (keyof typeof turns)[]).forEach((key) => {
      expect(model.parse(key)).toEqual(turns[key]);
    });

    expect(() => model.parse('bad turn')).toThrow();
  });

  it.skip('turn', () => {
    const model = new Cube({ size: 3 });

    model.turn('R');

    console.log(model.output());
  });
});
