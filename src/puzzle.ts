export interface Puzzle<PuzzleTurn = unknown, PuzzleSolvedOptions = unknown> {
  /**
   * Produce scramble notation without applying it.
   */
  generateScramble(depth?: number): string

  /**
   * Restore the puzzle to its initial solved state.
   */
  reset(): this

  /**
   * Randomize the puzzle state (e.g. apply a generated scramble).
   */
  scramble(depth?: number): this

  /**
   * Whether the puzzle is in a solved state.
   */
  solved(opts?: PuzzleSolvedOptions): boolean

  /**
   * Apply a single turn or a sequence of turns (whitespace-separated notation).
   */
  turn(turn: PuzzleTurn | string): this
}
