/**
 * Helper function to slice then shift an array.
 *
 * @param  {T[]}        arr
 * @param  {number?}    begin
 *
 * @return {any}
 */
export declare function first<T>(arr: T[], begin?: number): T;
/**
 * Make an array of a given size.
 *
 * @param {number}  length
 * @param {T}       value
 *
 * @return {Array}
 */
export declare function makeArray<T>(length: number, value?: T): T[];
/**
 * Pick a random item from an array.
 *
 * @param {T[]} arr
 *
 * @return {T}
 */
export declare function randomItem<T>(arr: T[]): T;
/**
 * Returns a reversed array without mutating the source.
 *
 * @param  {T[]} arr,
 *
 * @return {T[]}
 */
export declare function reverse<T>(arr: T[]): T[];
/**
 * Rotate an array forwards or backwards.
 *
 * @param {any[]}   arr
 * @param {number}  elements
 *
 * @return {any[]}
 */
export declare function rollArray(arr: any[], elements: number): any[];
/**
 * Slice an array.
 *
 * @param  {T[]}        arr
 * @param  {number?}    begin
 * @param  {number?}    end
 *
 * @return {T[]}
 */
export declare function slice<T>(arr: T[], begin?: number, end?: number): T[];
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
export declare function splice<T>(arr: T[], start: number, deleteCount: number, ...items: T[]): T[];
