<template>
  <div
    class="gap-(--sticker-gap) grid grid-cols-(--cube-size)">
    <div
      v-for="sticker in stickers"
      :key="sticker.index"
      class="aspect-square bg-gray-500/50 rounded-(--sticker-radius)" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stickers: { index: number }[]
}>()
</script>
