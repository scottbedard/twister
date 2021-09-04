<template>
  <svg
    viewBox="0 0 4.25 3.2"
    xmlns="http://www.w3.org/2000/svg">=
    <g
      v-for="face in faces"
      :key="face"
      :transform="`translate(${faceTransforms[face][0]}, ${faceTransforms[face][1]})`">
      <rect
        v-for="(sticker, stickerIndex) in model.state[face]"
        class="cursor-pointer text-gray-900 hover:opacity-90"
        stroke="currentColor"
        :data-value="sticker.value"
        :fill="color(sticker.value)"
        :height="stickerSize"
        :key="stickerIndex"
        :rx="stickerSize / 8"
        :stroke-width="stickerSize / 20"
        :width="stickerSize"
        :x="stickerSize * colIndex(stickerIndex)"
        :y="stickerSize * rowIndex(stickerIndex)"
        @click="$emit('click-sticker', sticker)"
      />
    </g>
  </svg>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { Cube } from '@/index'
import { times } from 'lodash-es'

const faceTransforms = {
  u: [1.1, 0.05],
  l: [0.05, 1.1],
  f: [1.1, 1.1],
  r: [2.15, 1.1],
  b: [3.2, 1.1],
  d: [1.1, 2.15],
}

const faces = Object.keys(faceTransforms) as (keyof typeof faceTransforms)[]

const mapColumns = (n: number) => times(n ** 2).map((x, i) => i % n)

const mapRows = (n: number) => times(n ** 2).map((x, i) => Math.floor(i / n))

// sizes
const defaultSize = 3;
const maxSize = 10;

export default defineComponent({
  setup(props) {
    const colMap = computed(() => mapColumns(props.model.options.size))
    const rowMap = computed(() => mapRows(props.model.options.size))
    const stickerSize = computed(() => 1 / props.model.options.size)

    const color = (value: any) => props.colors[value] ?? '#9CA3AF';
    const colIndex = (stickerIndex: number) => colMap.value[stickerIndex];
    const rowIndex = (stickerIndex: number) => rowMap.value[stickerIndex];

    return {
      colIndex,
      color,
      faces,
      faceTransforms,
      rowIndex,
      stickerSize,
    }
  },
  emits: [
    'click-sticker',
  ],
  props: {
    colors: {
      required: true,
      type: Array as PropType<string[]>
    },
    model: {
      required: true,
      type: Object as PropType<Cube>
    },
  },
})
</script>
