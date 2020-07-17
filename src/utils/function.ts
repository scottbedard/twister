/**
 * Identity.
 * 
 * @return {T}
 */
export function identity<T>(arg: T): T {
    return arg;
}

/**
 * No operation.
 *
 * @return {void}
 */
/* eslint-disable-next-line @typescript-eslint/no-empty-function */
export function noop(): void {}
