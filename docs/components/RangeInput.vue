<template>
  <label
    class="inline-flex items-center"
    :for="id">
    <input
      :id
      v-model.number="model"
      class="cursor-grab h-1 w-full appearance-none rounded-full bg-gray-500/10 active:cursor-grabbing"
      type="range"
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
