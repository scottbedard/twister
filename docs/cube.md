---
editLink: true
lastUpdated: true
title: Cube
---

<script setup>
import CubeDemo from './partials/cube/CubeDemo.vue'
</script>

# Cube

A traditional six sided face turning puzzle. Use your keyboard for basic manipulation, or <button onclick="console.log(window.cube)">`window.cube`</button> for direct access.

<CubeDemo />

## Basic Usage

Create a cube instance using the `Cube` constructor.

```js
import { Cube } from '@bedard/twister'

const puzzle = new Cube(3)
```

Use the following APIs to manipulate the puzzle's state.

```js
// generate a scramble, but do not execute it
cube.generateScramble()

// scramble the puzzle
cube.scramble()

// apply a whitespace separated sequence of turns
cube.turn('R U R-')
```

Test the puzzle state using `solved`

```js
const cube = new Cube(3)

cube.solved() // true

cube.solved({ super: true }) // also tests orientation of pieces
```

## Notation

Twister uses a slightly modified version [WCA cube notation](https://www.worldcubeassociation.org/regulations/#12a). It's different because Twister is the brains of [speedcube.site](https://speedcube.site), which is a platform for _solving_, not scrambling.

Here is a summary of the differences in our notation,

- `-` and `'` indicate counter-clockwide turns
- Omit the `w` suffix to annotate slice turns
- Wide turns can denote puzzle rotation, for example on a 3x3 `3Rw` is equivalent to `X`

Use `parseTurn` and `stringifyTurn` to serialize and deserialize turns.

```js
const cube = new Cube(3)

const turn = cube.parseTurn('R-') // { depth, target, rotation, wide }

cube.stringifyTurn(turn) // 'R-'
```

When stringifying a wide-syntax puzzle rotation, the output will be shortened to the turn axis.

```js
cube.stringifyTurn({
  depth: 3,
  rotation: 2,
  target: 'r',
  wide: true
}) // 'X2'
```

## Advanced

By default, scramble generation uses [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random), but alternate functions can be provided. For example, for better randomness you could use [`crypto.getRandomValues`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues).

```js
function rand() {
  const arr = new Uint32Array(1)
  crypto.getRandomValues(arr)
  return arr[0] / 2 ** 32
}

const cube = new Cube({ size: 3, rand })
```

This feature can also be used for deterministic unit testing.

> [!WARNING]
> Do not use Twister for any WCA purposes. [Always use the official TNoodle software.](https://www.worldcubeassociation.org/regulations/scrambles/)
