<template>
  <div>
    <RangeInput
      v-model="size"
      :label="`Size (${size})`"
      :min="1"
      :max="20"
    />

    <div
      class="gap-2 grid grid-cols-4"
      :style="{ '--cube-size': `repeat(${cube.size}, 1fr)` }"
    >
      <div
        class="col-start-2 gap-1 grid grid-col"
        :style="{ gridTemplateColumns: `var(--cube-size)` }"
      >
        <div
          v-for="sticker in cube.state.u"
          :key="sticker.index"
          class="aspect-square border border-[red]"
        />
      </div>

      <div
        class="gap-1 grid grid-col row-start-2"
        :style="{ gridTemplateColumns: `var(--cube-size)` }"
      >
        <div
          v-for="sticker in cube.state.u"
          :key="sticker.index"
          class="aspect-square border border-[red]"
        />
      </div>

      <div
        class="gap-1 grid grid-col row-start-2"
        :style="{ gridTemplateColumns: `var(--cube-size)` }"
      >
        <div
          v-for="sticker in cube.state.u"
          :key="sticker.index"
          class="aspect-square border border-[red]"
        />
      </div>

      <div
        class="gap-1 grid grid-col row-start-2"
        :style="{ gridTemplateColumns: `var(--cube-size)` }"
      >
        <div
          v-for="sticker in cube.state.u"
          :key="sticker.index"
          class="aspect-square border border-[red]"
        />
      </div>

      <div
        class="col-start-2 gap-1 grid grid-col row-start-2"
        :style="{ gridTemplateColumns: `var(--cube-size)` }"
      >
        <div
          v-for="sticker in cube.state.u"
          :key="sticker.index"
          class="aspect-square border border-[red]"
        />
      </div>

      <div
        class="col-start-2 gap-1 grid grid-col"
        :style="{ gridTemplateColumns: `var(--cube-size)` }"
      >
        <div
          v-for="sticker in cube.state.u"
          :key="sticker.index"
          class="aspect-square border border-[red]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cube } from '@/index'
import RangeInput from './RangeInput.vue'

const size = ref(3)

const cube = computed(() => new Cube(size.value))
</script>
