import { DodecaminxFace, DodecaminxFaceObject, DodecaminxTurn, DodecaminxValue } from './dodecaminx';
import { isOdd } from '../utils/number';
import { error } from '../utils/function';
import { roll, times } from '../utils/array';

/**
 * Create a face of values
 */
export function createFace<Data>(size: number, initialValue: DodecaminxValue = null): DodecaminxFaceObject<Data> {
  const gridSize = Math.floor(size / 2);
  const odd = isOdd(size);

  // grids
  const grids = times(5).map(() => {
    return times(gridSize ** 2).map(() => {
      return {
        data: {} as Data,
        value: initialValue,
      };
    });
  });

  // center
  const center = odd 
    ? {
      data: {} as Data,
      value: isOdd(size) ? initialValue : null,
    }
    : null;

  // middles
  const middles = odd
    ? times(5).map(() => {
      return times(gridSize).map(() => {
        return {
          data: {} as Data,
          value: initialValue,
        };
      });
    })
    : [];
  
  return {
    center,
    grids,
    middles,
  };
}

/**
 * Extract a layer of values from a face
 */
/* eslint-disable */
export function extractLayer(
  face: DodecaminxFaceObject,
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
  const target = (<DodecaminxFace> result[2].toLowerCase());
  const wide = Boolean(result[3]);
  let rotation: number = result[4] ? parseInt(result[4], 10) : 1;
  const modifier: string = result[5];

  if (wide && !result[1]) {
    depth = 2;
  }

  if (modifier === '-' || modifier === '\'') {
    rotation *= -1;
  }

  return { depth, rotation, target, wide };
}

/**
 * Rotate a face.
 */
export function rotate(face: DodecaminxFaceObject, turns: number): DodecaminxFaceObject {
  return {
    center: face.center,
    grids: roll(face.grids, turns),
    middles: roll(face.middles, turns),
  };
}
