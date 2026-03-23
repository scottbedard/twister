<template>
  <div class="inline-flex items-center gap-x-1">
    <div>{{ label }}:</div>

    <div :class="status ? 'text-green-500' : 'text-red-500'">
      <Check
        v-if="status"
        :size="18" />

      <X
        v-else
        :size="18" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, X } from 'lucide-vue-next'

defineProps<{
  label: string
  status: boolean
}>()
</script>
