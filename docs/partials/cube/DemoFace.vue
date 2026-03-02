<template>
  <div
    class="gap-(--sticker-gap) grid grid-cols-(--cube-size)">
    <div
      v-for="sticker in stickers"
      :key="sticker.index"
      :class="[
        'aspect-square flex items-center justify-center rounded-(--sticker-radius) overflow-hidden',
        'outline -outline-offset-1 outline--(--vp-c-border)',
        {
          u: 'bg-yellow-300 border-t-green-500 border-l-orange-500 border-r-red-500 border-b-blue-500',
          l: 'bg-orange-500 border-t-yellow-300 border-l-green-500 border-r-blue-500 border-b-gray-100',
          f: 'bg-blue-500 border-t-yellow-300 border-l-orange-500 border-r-red-500 border-b-gray-100',
          r: 'bg-red-500 border-t-yellow-300 border-l-blue-500 border-r-green-500 border-b-gray-100',
          b: 'bg-green-500 border-t-yellow-300 border-l-red-500 border-r-orange-500 border-b-gray-100',
          d: 'bg-gray-100 border-t-blue-500 border-l-orange-500 border-r-red-500 border-b-green-500',
        }[sticker.face],
      ]"
      :style="{
        borderWidth: 'var(--sticker-border)',
      }" />
  </div>
</template>

<script setup lang="ts">
import type { CubeSticker } from '@/index'

defineProps<{
  stickers: CubeSticker[]
}>()
</script>
