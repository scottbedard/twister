---
editLink: true
lastUpdated: true
title: Cube
---

<script setup>
import CubeDemo from './cube/CubeDemo.vue'
</script>

# Cube

A traditional six sided face turning puzzle. Use your keyboard to manipulate the puzzle, or use <button onclick="console.log(window.cube)">`window.cube`</button> for direct access.

<CubeDemo />

## Constructor and sticker data

With no arguments, **`new Cube()`** builds a **3×3**. Pass a number for the size, or an object: **`{ size?, rand?, data? }`**.

Each sticker exposes **`data`**. Optional **`data: () => T`** is called **once per sticker** whenever face matrices are created (first load and **`reset()`**); the same function is stored on **`puzzle.data`**. Without it, **`data`** is **`null`** everywhere. In TypeScript, use **`Cube<T>`**.

```js
new Cube({ data: () => ({ id: 1 }) }).state.u[0].data // { id: 1 }
```

**`forEachSide(face, fn)`** runs **`fn`** on each sticker on that face in index order (e.g. **`'u'`**, **`'f'`**, …). On **`Dodecaminx`**, the same method walks the face’s **block matrix** in the same order as **`iterateBlockMatrix`**.

## Notation

Cube's use a slightly modified [WCA cube notation](https://www.worldcubeassociation.org/regulations/#12a). It's differs for better integration with [speedpuzzle.site](https://speedpuzzle.site). The notation needed to be a platform for _solving_, not just _scrambling_.

Here is a summary of the differences,

- `-` and `'` both indicate counter-clockwide turns
- Omit the `w` suffix to annotate slice turns
- Wide turns can denote puzzle rotation, for example on a 3x3 `3Rw` is equivalent to `X`

When stringifying wide turns that exceed the puzzle size, axis notation is used.

```js
const puzzle = new Cube(3)

puzzle.stringifyTurn({
  depth: 3,
  rotation: 2,
  target: 'r',
  wide: true
}) // 'X2'
```
