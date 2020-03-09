/**
 * Rotate an array forwards or backwards. This mutates
 * the original array.
 *
 * @param {any[]}   arr 
 * @param {number}  distance
 *
 * @return {void} 
 */
export function roll(arr: any[], distance: number): void {
    distance -= arr.length * Math.floor(distance / arr.length);
    
    arr.push.apply(arr, arr.splice(0, distance));
}
