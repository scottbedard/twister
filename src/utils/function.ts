/**
 * Throw an error.
 */
export function error(message: string): void {
  throw new Error(message);
}

/**
 * Identity.
 */
export function identity<T>(arg: T): T {
  return arg;
}

/**
 * No operation.
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-function */
export function noop(): void {}
