<template>
  <label for="maxVolume">
    <span class="block text-sm font-medium text-gray-900">Size</span>

    <input
      id="maxVolume"
      v-model="model"
      type="range"
      name="maxVolume"
      min="0"
      max="100"
      value="20"
      class="mt-3 h-3.5 w-full appearance-none rounded-full bg-gray-300 [&amp;::-webkit-slider-thumb]:size-7 [&amp;::-webkit-slider-thumb]:cursor-pointer [&amp;::-webkit-slider-thumb]:appearance-none [&amp;::-webkit-slider-thumb]:rounded-full [&amp;::-webkit-slider-thumb]:border-[6px] [&amp;::-webkit-slider-thumb]:border-gray-500 [&amp;::-webkit-slider-thumb]:bg-gray-200"
    >
  </label>
</template>

<script setup lang="ts">
const model = defineModel<number>({ required: true })
</script>
