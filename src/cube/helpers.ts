import {
  CubeFace,
  CubeState,
  CubeSticker,
  CubeValue,
  CubeTurn,
  CubeAxis,
} from './cube';

import {
  head,
  times,
  reverse,
  slice,
  splice,
} from '../utils/array';

import { max } from '../utils/number';
import { cols, flattenCols, flattenRows, rotate, rows } from '../utils/matrix';
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
  return times(length).map((): CubeSticker<Data> => {
    return {
      data: {},
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
 * Get stickers that are part of an B slice.
 *
 * @param {CubeState<T>} state
 * @param {CubeTurn} turn
 *
 * @param {CubeSticker<T>[]} 
 */
export function getSliceB<T>(state: CubeState<T>, turn: CubeTurn): CubeSticker<T>[] {
  const stickers: CubeSticker<T>[] = [];
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
    stickers.push(
      ...head(slicedCube.u.r, iSubOne),
      ...head(slicedCube.l.c, iSubOne),
      ...head(slicedCube.d.r, negI),
      ...head(slicedCube.r.c, negI),
    );
  });

  return stickers;
}

/**
 * Get stickers that are part of an D slice.
 *
 * @param {CubeState<T>} state
 * @param {CubeTurn} turn
 *
 * @param {CubeSticker<T>[]} 
 */
export function getSliceD<T>(state: CubeState<T>, turn: CubeTurn): CubeSticker<T>[] {
  const stickers: CubeSticker<T>[] = [];
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number) => {
    stickers.push(
      ...head(slicedCube.f.r, negI),
      ...head(slicedCube.r.r, negI),
      ...head(slicedCube.b.r, negI),
      ...head(slicedCube.l.r, negI),
    );
  });

  return stickers;
}

/**
 * Get stickers that are part of an F slice.
 *
 * @param {CubeState<T>} state
 * @param {CubeTurn} turn
 *
 * @param {CubeSticker<T>[]} 
 */
export function getSliceF<T>(state: CubeState<T>, turn: CubeTurn): CubeSticker<T>[] {
  const stickers: CubeSticker<T>[] = [];
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
    stickers.push(
      ...head(slicedCube.u.r, negI),
      ...head(slicedCube.r.c, iSubOne),
      ...head(slicedCube.d.r, iSubOne),
      ...head(slicedCube.l.c, negI),
    );
  });

  return stickers;
}

/**
 * Get stickers that are part of an L slice.
 *
 * @param {CubeState<T>} state
 * @param {CubeTurn} turn
 *
 * @param {CubeSticker<T>[]} 
 */
export function getSliceL<T>(state: CubeState<T>, turn: CubeTurn): CubeSticker<T>[] {
  const stickers: CubeSticker<T>[] = [];
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
    stickers.push(
      ...head(slicedCube.u.c, iSubOne),
      ...head(slicedCube.f.c, iSubOne),
      ...head(slicedCube.d.c, iSubOne),
      ...head(slicedCube.b.c, negI),
    );
  });

  return stickers;
}

/**
 * Get stickers that are part of an R slice.
 *
 * @param {CubeState<T>} state
 * @param {CubeTurn} turn
 *
 * @param {CubeSticker<T>[]} 
 */
export function getSliceR<T>(state: CubeState<T>, turn: CubeTurn): CubeSticker<T>[] {
  const stickers: CubeSticker<T>[] = [];
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
    stickers.push(
      ...head(slicedCube.u.c, negI),
      ...head(slicedCube.b.c, iSubOne),
      ...head(slicedCube.d.c, negI),
      ...head(slicedCube.f.c, negI),
    );
  });

  return stickers;
}

/**
 * Get stickers that are part of an U slice.
 *
 * @param {CubeState<T>} state
 * @param {CubeTurn} turn
 *
 * @param {CubeSticker<T>[]} 
 */
export function getSliceU<T>(state: CubeState<T>, turn: CubeTurn): CubeSticker<T>[] {
  const stickers: CubeSticker<T>[] = [];
  const slicedCube = sliceCube(state);

  loopSlices(turn, (i: number, negI: number, iSubOne: number) => {
    stickers.push(
      ...head(slicedCube.b.r, iSubOne),
      ...head(slicedCube.r.r, iSubOne),
      ...head(slicedCube.f.r, iSubOne),
      ...head(slicedCube.l.r, iSubOne),
    );
  });

  return stickers;
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
    depth = max(2, depth);
  }

  let rotation = 1;

  if (modifier === '-' || modifier === '\'') {
    rotation = -1;
  } else if (modifier === '2') {
    rotation = 2;
  }

  return {
    depth,
    rotation: rotation as -1 | 1 | 2,
    target,
    wide,
  };
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

type SlicedCube<T> = Record<CubeFace, SlicedFace<T>>;

export function sliceCube<T>(state: CubeState<T>): SlicedCube<T> {
  return {
    u: { r: rows(state.u), c: cols(state.u) },
    l: { r: rows(state.l), c: cols(state.l) },
    f: { r: rows(state.f), c: cols(state.f) },
    r: { r: rows(state.r), c: cols(state.r) },
    b: { r: rows(state.b), c: cols(state.b) },
    d: { r: rows(state.d), c: cols(state.d) },
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
      l: reverse(r),
      f: rotate(f, 2),
      r: reverse(l),
      b: rotate(b, 2),
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
    const oldU = head(slicedCube.u.r, iSubOne);
    const oldL = head(slicedCube.l.c, iSubOne);
    const oldD = head(slicedCube.d.r, negI);
    const oldR = head(slicedCube.r.c, negI);
        
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
    const oldF = head(slicedCube.f.r, negI);
    const oldR = head(slicedCube.r.r, negI);
    const oldB = head(slicedCube.b.r, negI);
    const oldL = head(slicedCube.l.r, negI);
        
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
    const oldU = head(slicedCube.u.r, negI);
    const oldR = head(slicedCube.r.c, iSubOne);
    const oldD = head(slicedCube.d.r, iSubOne);
    const oldL = head(slicedCube.l.c, negI);

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
    const oldU = head(slicedCube.u.c, iSubOne);
    const oldF = head(slicedCube.f.c, iSubOne);
    const oldD = head(slicedCube.d.c, iSubOne);
    const oldB = head(slicedCube.b.c, negI);

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
    const oldU = head(slicedCube.u.c, negI);
    const oldB = head(slicedCube.b.c, iSubOne);
    const oldD = head(slicedCube.d.c, negI);
    const oldF = head(slicedCube.f.c, negI);
        
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
    const oldB = head(slicedCube.b.r, iSubOne);
    const oldR = head(slicedCube.r.r, iSubOne);
    const oldF = head(slicedCube.f.r, iSubOne);
    const oldL = head(slicedCube.l.r, iSubOne);

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

/**
 * Test if a turn target is an axis.
 *
 * @param {CubeFace | CubeAxis} target
 *
 * @return {boolean}
 */
export function turnTargetIsAxis(target: CubeFace | CubeAxis): target is CubeAxis {
  return ['x', 'y', 'z'].includes(target.toLowerCase());
}
