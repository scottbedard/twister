import {
  DodecaminxFace,
  DodecaminxFaceObject,
  DodecaminxFaceSimple,
  DodecaminxSticker,
  DodecaminxTurn,
  DodecaminxValue,
} from './dodecaminx';

import { isOdd } from '../utils/number';
import { error } from '../utils/function';
import { roll, times } from '../utils/array';

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
 * Extract a layer of values from a face
 */
/* eslint-disable */
export function extractLayer<T>(
  face: DodecaminxFaceObject<T>,
  depth: number,
  angle: number = 0
): any {
  return [];
}
/* eslint-enable */

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
 */
export function rotate<T>(face: DodecaminxFaceObject<T>, rotation: number): DodecaminxFaceObject<T> {
  return {
    center: face.center,
    corners: roll(face.corners, -rotation),
    middles: roll(face.middles, -rotation),
  };
}

/**
 * Simplify a puzzle face
 *
 * @param {DodecaminxFaceObject<T>} face
 *
 * 
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