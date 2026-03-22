---
editLink: true
lastUpdated: true
layout: doc
---

<script lang="ts" setup>
import DodecaminxDemo from './dodecaminx/DodecaminxDemo.vue'
</script>

# Dodecaminx

A twelve sided face turning puzzle. Use your keyboard to manipulate the puzzle, or use <button onclick="console.log(window.dodecaminx)">`window.dodecaminx`</button> for direct access.

<DodecaminxDemo />

## Basic Usage

Create a puzzle instance using the `Dodecaminx` constructor.

```js
import { Dodecaminx } from '@bedard/twister'

const puzzle = new Dodecaminx(3)
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

## Notation

