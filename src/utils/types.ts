declare const tag: unique symbol

export type Opaque<T, Token> = T & { readonly [tag]: [T, Token] }

export type Range<
  T extends number,
  Acc extends number[] = [],
> = Acc['length'] extends T
  ? Acc[number]
  : Range<T, [...Acc, Acc['length']]>

export type Vec<
  T extends number,
  U = number,
  V extends unknown[] = [],
> = V['length'] extends T ? V : Vec<T, U, [U, ...V]>
