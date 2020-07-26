import {
  CubeFace,
  CubeState,
  CubeSticker,
  CubeValue,
  CubeTurn,
} from './cube';

import {
  chunkCols,
  chunkRows,
  first,
  flip,
  times,
  reverse,
  slice,
  splice,
} from '../utils/array';

import { error } from '../utils/function';

/**
 * Create an array of stickers.
 *
 * @param {CubeValue} value 
 * @param {number} length
 *
 * @return {CubeSticker[]} 
 */
export function createFace<Data>(value: CubeValue, length: number): CubeSticker<Data>[] {
  return times(length).map((x, i): CubeSticker<Data> => {
    return {
      data: {},
      meta: {},
      originalIndex: i,
      value,
    };
  })
}

/**
 * Test if a face is solved.
 *
 * @param {CubeSticker[]} face
 *
 * @return {boolean}
 */
export function faceIsSolved<T>(stickers: CubeSticker<T>[]): boolean {
  const value = stickers[0].value;

  for (let i = 1; i < stickers.length; i++) {
    if (stickers[i].value !== value) {
      return false;
    }
  }

  return true;
}

/**
 * Flatten an array of columns.
 *
 * [                    [
 *     [1, 4, 7],           1, 2, 3,
 *     [2, 5, 8],  ->       4, 5, 6,
 *     [3, 6, 9],           7, 8, 9,
 * ]                    ]
 *
 * @param {T[][]} cols
 *
 * @return {T[]}
 */
export function flattenCols<T>(cols: T[][]): T[] {
  return flattenRows(flip(cols));
}

/**
 * Flatten an array of rows.
 *
 * [                    [
 *     [1, 2, 3],           1, 2, 3,
 *     [4, 5, 6],  ->       4, 5, 6,
 *     [7, 8, 9],           7, 8, 9,
 * ]                    ]
 *
 * @param {T[][]} rows
 *
 * @return {T[]}
 */
export function flattenRows<T>(rows: T[][]): T[] {
  return rows.reduce((acc, row) => acc.concat(row), []);
}

/**
 * Get the face being turned.
 *
 * @param {CubeTurn} turn
 *
 * @return {CubeFace} 
 */
export function getFace(turn: CubeTurn): CubeFace {
  const { target } = turn;

  switch (target) {
  case 'u': return 'u';
  case 'l': return 'l';
  case 'f': return 'f';
  case 'r': return 'r';
  case 'b': return 'b';
  case 'd': return 'd';
  }
}

/**
 * Get the opposite face.
 *
 * @param {CubeTurn} turn
 *
 * @return {CubeFace} 
 */
export function getOppositeFace(turn: CubeTurn): CubeFace {
  const { target } = turn;

  type Map = { [K in CubeFace]: CubeFace }

  return ({
    u: 'd',
    l: 'r',
    f: 'b',
    r: 'l',
    b: 'f',
    d: 'u',
  } as Map)[target as CubeFace];
}

/**
 * Itterate over the slices of a turn.
 *
 * @param {CubeTurn} turn 
 * @param {Function} fn
 *
 * @return {void}
 */
type LoopSlicesFn = (a: number, b: number, c: number) => void;

export function loopSlices(turn: CubeTurn, fn: LoopSlicesFn): void {
  const { depth, wide } = turn;

  for (let i = depth, end = wide ? 0 : depth - 1; i > end; i--) {
    fn(i, -i, i - 1);
  }
}

/**
 * Parse a turn.
 *
 * @param {string} turn
 *
 * @return {CubeTurn} 
 */
export function parseTurn(turn: string): CubeTurn {
  const result = turn.match(/^(\d)*([ulfrbdxyzULFRBDXYZ]){1}(w)*(['-2])*$/);

  if (result === null) {
    error(`Invalid turn: ${turn}`);
  }

  const modifier: string = result[4];
  const target: CubeFace = <CubeFace>result[2].toLowerCase();
  const wide = Boolean(result[3]);

  let depth: number = result[1] ? parseInt(result[1], 10) : 1;

  if (wide) {
    depth = Math.max(2, depth);
  }

  let rotation = 1;

  if (modifier === '-' || modifier === '\'') {
    rotation = -1;
  } else if (modifier === '2') {
    rotation = 2;
  }

  return { depth, rotation, target, wide };
}

/**
 * Rotate a face array.
 *
 * @param {T[]} arr
 * @param {number} rotation
 *
 * @param {CubeSticker[]} 
 */
export function rotate<T>(arr: T[], rotation: number): T[] {
  if (rotation === -1) {
    return flattenRows(reverse(chunkCols(arr)));
  }
    
  if (rotation === 2) {
    return reverse(arr);
  }
    
  return flattenCols(reverse(chunkRows(arr)));
}

/**
 * Simplify a cube face
 */
export function simplifyFace<T>(face: CubeSticker<T>[]): CubeValue[] {
  return face.map(sticker => sticker.value);
}

/**
 * Slice a cube into each face's rows and columns.
 *
 * @param {CubeState} cube
 *
 * @return {object}
 */
type SlicedFace<T> = {
    c: CubeSticker<T>[][],
    r: CubeSticker<T>[][],
};

type SlicedCube<T> = {
    u: SlicedFace<T>,
    l: SlicedFace<T>,
    f: SlicedFace<T>,
    r: SlicedFace<T>,
    b: SlicedFace<T>,
    d: SlicedFace<T>,
}
export function sliceCube<T>(state: CubeState<T>): SlicedCube<T> {
  return {
    u: { r: chunkRows(state.u), c: chunkCols(state.u) },
    l: { r: chunkRows(state.l), c: chunkCols(state.l) },
    f: { r: chunkRows(state.f), c: chunkCols(state.f) },
    r: { r: chunkRows(state.r), c: chunkCols(state.r) },
    b: { r: chunkRows(state.b), c: chunkCols(state.b) },
    d: { r: chunkRows(state.d), c: chunkCols(state.d) },
  };
}

/**
 * Convert a turn object to a string.
 *
 * @param {CubeTurn} turn
 *
 * @return {string}
 */
export function stringifyTurn(turn: CubeTurn): string {
  // prefix
  let prefix: number | string = '';

  if ((turn.depth > 1 && !turn.wide) || turn.depth > 2) {
    prefix = turn.depth;
  }

  // modifier
  const modifier = turn.wide ? 'w' : '';

  // suffix
  const suffix = turn.rotation === -1 ? '-' : turn.rotation === 2 ? '2' : '';

  return `${prefix}${turn.target.toUpperCase()}${modifier}${suffix}`;
}

/**
 * Turn a cube along the X axis.
 *
 * @param {CubeState} state
 * @param {CubeTurn} turn
 *
 * @return {CubeState}
 */
export function turnCubeX<T>({ u, l, f, r, b, d }: CubeState<T>, { rotation }: CubeTurn): CubeState<T> {
  if (rotation === -1) {
    return {
      u: reverse(b),
      l: rotate(l, 1),
      f: slice(u),
      r: rotate(r, -1),
      b: reverse(d),
      d: slice(f),
    };
  }

  if (rotation === 2) {
    return {
      u: slice(d),
      l: rotate(l, 2),
      f: reverse(b),
      r: rotate(r, 2),
      b: reverse(f),
      d: slice(u),
    };
  }

  return {
    u: slice(f),
    l: rotate(l, -1),
    f: slice(d),
    r: rotate(r, 1),
    b: reverse(u),
    d: reverse(b),
  }
}

/**
 * Turn a cube along the Y axis.
 *
 * @param {CubeState} state
 * @param {CubeTurn} turn
 *
 * @return {CubeState}
 */
export function turnCubeY<T>({ u, l, f, r, b, d }: CubeState<T>, { rotation }: CubeTurn): CubeState<T> {
  if (rotation === -1) {
    return {
      u: rotate(u, -1),
      l: slice(b),
      f: slice(l),
      r: slice(f),
      b: slice(r),
      d: rotate(d, 1),
    };
  }

  if (rotation === 2) {
    return {
      u: rotate(u, 2),
      l: slice(r),
      f: slice(b),
      r: slice(l),
      b: slice(f),
      d: rotate(d, 2),
    };
  }

  return {
    u: rotate(u, 1),
    l: slice(f),
    f: slice(r),
    r: slice(b),
    b: slice(l),
    d: rotate(d, -1),
  };
}

/**
 * Turn a cube along the Z axis.
 *
 * @param {CubeState} state
 * @param {CubeTurn} turn
 *
 * @return {CubeState}
 */
export function turnCubeZ<T>({ u, l, f, r, b, d }: CubeState<T>, { rotation }: CubeTurn): CubeState<T> {
  if (rotation === -1) {
    return {
      u: rotate(r, -1),
      l: rotate(u, -1),
      f: rotate(f, -1),
      r: rotate(d, -1),
      b: rotate(b, 1),
      d: rotate(l, -1),
    }
  }

  if (rotation === 2) {
    return {
      u: reverse(d),
      l: reverse(r), f: rotate(f, 2), r: reverse(l), b: rotate(b, 2),
      d: reverse(u),
    }
  }
    
  return {
    u: rotate(l, 1),
    l: rotate(d, 1),
    f: rotate(f, 1),
    r: rotate(u, 1),
    b: rotate(b, -1),
    d: rotate(r, 1),
  };
}

/**
 * Turn slices for a B turn.
 *
 * @param {CubeState} state
 * @param {CubeTurn} turn
 *
 * @return {CubeState}
 */
export function turnSliceB<T>(state: CubeState<T>, turn: CubeTurn): void {
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
    const oldU = first(slicedCube.u.r, iSubOne);
    const oldL = first(slicedCube.l.c, iSubOne);
    const oldD = first(slicedCube.d.r, negI);
    const oldR = first(slicedCube.r.c, negI);
        
    let newU, newL, newD, newR;

    if (turn.rotation === 2) {
      // 180
      newU = reverse(oldD);
      newL = reverse(oldR);
      newD = reverse(oldU);
      newR = reverse(oldL);
    } else if (turn.rotation === -1) {
      // 90 counter-clockwise
      newU = reverse(oldL);
      newL = oldD;
      newD = reverse(oldR);
      newR = oldU;
    } else {
      // 90 clockwise
      newU = oldR;
      newL = reverse(oldU);
      newD = oldL;
      newR = reverse(oldD);
    }

    splice(slicedCube.u.r, i - 1, 1, newU);
    splice(slicedCube.l.c, i - 1, 1, newL);
    splice(slicedCube.d.r, negI, 1, newD);
    splice(slicedCube.r.c, negI, 1, newR);

    state.u = flattenRows(slicedCube.u.r);
    state.l = flattenCols(slicedCube.l.c);
    state.d = flattenRows(slicedCube.d.r);
    state.r = flattenCols(slicedCube.r.c);
  });
}

/**
 * Turn slices for a D turn.
 *
 * @param {CubeState} state
 * @param {CubeTurn} turn
 *
 * @return {CubeState}
 */
export function turnSliceD<T>(state: CubeState<T>, turn: CubeTurn): void {
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number) => {
    const oldF = first(slicedCube.f.r, negI);
    const oldR = first(slicedCube.r.r, negI);
    const oldB = first(slicedCube.b.r, negI);
    const oldL = first(slicedCube.l.r, negI);
        
    let newF, newR, newB, newL;

    if (turn.rotation === 2) {
      // 180
      newF = oldB;
      newR = oldL;
      newB = oldF;
      newL = oldR;
    } else if (turn.rotation === -1) {
      // 90 counter-clockwise
      newF = oldR;
      newR = oldB;
      newB = oldL;
      newL = oldF;
    } else {
      // 90 clockwise
      newF = oldL;
      newR = oldF;
      newB = oldR;
      newL = oldB;
    }

    splice(slicedCube.f.r, negI, 1, newF);
    splice(slicedCube.r.r, negI, 1, newR);
    splice(slicedCube.b.r, negI, 1, newB);
    splice(slicedCube.l.r, negI, 1, newL);

    state.f = flattenRows(slicedCube.f.r);
    state.r = flattenRows(slicedCube.r.r);
    state.b = flattenRows(slicedCube.b.r);
    state.l = flattenRows(slicedCube.l.r);
  });
}

/**
 * Turn slices for a F turn.
 *
 * @param {CubeState} state
 * @param {CubeTurn} turn
 *
 * @return {CubeState}
 */
export function turnSliceF<T>(state: CubeState<T>, turn: CubeTurn): void {
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
    const oldU = first(slicedCube.u.r, negI);
    const oldR = first(slicedCube.r.c, iSubOne);
    const oldD = first(slicedCube.d.r, iSubOne);
    const oldL = first(slicedCube.l.c, negI);

    let newU, newR, newD, newL;

    if (turn.rotation === 2) {
      // 180
      newU = reverse(oldD);
      newR = reverse(oldL);
      newD = reverse(oldU);
      newL = reverse(oldR);
    } else if (turn.rotation === -1) {
      // 90 counter-clockwise
      newU = oldR;
      newR = reverse(oldD);
      newD = oldL;
      newL = reverse(oldU);
    } else {
      // 90 clockwise
      newU = reverse(oldL);
      newR = oldU;
      newD = reverse(oldR);
      newL = oldD;
    }

    splice(slicedCube.u.r, negI, 1, newU);
    splice(slicedCube.r.c, iSubOne, 1, newR);
    splice(slicedCube.d.r, iSubOne, 1, newD);
    splice(slicedCube.l.c, negI, 1, newL);

    state.u = flattenRows(slicedCube.u.r);
    state.r = flattenCols(slicedCube.r.c);
    state.d = flattenRows(slicedCube.d.r);
    state.l = flattenCols(slicedCube.l.c);
  });
}

/**
 * Turn slices for a L turn.
 *
 * @param {CubeState} state
 * @param {CubeTurn} turn
 *
 * @return {CubeState}
 */
export function turnSliceL<T>(state: CubeState<T>, turn: CubeTurn): void {
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
    const oldU = first(slicedCube.u.c, iSubOne);
    const oldF = first(slicedCube.f.c, iSubOne);
    const oldD = first(slicedCube.d.c, iSubOne);
    const oldB = first(slicedCube.b.c, negI);

    let newU, newF, newD, newB;

    if (turn.rotation === 2) {
      // 180
      newU = oldD;
      newF = reverse(oldB);
      newD = oldU;
      newB = reverse(oldF);
    } else if (turn.rotation === -1) {
      // 90 counter-clockwise
      newU = oldF;
      newF = oldD;
      newD = reverse(oldB);
      newB = reverse(oldU);
    } else {
      // 90 clockwise
      newU = reverse(oldB);
      newF = oldU;
      newD = oldF;
      newB = reverse(oldD);
    }

    splice(slicedCube.u.c, iSubOne, 1, newU);
    splice(slicedCube.f.c, iSubOne, 1, newF);
    splice(slicedCube.d.c, iSubOne, 1, newD);
    splice(slicedCube.b.c, negI, 1, newB);

    state.u = flattenCols(slicedCube.u.c);
    state.f = flattenCols(slicedCube.f.c);
    state.d = flattenCols(slicedCube.d.c);
    state.b = flattenCols(slicedCube.b.c);
  });
}

/**
 * Turn slices for a R turn.
 *
 * @param {CubeState} state
 * @param {CubeTurn} turn
 *
 * @return {CubeState}
 */
export function turnSliceR<T>(state: CubeState<T>, turn: CubeTurn): void {
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
    const oldU = first(slicedCube.u.c, negI);
    const oldB = first(slicedCube.b.c, iSubOne);
    const oldD = first(slicedCube.d.c, negI);
    const oldF = first(slicedCube.f.c, negI);
        
    let newU, newB, newD, newF;

    if (turn.rotation === 2) {
      // 180
      newU = oldD;
      newB = reverse(oldF);
      newD = oldU;
      newF = reverse(oldB);
    } else if (turn.rotation === -1) {
      // 90 counter-clockwise
      newU = reverse(oldB);
      newB = reverse(oldD);
      newD = oldF;
      newF = oldU;
    } else {
      // 90 clockwise
      newU = oldF;
      newB = reverse(oldU);
      newD = reverse(oldB);
      newF = oldD;
    }

    splice(slicedCube.u.c, negI, 1, newU);
    splice(slicedCube.b.c, iSubOne, 1, newB);
    splice(slicedCube.d.c, negI, 1, newD);
    splice(slicedCube.f.c, negI, 1, newF);

    state.u = flattenCols(slicedCube.u.c);
    state.b = flattenCols(slicedCube.b.c);
    state.d = flattenCols(slicedCube.d.c);
    state.f = flattenCols(slicedCube.f.c);
  });
}

/**
 * Turn slices for a R turn.
 *
 * @param {CubeState} state
 * @param {CubeTurn} turn
 *
 * @return {CubeState}
 */
export function turnSliceU<T>(state: CubeState<T>, turn: CubeTurn): void {
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
    const oldB = first(slicedCube.b.r, iSubOne);
    const oldR = first(slicedCube.r.r, iSubOne);
    const oldF = first(slicedCube.f.r, iSubOne);
    const oldL = first(slicedCube.l.r, iSubOne);

    let newB, newR, newF, newL;

    if (turn.rotation === 2) {
      // 180
      newB = oldF;
      newR = oldL;
      newF = oldB;
      newL = oldR;
    } else if (turn.rotation === -1) {
      // 90 counter-clockwise
      newB = oldR;
      newR = oldF;
      newF = oldL;
      newL = oldB;
    } else {
      // 90 clockwise
      newB = oldL;
      newR = oldB;
      newF = oldR;
      newL = oldF;
    }

    splice(slicedCube.b.r, iSubOne, 1, newB);
    splice(slicedCube.r.r, iSubOne, 1, newR);
    splice(slicedCube.f.r, iSubOne, 1, newF);
    splice(slicedCube.l.r, iSubOne, 1, newL);

    state.b = flattenRows(slicedCube.b.r);
    state.r = flattenRows(slicedCube.r.r);
    state.f = flattenRows(slicedCube.f.r);
    state.l = flattenRows(slicedCube.l.r);
  });
}
