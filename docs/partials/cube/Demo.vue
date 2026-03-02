<template>
  <div>
    <div class="mb-6 inline-flex gap-x-6">
      <div class="inline-flex items-center gap-x-3">
        <Button>
          Clear
        </Button>

        <Button>
          Reset
        </Button>

        <Button>
          Scramble
        </Button>
      </div>

      <div class="inline-flex items-center gap-x-1">
        <RangeInput
          v-model="size"
          class="w-40"
          :max="20"
          :min="1" />

        <div class="opacity-90 text-sm">
          {{ size }}x{{ size }}
        </div>
      </div>
    </div>

    <div
      class="gap-2 grid grid-cols-4"
      :style="{
        '--cube-size': `repeat(${size}, 1fr)`,
        '--sticker-gap': size < 5 ? '.25rem' : size < 10 ? '2px' : '1px',
        '--sticker-radius': size < 5 ? '.5rem' : size < 10 ? '.25rem' : '0',
      }">
      <DemoFace
        class="col-start-2"
        :stickers="cube.state.u" />

      <DemoFace
        class="row-start-2"
        :stickers="cube.state.l" />

      <DemoFace
        class="row-start-2"
        :stickers="cube.state.f" />

      <DemoFace
        class="row-start-2"
        :stickers="cube.state.r" />

      <DemoFace
        class="row-start-2"
        :stickers="cube.state.d" />

      <DemoFace
        class="col-start-2"
        :stickers="cube.state.b" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cube } from '@/index'
import Button from '~/components/Button.vue'
import DemoFace from './DemoFace.vue'
import RangeInput from '~/components/RangeInput.vue'

const size = ref(3)

const cube = computed(() => new Cube(size.value))
</script>
