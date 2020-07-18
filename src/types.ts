/**
 * Puzzle state
 */
export type State<Face extends string, Sticker> = {
  [K in Face]: Sticker[];
}

/**
 * Sticker
 */
export type Sticker<Value, Data> = {
  data: {
    [K in keyof Data]?: Data[K];
  };
  originalIndex: number;
  value: Value;
}