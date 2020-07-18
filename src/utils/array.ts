import { rand } from './number';

/**
 * Helper function to slice then shift an array.
 *
 * @param  {T[]}        arr
 * @param  {number?}    begin
 *
 * @return {any}
 */
export function first<T>(arr: T[], begin?: number): T {
  return slice(arr, begin).shift();
}

/**
 * Make an array of a given size.
 *
 * @param {number}  length
 * @param {T}       value
 *
 * @return {Array}
 */
export function makeArray<T>(length: number, value: T = undefined): T[] {
  return new Array(length).fill(value);
}

/**
 * Pick a random item from an array.
 *
 * @param {T[]} arr
 *
 * @return {T}
 */
export function randomItem<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)];
}

/**
 * Returns a reversed array without mutating the source.
 *
 * @param  {T[]} arr,
 *
 * @return {T[]}
 */
export function reverse<T>(arr: T[]): T[] {
  return slice(arr).reverse();
}

/**
 * Rotate an array forwards or backwards.
 *
 * @param {any[]}   arr 
 * @param {number}  elements
 *
 * @return {any[]} 
 */
export function rollArray<T>(arr: T[], elements: number): T[] {
  const offset = (((elements % arr.length) + arr.length) % arr.length);

  return arr.slice(offset).concat(arr.slice(0, offset));
}

/**
 * Slice an array.
 *
 * @param  {T[]}        arr
 * @param  {number?}    begin
 * @param  {number?}    end
 *
 * @return {T[]}
 */
export function slice<T>(arr: T[], begin?: number, end?: number): T[] {
  return arr.slice(begin, end);
}

/**
 * Splice an array.
 * 
 * @param {T[]}     arr
 * @param {number}  start
 * @param {number}  deleteCount
 * @param {T[]}     items
 *
 * @return {T[]}
 */
export function splice<T>(arr: T[], start: number, deleteCount: number, ...items: T[]): T[] {
  return arr.splice(start, deleteCount, ...items);
}
