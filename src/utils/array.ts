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
