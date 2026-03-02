<template>
  <label :for="id">
    <span
      v-text="label"
      class="block mb-2 text-sm font-bold" />

    <input
      :id
      v-model.number="model"
      class="cursor-grab h-2 w-full appearance-none rounded-full bg-gray-500/10 [&amp;::-webkit-slider-thumb]:size-7 [&amp;::-webkit-slider-thumb]:cursor-pointer [&amp;::-webkit-slider-thumb]:appearance-none [&amp;::-webkit-slider-thumb]:rounded-full [&amp;::-webkit-slider-thumb]:border-[6px] [&amp;::-webkit-slider-thumb]:border-gray-500 [&amp;::-webkit-slider-thumb]:bg-gray-200 active:cursor-grabbing"
      type="range"
      :max
      :min>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    label: string
    max: number
    min: number
  }>(), {
    id: () => `range-input-${useId()}`,
  },
)

const model = defineModel<number>()
</script>
