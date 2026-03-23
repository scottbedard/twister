<template>
  <label
    class="inline-flex items-center"
    :for="id">
    <input
      :id
      v-model.number="model"
      type="range"
      :class="[
        'appearance-none bg-gray-500/20 cursor-grab outline-none shadow-none w-full h-1 rounded-full active:cursor-grabbing',
        '[&::-webkit-slider-thumb]:appearance-none',
        '[&::-webkit-slider-thumb]:w-4',
        '[&::-webkit-slider-thumb]:h-4',
        '[&::-webkit-slider-thumb]:bg-(--vp-c-bg-alt)',
        '[&::-webkit-slider-thumb]:border',
        '[&::-webkit-slider-thumb]:border-gray-500/50',
        '[&::-webkit-slider-thumb]:rounded-full',
        '[&::-webkit-slider-thumb]:shadow-md',
        'focus:[&::-webkit-slider-thumb]:z-10',
        'focus:[&::-webkit-slider-thumb]:ring-1',
        'focus:[&::-webkit-slider-thumb]:ring-(--vp-c-brand-1)',
        'focus:[&::-webkit-slider-thumb]:ring-offset-2',
        'focus:[&::-webkit-slider-thumb]:ring-offset-(--vp-c-bg)',
        '[&::-moz-range-thumb]:appearance-none',
        '[&::-moz-range-thumb]:w-4',
        '[&::-moz-range-thumb]:h-4',
        '[&::-moz-range-thumb]:bg-(--vp-c-bg-alt)',
        '[&::-moz-range-thumb]:border',
        '[&::-moz-range-thumb]:border-gray-500/50',
        '[&::-moz-range-thumb]:rounded-full',
        '[&::-moz-range-thumb]:shadow-md',
        'focus:[&::-moz-range-thumb]:z-10',
        'focus:[&::-moz-range-thumb]:ring-1',
        'focus:[&::-moz-range-thumb]:ring-(--vp-c-brand-1)',
        'focus:[&::-moz-range-thumb]:ring-offset-2',
        'focus:[&::-moz-range-thumb]:ring-offset-(--vp-c-bg)',
      ]"
      :max
      :min>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    id?: string
    max?: number
    min?: number
  }>(), {
    id: () => `range-input-${useId()}`,
    max: undefined,
    min: undefined,
  },
)

const model = defineModel<number>()
</script>
