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

## Constructor and sticker data

With no arguments, **`new Dodecaminx()`** uses size **3**. Pass a number, or **`{ size?, rand?, data? }`** like to set specific values.

Each sticker exposes **`data`**. Optional **`data: () => T`** is called **once per sticker** whenever face matrices are created (first load and **`reset()`**); the same function is stored on **`puzzle.data`**. Without it, **`data`** is **`null`** everywhere. In TypeScript, use **`Dodecaminx<T>`**.

```js
const dodecaminx = new Dodecaminx({ data: () => 'custom payload' })
```

**`forEachSide(face, fn)`** walks every sticker on that face in block-matrix order (same as iterating the face’s **`BlockMatrix`** yourself).

```js
dodecaminx.forEachSide('f', (sticker) => {
  console.log(sticker.data)
})
```

The same API exists on **`Cube`**: **`cube.forEachSide('u', (sticker) => { ... })`** visits that face’s flat sticker list in index order.

## Notation

Notation for this puzzle is similar to that of cubes, but with whole-puzzle rotations denoted by lowercase letters. Here are a few examples,

| Notation | Result |
| ---------| :-------------------------------------------- |
| `U`      | outer layer turned once clockwise             |
| `U2`     | outer layer turned twice clockwise            |
| `U2-`    | outer layer turned twice counter-clockwise    |
| `3U`     | third layer turned once clockwise             |
| `Uw`     | second and outer layer turned once clockwise  |
| `u`      | entire puzzle rotated once clockwise          |
| `u2`     | entire puzzle rotated twice clockwise         |
| `u2-`    | entire puzzle rotated twice counter-clockwise |
