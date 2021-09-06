/**
 * Type-safe helper for Object.keys
 *
 * @param {object} obj Object to pull keys from.
 */
export function keys<T extends Record<string, unknown>>(obj: T) {
  return Object.keys(obj) as (keyof T)[]
}
