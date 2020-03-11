import { noop } from './function';

/**
 * Make an array of a given size.
 *
 * @param {number}      length 
 * @param {Function}    fn
 *
 * @return {Array}
 */
export function makeArray(length: number, fn: Function = noop): any[] {
    return new Array(length).fill(undefined).map((n, i) => fn(i));
}

/**
 * Rotate an array forwards or backwards.
 *
 * @param {any[]}   arr 
 * @param {number}  elements
 *
 * @return {any[]} 
 */
export function rollArray(arr: any[], elements: number) {
    const offset = (((elements % arr.length) + arr.length) % arr.length);

    return arr.slice(offset).concat(arr.slice(0, offset));
}
