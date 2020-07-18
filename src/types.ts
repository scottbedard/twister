/**
 * Puzzle state
 */
export type State<Face extends string, Sticker> = {
  [K in Face]: Sticker[];
}

/**
 * Simplified state
 */
export type SimplifiedState<Face extends string, Value> = {
  [K in Face]?: Value[];
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