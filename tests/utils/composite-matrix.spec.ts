import {
  CompositeLayer,
  CompositeMatrix,
  extractComposite,
  injectComposite,
} from '@/utils/composite-matrix';

const stub5x4: CompositeMatrix<number> = [
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ],
];

const stub5x5: CompositeMatrix<number> = [
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ],
  [
    [21, 22],
    [23, 24],
    [25, 26],
    [27, 28],
    [29, 30],
  ],
  31,
];

describe('composite matrix', () => {
  describe('extractComposite', () => {
    describe('5x4', () => {
      it('angle 0, depth 0', () => {
        expect(extractComposite(stub5x4, 0, 0)).toEqual([[1, 2], undefined, [7, 5]]);
      });

      it('angle 0, depth 1', () => {
        expect(extractComposite(stub5x4, 0, 1)).toEqual([[3, 4], undefined, [8, 6]]);
      });

      it('angle 1, depth 0', () => {
        expect(extractComposite(stub5x4, 1, 0)).toEqual([[5, 6], undefined, [11, 9]]);
      });

      it('angle 1, depth 1', () => {
        expect(extractComposite(stub5x4, 1, 1)).toEqual([[7, 8], undefined, [12, 10]]);
      });
    });

    describe('5x5', () => {
      it('angle 0, depth 0', () => {
        expect(extractComposite(stub5x5, 0, 0)).toEqual([[1, 2], 21, [7, 5]]);
      });

      it('angle 0, depth 1', () => {
        expect(extractComposite(stub5x5, 0, 1)).toEqual([[3, 4], 22, [8, 6]]);
      });

      it('angle 1, depth 0', () => {
        expect(extractComposite(stub5x5, 1, 0)).toEqual([[5, 6], 23, [11, 9]]);
      });

      it('angle 1, depth 1', () => {
        expect(extractComposite(stub5x5, 1, 1)).toEqual([[7, 8], 24, [12, 10]]);
      });
    });
  });

  describe('injectComposite', () => {
    describe('5x4', () => {
      const layer: CompositeLayer<number> = [[-1, -2], undefined, [-3, -4]];

      it('angle 0, depth 0', () => {
        const composite = injectComposite(stub5x4, layer, 0, 0);

        expect(extractComposite(composite, 0, 0)).toEqual(layer);
      });

      it('angle 0, depth 1', () => {
        const composite = injectComposite(stub5x4, layer, 0, 1);

        expect(extractComposite(composite, 0, 1)).toEqual(layer);
      });

      it('angle 1, depth 0', () => {
        const composite = injectComposite(stub5x4, layer, 1, 0);

        expect(extractComposite(composite, 1, 0)).toEqual(layer);
      });

      it('angle 1, depth 1', () => {
        const composite = injectComposite(stub5x4, layer, 1, 1);

        expect(extractComposite(composite, 1, 1)).toEqual(layer);
      });
    });

    describe('5x5', () => {
      const layer: CompositeLayer<number> = [[-1, -2], undefined, [-3, -4]];

      it('angle 0, depth 0', () => {
        const composite = injectComposite(stub5x5, layer, 0, 0);

        expect(extractComposite(composite, 0, 0)).toEqual(layer);
      });

      it('angle 0, depth 1', () => {
        const composite = injectComposite(stub5x5, layer, 0, 1);

        expect(extractComposite(composite, 0, 1)).toEqual(layer);
      });

      it('angle 1, depth 0', () => {
        const composite = injectComposite(stub5x5, layer, 1, 0);

        expect(extractComposite(composite, 1, 0)).toEqual(layer);
      });

      it('angle 1, depth 1', () => {
        const composite = injectComposite(stub5x5, layer, 1, 1);

        expect(extractComposite(composite, 1, 1)).toEqual(layer);
      });
    });
  });
});
