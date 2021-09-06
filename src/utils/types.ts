/**
 * Nestable array.
 */
export type ValueOrArray<T> = T | ValueOrArray<T>[]
