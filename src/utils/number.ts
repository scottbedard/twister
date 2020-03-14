/**
 * Test if a number is odd.
 *
 * @param {number} n
 *
 * @return {boolean}
 */
export function isOdd(n: number) {
    return n % 2;
}

/**
 * Generate random integer.
 *
 * @param {number} min
 * @param {number} max
 *
 * @return number
 */
export function rand(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
