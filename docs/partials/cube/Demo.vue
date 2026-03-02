<template>
  <div>
    <RangeInput
      v-model="size"
      :label="`Size: ${size}`"
      :max="20"
      :min="1" />

    <div
      class="gap-1 grid grid-cols-4"
      :style="{ '--cube-size': `repeat(${cube.size}, 1fr)` }">
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
        class="col-start-2 row-start-2"
        :stickers="cube.state.d" />

      <DemoFace
        class="col-start-2"
        :stickers="cube.state.b" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cube } from '@/index'
import RangeInput from '~/components/RangeInput.vue'
import DemoFace from './DemoFace.vue'

const size = ref(3)

const cube = computed(() => new Cube(size.value))
</script>
