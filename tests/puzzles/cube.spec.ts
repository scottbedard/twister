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
});
