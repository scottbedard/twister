---
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

A custom randomizer may also be provided. This value must be a function that returns a floating-point number between 0 and 1. By default, [`Math.random`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) will be used.

```js
new Cube({ size: 3, rand: customRandomFn })
```

## Notation

Twister uses a slightly modified version [WCA cube notation](https://www.worldcubeassociation.org/regulations/#12a). Some ask why, and it's because Twister is the brains for [speedcube.site](https://speedcube.site), which is a platform for _solving_, not scrambling.

Here is a summary of the differences in our notation.

- `-` or `'` indicates counter-clockwide turns
- Omit the `w` suffix to annotate slice turns
- Wide turns can indicate puzzle rotation, for example on a 3x3 `3Rw` is equivalent to `X`

Use `parseTurn` and `stringifyTurn` to serialize and deserialize turns.

```js
const cube = new Cube(3)

const turn = cube.parseTurn('R-') // { depth, target, rotation, wide }

cube.stringifyTurn(turn) // 'R-'
```

Be aware, when stringinfy a wide-syntax puzzle rotation, the output will be shortened to the turn axis.

```js
cube.stringifyTurn({ depth: 3, target: 'r', rotation: 2, wide: true })
// 'X2'
```