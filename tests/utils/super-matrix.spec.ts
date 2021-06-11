import { SuperMatrix } from '@/utils/super-matrix';

const unique5x4: [number[][]] = [
  [
    [
      1, 2,
      3, 4,
    ],
    [
      5, 6,
      7, 8,
    ],
    [
      9, 10,
      11, 12,
    ],
    [
      13, 14,
      15, 16,
    ],
    [
      17, 18,
      19, 20,
    ],
  ],
];

const unique5x5: [number[][], number[][], number] = [
  [
    [
      1, 2,
      3, 4,
    ],
    [
      5, 6,
      7, 8,
    ],
    [
      9, 10,
      11, 12,
    ],
    [
      13, 14,
      15, 16,
    ],
    [
      17, 18,
      19, 20,
    ],
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

describe('SuperMatrix', () => {
  describe('apply', () => {
    it('5x4', () => {
      const model = new SuperMatrix(5, 4, 0);

      model.apply(unique5x4);

      expect(model.output()).toEqual(unique5x4);
    });

    it('5x5', () => {
      const model = new SuperMatrix(5, 5, 0);

      model.apply(unique5x5);

      expect(model.output()).toEqual(unique5x5);
    });
  });

  describe('output', () => {
    it('5x4', () => {
      const model = new SuperMatrix(5, 4, 1);

      expect(model.output()).toEqual([
        [
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
        ],
      ]);
    });

    it('5x5', () => {
      const model = new SuperMatrix(5, 5, 1);

      expect(model.output()).toEqual([
        [
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
          [1, 1, 1, 1],
        ],
        [
          [1, 1],
          [1, 1],
          [1, 1],
          [1, 1],
          [1, 1],
        ],
        1,
      ]);
    });
  });

  describe('rotate', () => {
    it('5x4, 1', () => {
      const model = new SuperMatrix(5, 4, 0);

      model.apply(unique5x4);

      model.rotate(1);

      expect(model.output()).toEqual([
        [
          [17, 18, 19, 20],
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
          [13, 14, 15, 16],
        ],
      ]);
    });

    it('5x5, 1', () => {
      const model = new SuperMatrix(5, 5, 0);

      model.apply(unique5x5);

      model.rotate(1);

      expect(model.output()).toEqual([
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
      ]);
    });
  });

  describe('extract', () => {
    const simplify = ([
      leading,
      middle,
      trailing,
    ]: [
      { value: number }[],
      { value: number } | undefined,
      { value: number }[],
    ]) => [
      leading.map((obj) => obj.value),
      middle?.value,
      trailing.map((obj) => obj.value),
    ];

    it('5x4', () => {
      const model = new SuperMatrix(5, 4);

      model.apply(unique5x4);

      // angle 0, depth 0
      expect(simplify(model.extract(0, 0))).toEqual([
        [1, 2], undefined, [7, 5],
      ]);

      // angle 0, depth 1
      expect(simplify(model.extract(0, 1))).toEqual([
        [3, 4], undefined, [8, 6],
      ]);

      // angle 1, depth 0
      expect(simplify(model.extract(1, 0))).toEqual([
        [5, 6], undefined, [11, 9],
      ]);

      // angle 1, depth 1
      expect(simplify(model.extract(1, 1))).toEqual([
        [7, 8], undefined, [12, 10],
      ]);
    });

    it('5x5', () => {
      const model = new SuperMatrix(5, 5);

      model.apply(unique5x5);

      // angle 0, depth 0
      expect(simplify(model.extract(0, 0))).toEqual([
        [1, 2], 21, [7, 5],
      ]);

      // angle 0, depth 1
      expect(simplify(model.extract(0, 1))).toEqual([
        [3, 4], 22, [8, 6],
      ]);

      // angle 1, depth 0
      expect(simplify(model.extract(1, 0))).toEqual([
        [5, 6], 23, [11, 9],
      ]);

      // angle 1, depth 1
      expect(simplify(model.extract(1, 1))).toEqual([
        [7, 8], 24, [12, 10],
      ]);
    });
  });
});
