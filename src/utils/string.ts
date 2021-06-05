/**
 * Converts all the alphabetic characters in a string to lowercase.
 *
 * @param {string} str string to lowercase
 */
export function lowercase<T extends string>(str: T): Lowercase<T> {
  return str.toLowerCase() as Lowercase<T>;
}

/**
 * Removes the leading and trailing white space and line terminator characters from a string.
 *
 * @param {string} str string to trim
 */
export function trim(str: string): string {
  return str.trim();
}
