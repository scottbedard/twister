<template>
  <div
    class="gap-(--sticker-gap) grid grid-cols-(--cube-size)">
    <div
      v-for="sticker in stickers"
      :key="sticker.index"
      :class="[
        'aspect-square border border-(--vp-c-border) flex items-center justify-center rounded-(--sticker-radius)',
        {
          u: 'bg-yellow-300',
          l: 'bg-orange-500',
          f: 'bg-blue-400',
          r: 'bg-red-500',
          b: 'bg-green-500',
          d: 'bg-gray-100',
        }[sticker.face],
      ]" />
  </div>
</template>

<script setup lang="ts">
import type { CubeSticker } from '@/index'

defineProps<{
  stickers: CubeSticker[]
}>()

function arrow(orientation: number) {
  return ['', '→', '↓', '←'][orientation]
}
</script>
