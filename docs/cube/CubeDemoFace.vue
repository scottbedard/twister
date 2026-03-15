<template>
  <div
    class="gap-(--sticker-gap) grid grid-cols-(--cube-size)">
    <div
      v-for="sticker in cube.state[face]"
      :key="`${sticker.face}-${sticker.index}`"
      :class="[
        'aspect-square border border-(--vp-c-border) flex items-center justify-center rounded-(--sticker-radius) overflow-hidden',
        {
          u: 'bg-yellow-300 text-black',
          l: 'bg-orange-500 text-white',
          f: 'bg-blue-500 text-white',
          r: 'bg-red-500 text-white',
          b: 'bg-green-500 text-white',
          d: 'bg-gray-100 text-black',
        }[sticker.face],
      ]"
      :style="{
        containerType: 'size',
        transform: `rotate(${sticker.rotation * 90}deg)`,
      }">
      <span
        v-text="'↑'"
        style="font-size: 40cqh" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Cube } from '@/index'
import type { CubeFace } from '@/index'

defineProps<{
  cube: Cube
  face: CubeFace
}>()
</script>
