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

import {
  AdjacentRelationship,
  dodecaminxNet,
  dodecaminxOpposites,
} from './constants';

import { cols, rows } from '../utils/matrix';
import { error, identity } from '../utils/function';
import { floor, isInteger, isOdd } from '../utils/number';
import { roll, splice, times } from '../utils/array';

/**
 * Create a face of values
 */
export function createFace<Data>(size: number, initialValue: DodecaminxValue = null): DodecaminxFaceObject<Data> {
  const gridSize = floor(size / 2);
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
export function extractSlice<T>(face: DodecaminxFaceObject<T>, depth: number, angle = 0): DodecaminxSliceObject<T> {
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
 * Test if a face is solved.
 *
 * @param {DodecaminxFaceObject} face
 *
 * @return {boolean}
 */
export function faceIsSolved<T>(face: DodecaminxFaceObject<T>): boolean {
  const stickers = getFaceStickers(face);
  const value = stickers.find(obj => obj.value !== null)?.value ?? null;

  return stickers.reduce((acc, obj) => acc && obj.value === value, true);
}

/**
 * Get all stickers from a face.
 *
 * @param {DodecaminxFaceObject} face
 *
 * @return {DodecacminxSticker[]} 
 */
export function getFaceStickers<T>(face: DodecaminxFaceObject<T>): DodecaminxSticker<T>[] {
  const arr: DodecaminxSticker<T>[] = [];

  face.corners.forEach(quintant => arr.push(...quintant));
  face.middles.forEach(quintant => arr.push(...quintant));

  if (face.center) {
    arr.push(face.center);
  }

  return arr.filter(identity);
}

/**
 * Get all stickers that are part of a slice.
 *
 * @param {DodecaminxState} state
 * @param {DodecaminxFace} target
 * @param {depth} depth
 *
 * @return {DodecaminxSticker[]}
 */
export function getSliceStickers<T>(state: DodecaminxState<T>, target: DodecaminxFace, depth: number): DodecaminxSticker<T>[] {
  return (dodecaminxNet[target] as AdjacentRelationship<keyof DodecaminxFace>[])
    .map(([face]) => extractSlice(state[face], depth))
    .reduce((acc, slice) => acc.concat(slice.leading, slice.middle, slice.trailing), [])
    .filter(identity);
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
 * @param {string} turn
 * @param {number} maxDepth
 *
 * @return {DodecaminxTurn}
 */
export function parseDodecaminxTurn(turn: string, maxDepth: number): DodecaminxTurn {
  if (/^(\d*)(R|D)(\+\+|--)$/.test(turn)) {
    const depth = parseInt(turn, 10);

    return {
      depth: isInteger(depth) ? depth : 1,
      pochmann: true,
      rotation: turn.endsWith('--') ? -2 : 2,
      target: turn.slice(0, 1).toLowerCase() as DodecaminxFace,
      whole: false,
      wide: false,
    }
  }

  const result = turn.match(/^(?:\*?|(\d)*)(u|f|l|r|bl|br|dl|dr|dbl|dbr|b|d|U|F|L|R|BL|BR|DL|DR|DBL|DBR|B|D){1}(w)?(2)?(['-])?$/);

  if (result === null) {
    error(`Invalid turn: ${turn}`);
  }

  const whole = turn.startsWith('*');

  let depth: number = !whole && result[1] ? parseInt(result[1], 10) : 1;
  const target = result[2];
  const wide = !whole && Boolean(result[3]);
  let rotation: number = result[4] ? parseInt(result[4], 10) : 1;
  const modifier: string = result[5];

  if (wide && !result[1]) {
    depth = 2;
  }

  if (depth > maxDepth) {
    error('Turn depth cannot exceed available layers');
  }

  if (modifier === '-' || modifier === '\'') {
    rotation *= -1;
  }

  return {
    depth,
    pochmann: false,
    rotation,
    target: target.toLowerCase() as DodecaminxFace,
    whole,
    wide,
  };
}

/**
 * Rotate the entire puzzle
 *
 * @param {DodecaminxState} state
 * @param {DodecaminxTurn} turn
 *
 * @return {void}
 */
export function rotatePuzzle<T>(state: DodecaminxState<T>, target: DodecaminxFace, rotation: number): void {
  const direction = Math.sign(rotation);

  // rotate target face
  state[target] = rotateFace(state[target], rotation);

  // rotate faces that touch the turn equator
  const northRelations = dodecaminxNet[target] as AdjacentRelationship<keyof DodecaminxFace>[];
  const southRelations = dodecaminxNet[dodecaminxOpposites[target]] as AdjacentRelationship<keyof DodecaminxFace>[];

  for (let i = 0, end = Math.abs(rotation); i < end; i++) {
    const northFaces = northRelations.map(([face]) => state[face]);
    const southFaces = southRelations.map(([face]) => state[face]);

    roll(northRelations, direction).forEach(([face,, positiveRotation, negativeRotation], j) => {
      state[face] = rotateFace(northFaces[j], direction > 0 ? positiveRotation : negativeRotation);
    });
  
    roll(southRelations, -direction).forEach(([face,, positiveRotation, negativeRotation], j) => {
      state[face] = rotateFace(southFaces[j], -direction > 0 ? positiveRotation : negativeRotation);
    });
  }
  
  // rotate opposite face
  state[dodecaminxOpposites[target]] = rotateFace(state[dodecaminxOpposites[target]], -rotation);
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
  const adjacentFaces = dodecaminxNet[target];
  const adjacentSlices = roll((dodecaminxNet[target] as AdjacentRelationship<keyof DodecaminxFace>[]).map(([face, angle]) => extractSlice(state[face], depth, -angle)), -rotation);

  (adjacentFaces as AdjacentRelationship<keyof DodecaminxFace>[]).forEach(([face, angle], i) => {
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

/**
 * Iterate over slices.
 *
 * @param {number} depth
 * @param {boolean} wide 
 * @param {function} fn
 *
 * @return {void} 
 */
export function walkSlices(depth: number, wide: boolean, fn: (i: number) => void): void {
  for (let i = depth; i > 0; i--) {
    fn(i);

    if (!wide) {
      break;
    }
  } 
}