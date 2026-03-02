<template>
  <div
    class="gap-1 grid grid-col"
    :style="{ gridTemplateColumns: `var(--cube-size)` }">
    <div
      v-for="sticker in stickers"
      :key="sticker.index"
      class="aspect-square border border-[red] rounded" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  stickers: { index: number }[]
}>()
</script>
