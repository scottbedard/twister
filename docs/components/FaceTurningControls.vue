<template>
  <div class="grid gap-x-6 gap-y-3">
    <div class="flex gap-x-4 w-full">
      <Button @click="$emit('reset')">
        Reset
      </Button>

      <Button @click="$emit('scramble')">
        Scramble
      </Button>

      <Input
        v-model="turn"
        class="w-20"
        placeholder="Turn"
        @keydown.enter="onTurn"
        @keydown.stop />

      <div class="inline-flex items-center gap-x-2">
        <RangeInput
          v-model="size"
          class="w-40"
          :max
          :min="2" />

        <div class="opacity-90 text-sm">
          {{ size }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from './Button.vue'
import Input from './Input.vue'
import RangeInput from './RangeInput.vue'

const turn = ref('')

const size = defineModel<number>('size', { required: true })

defineProps<{
  max: number
}>()

const emit = defineEmits<{
  reset: []
  scramble: []
  turn: [turn: string]
}>()

function onTurn() {
  emit('turn', turn.value)
}
</script>
