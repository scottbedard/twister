---
editLink: true
lastUpdated: true
layout: doc
---

# Basic Usage

Create a puzzle instance using various constructors.

```js
import { Cube } from '@bedard/twister'

const puzzle = new Cube(3)
```

Use the following APIs to manipulate the puzzle's state.

```js
// generate a scramble, but do not execute it
puzzle.generateScramble()

// scramble the puzzle
puzzle.scramble()

// apply a whitespace separated sequence of turns
puzzle.turn('R U R-')

// reset the puzzle to its original state
puzzle.reset()

// test if puzzle is solved
puzzle.solved()

// test if super-solved with position and orientation
puzzle.solved({ super: true })
```

Each puzzle has it's own notation that can be serialized using `parseTurn` and `stringifyTurn`.

```js
const obj = puzzle.parseTurn('R-') // { depth, target, rotation, wide }

puzzle.stringifyTurn(obj) // 'R-'
```

# Advanced

By default, puzzles use [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) for randomness. But custom functions can be provided, such as [`crypto.getRandomValues`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues) or [`vi.fn()` ](https://vitest.dev/api/vi.html#vi-fn).

```js
// scramble puzzle to a consistent state
new Cube({ size: 3, rand: () => 0.5 }).scramble()
```

> [!WARNING]
> Do not use Twister for any WCA purposes. [Always use the official TNoodle software.](https://www.worldcubeassociation.org/regulations/scrambles/)
