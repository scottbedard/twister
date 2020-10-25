import {
  DodecaminxFace,
  DodecaminxFaceObject,
  DodecaminxFaceSimple,
  DodecaminxSliceObject,
  DodecaminxState,
  DodecaminxSticker,
  DodecaminxTurn,
  DodecaminxValue,
} from './dodecaminx';

import { net } from './constants';
import { cols, rows } from '../utils/matrix';
import { error } from '../utils/function';
import { isOdd } from '../utils/number';
import { roll, splice, times } from '../utils/array';

/**
 * Create a face of values
 */
export function createFace<Data>(size: number, initialValue: DodecaminxValue = null): DodecaminxFaceObject<Data> {
  const gridSize = Math.floor(size / 2);
  const odd = isOdd(size);
  const val = () => ({ data: {} as Data, value: initialValue });

  const center = odd ? val() : null;
  const corners = times(5).map(() => times(gridSize ** 2).map(val));
  const middles = odd ? times(5).map(() => times(gridSize).map(val)) : [];
  
  return {
    center,
    corners,
    middles,
  };
}

/**
 * Extract a slice of stickers from a face at a given angle.
 *
 * @param {DodecaminxFaceObject} face
 * @param {number} depth
 * @param {number} angle
 *
 * @return {DodecaminxSlice}
 */
export function extractSlice<T>(face: DodecaminxFaceObject<T>, depth: number, angle: number): DodecaminxSliceObject<T> {
  const rotatedFace = rotateFace(face, angle);
  const leadingRows = rows(rotatedFace.corners[0]);
  const trailingCols = cols(rotatedFace.corners[1]);

  return {
    leading: leadingRows[depth - 1],
    middle: rotatedFace.middles?.[0]?.[depth - 1] ?? null,
    trailing: trailingCols[depth - 1],
  };
}

/**
 * Inject a slice into a face object.
 *
 * @param {DodecaminxFaceObject} face
 * @param {DodecaminxSliceObject} slice
 * @param {number} depth
 * @param {number} angle
 *
 * @return {void}
 */
export function injectSlice<T>(target: DodecaminxFaceObject<T>, source: DodecaminxSliceObject<T>, depth: number, angle: number): void {
  const targetSlice = extractSlice(target, depth, angle);

  targetSlice.leading.forEach((obj, i) => {
    const matrix = target.corners.find(arr => arr.includes(obj));
    splice(matrix, matrix.indexOf(obj), 1, source.leading[i]);
  });

  if (targetSlice.middle) {
    const middles = target.middles.find(arr => arr.includes(targetSlice.middle));
    splice(middles, middles.indexOf(targetSlice.middle), 1, source.middle);
  }

  targetSlice.trailing.forEach((obj, i) => {
    const matrix = target.corners.find(arr => arr.includes(obj));
    splice(matrix, matrix.indexOf(obj), 1, source.trailing[i]);
  });
}

/**
 * Parse a dodecaminx turn.
 *
 * @param {string}  turn
 *
 * @return {DodecaminxTurn}
 */
export function parseDodecaminxTurn(turn: string): DodecaminxTurn {
  const result = turn.match(/^(\d)*(u|f|l|r|bl|br|dl|dr|dbl|dbr|b|d|U|F|L|R|BL|BR|DL|DR|DBL|DBR|B|D){1}(w)?(2)?(['-])?$/);

  if (result === null) {
    error(`Invalid turn: ${turn}`);
  }

  let depth: number = result[1] ? parseInt(result[1], 10) : 1;
  const target = result[2];
  const wide = Boolean(result[3]);
  let rotation: number = result[4] ? parseInt(result[4], 10) : 1;
  const modifier: string = result[5];

  if (wide && !result[1]) {
    depth = 2;
  }

  if (modifier === '-' || modifier === '\'') {
    rotation *= -1;
  }

  return {
    depth,
    rotation,
    target: target.toLowerCase() as DodecaminxFace,
    wide,
    whole: false,
  };
}

/**
 * Rotate a face.
 *
 * @param {DodecaminxFaceObject<T>} face
 * @param {number} rotation
 *
 * @param {DodecaminxFaceObject<T>}
 */
export function rotateFace<T>(face: DodecaminxFaceObject<T>, rotation: number): DodecaminxFaceObject<T> {
  return {
    center: face.center,
    corners: roll(face.corners, -rotation),
    middles: roll(face.middles, -rotation),
  };
}

/**
 * Rotate slices around a given face.
 *
 * @param {DodecaminxState} state
 * @param {DodecaminxFace} target
 * @param {number} depth
 * @param {number} rotation
 *
 * @return {void}
 */
export function rotateSlices<T>(state: DodecaminxState<T>, target: DodecaminxFace, depth: number, rotation: number): void {
  const adjacentFaces = net[target];
  const adjacentSlices = roll(net[target].map(([face, angle]) => extractSlice(state[face], depth, -angle)), -rotation);

  adjacentFaces.forEach(([face, angle], i) => {
    injectSlice(state[face], adjacentSlices[i], depth, -angle);
  });
}

/**
 * Simplify a puzzle face
 *
 * @param {DodecaminxFaceObject<T>} face
 *
 * @return {DodecaminxFaceSimple}
 */
export function simplifyFace<T>(face: DodecaminxFaceObject<T>): DodecaminxFaceSimple {
  const map = (arr: DodecaminxSticker<T>[]) => arr.map(sticker => sticker.value);
  
  const result: DodecaminxFaceSimple = [
    face.corners.map(map),
  ];

  if (face.middles.length) {
    result.push(face.middles.map(map))
  }

  if (face.center) {
    result.push(face.center.value);
  }

  return result;
}
