/**
 * Throw an error.
 *
 * @param {string} messsage
 *
 * @return {never}
 */
export function error(message: string): never {
  throw new Error(message);
}

/**
 * Identity.
 *
 * @param {T} val
 *
 * @return {T}
 */
export function identity<T>(val: T): T {
  return val;
}

/**
 * No operation.
 *
 * @return {void}
 */
export function noop(): void {}
