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

## Notation

Notation for this puzzle is similar to that of cubes, but with whole-puzzle rotations denoted by lowercase letters. Here are a few examples,

| Notation | Result |
| ---------| :----- |
| `U`   | outer layer turned once clockwise |
| `U2`  | outer layer turned twice clockwise |
| `U2-` | outer layer turned twice counter-clockwise |
| `3U`  | third layer turned once clockwise |
| `Uw`  | second and outer layer turned once clockwise |
| `u`   | entire puzzle rotated once clockwise |
| `u2`  | entire puzzle rotated twice clockwise |
| `u2-` | entire puzzle rotated twice counter-clockwise |
