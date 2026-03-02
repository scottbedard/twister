<template>
  <label :for="id">
    <span
      class="block text-sm font-medium text-gray-900"
      v-text="label"
    />

    <input
      :id
      v-model.number="model"
      class="mt-3 h-3.5 w-full appearance-none rounded-full bg-gray-300 [&amp;::-webkit-slider-thumb]:size-7 [&amp;::-webkit-slider-thumb]:cursor-pointer [&amp;::-webkit-slider-thumb]:appearance-none [&amp;::-webkit-slider-thumb]:rounded-full [&amp;::-webkit-slider-thumb]:border-[6px] [&amp;::-webkit-slider-thumb]:border-gray-500 [&amp;::-webkit-slider-thumb]:bg-gray-200"
      :max
      :min
      type="range"
    >
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
