/**
 * Rotate an array forwards or backwards.
 *
 * @param {any[]}   arr 
 * @param {number}  elements
 *
 * @return {any[]} 
 */
export function roll(arr: any[], elements: number) {
    const offset = (((elements % arr.length) + arr.length) % arr.length);

    return arr.slice(offset).concat(arr.slice(0, offset));
}
