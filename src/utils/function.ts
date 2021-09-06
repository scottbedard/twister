/**
 * Throw an error.
 *
 * @param {string} message Error message.
 */
export function error(message?: string) {
  throw new Error(message)
}

/**
 * This method returns the first argument it receives.
 *
 * @param {T} arg Value to return.
 */
export function identity<T>(arg: T) {
  return arg
}
