import {
  CompositeLayer,
  CompositeMatrix,
  createComposite,
  extractComposite,
  injectComposite,
  mapComposite,
  rotateComposite,
} from '@/utils/composite-matrix'

const stub5x3: CompositeMatrix<number> = [
  [
    [1],
    [2],
    [3],
    [4],
    [5],
  ],
  [
    [6],
    [7],
    [8],
    [9],
    [10],
  ],
  11,
]

const stub5x4: CompositeMatrix<number> = [
  [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
    [13, 14, 15, 16],
    [17, 18, 19, 20],
  ],
]

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
]

describe('composite matrix', () => {
  describe('createComposite', () => {
    it('5x3', () => {
      let i = 1
      expect(createComposite(5, 3, () => i++)).toEqual(stub5x3)
    })

    it('5x4', () => {
      let i = 1
      expect(createComposite(5, 4, () => i++)).toEqual(stub5x4)
    })

    it('5x5', () => {
      let i = 1
      expect(createComposite(5, 5, () => i++)).toEqual(stub5x5)
    })
  })

  describe('extractComposite', () => {
    describe('5x4', () => {
      it('angle 0, depth 0', () => {
        expect(extractComposite(stub5x4, 0, 0)).toEqual([[1, 2], undefined, [7, 5]])
      })

      it('angle 0, depth 1', () => {
        expect(extractComposite(stub5x4, 0, 1)).toEqual([[3, 4], undefined, [8, 6]])
      })

      it('angle 1, depth 0', () => {
        expect(extractComposite(stub5x4, 1, 0)).toEqual([[5, 6], undefined, [11, 9]])
      })

      it('angle 1, depth 1', () => {
        expect(extractComposite(stub5x4, 1, 1)).toEqual([[7, 8], undefined, [12, 10]])
      })
    })

    describe('5x5', () => {
      it('angle 0, depth 0', () => {
        expect(extractComposite(stub5x5, 0, 0)).toEqual([[1, 2], 21, [7, 5]])
      })

      it('angle 0, depth 1', () => {
        expect(extractComposite(stub5x5, 0, 1)).toEqual([[3, 4], 22, [8, 6]])
      })

      it('angle 1, depth 0', () => {
        expect(extractComposite(stub5x5, 1, 0)).toEqual([[5, 6], 23, [11, 9]])
      })

      it('angle 1, depth 1', () => {
        expect(extractComposite(stub5x5, 1, 1)).toEqual([[7, 8], 24, [12, 10]])
      })
    })
  })

  describe('injectComposite', () => {
    describe('5x4', () => {
      const layer: CompositeLayer<number> = [[-1, -2], undefined, [-3, -4]]

      it('angle 0, depth 0', () => {
        const composite = injectComposite(stub5x4, layer, 0, 0)

        expect(extractComposite(composite, 0, 0)).toEqual(layer)
      })

      it('angle 0, depth 1', () => {
        const composite = injectComposite(stub5x4, layer, 0, 1)

        expect(extractComposite(composite, 0, 1)).toEqual(layer)
      })

      it('angle 1, depth 0', () => {
        const composite = injectComposite(stub5x4, layer, 1, 0)

        expect(extractComposite(composite, 1, 0)).toEqual(layer)
      })

      it('angle 1, depth 1', () => {
        const composite = injectComposite(stub5x4, layer, 1, 1)

        expect(extractComposite(composite, 1, 1)).toEqual(layer)
      })
    })

    describe('5x5', () => {
      const layer: CompositeLayer<number> = [[-1, -2], undefined, [-3, -4]]

      it('angle 0, depth 0', () => {
        const composite = injectComposite(stub5x5, layer, 0, 0)

        expect(extractComposite(composite, 0, 0)).toEqual(layer)
      })

      it('angle 0, depth 1', () => {
        const composite = injectComposite(stub5x5, layer, 0, 1)

        expect(extractComposite(composite, 0, 1)).toEqual(layer)
      })

      it('angle 1, depth 0', () => {
        const composite = injectComposite(stub5x5, layer, 1, 0)

        expect(extractComposite(composite, 1, 0)).toEqual(layer)
      })

      it('angle 1, depth 1', () => {
        const composite = injectComposite(stub5x5, layer, 1, 1)

        expect(extractComposite(composite, 1, 1)).toEqual(layer)
      })
    })
  })

  describe('mapComposite', () => {
    const negative = (n: number) => -n

    it('5x4', () => {
      expect(mapComposite(stub5x4, negative)).toEqual([
        [
          [-1, -2, -3, -4],
          [-5, -6, -7, -8],
          [-9, -10, -11, -12],
          [-13, -14, -15, -16],
          [-17, -18, -19, -20],
        ],
      ])
    })

    it('5x5', () => {
      expect(mapComposite(stub5x5, negative)).toEqual([
        [
          [-1, -2, -3, -4],
          [-5, -6, -7, -8],
          [-9, -10, -11, -12],
          [-13, -14, -15, -16],
          [-17, -18, -19, -20],
        ],
        [
          [-21, -22],
          [-23, -24],
          [-25, -26],
          [-27, -28],
          [-29, -30],
        ],
        -31,
      ])
    })
  })

  describe('rotateComposite', () => {
    it('5x4, rotate 1', () => {
      expect(rotateComposite(stub5x4, 1)).toEqual([
        [
          [17, 18, 19, 20],
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
        ],
      ])
    })

    it('5x5, rotate 1', () => {
      expect(rotateComposite(stub5x5, 1)).toEqual([
        [
          [17, 18, 19, 20],
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
        ],
        [
          [29, 30],
          [21, 22],
          [23, 24],
          [25, 26],
          [27, 28],
        ],
        31,
      ])
    })
  })
})
