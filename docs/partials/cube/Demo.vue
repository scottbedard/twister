<template>
  <div>
    <div class="mb-6 inline-flex gap-x-6">
      <div class="inline-flex items-center gap-x-3">
        <Button>
          Clear
        </Button>

        <Button @click="reset">
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
        '--sticker-border': `${Math.floor(width / 5 / size)}px`,
        '--sticker-gap': size < 5 ? '5px' : size < 10 ? '3px' : '1px',
        '--sticker-radius': size < 5 ? '8px' : size < 10 ? '4px' : '0',
      }">
      <div ref="boxEl" />

      <DemoFace
        class="col-start-2"
        :size
        :stickers="cube.state.u" />

      <DemoFace
        class="row-start-2"
        :size
        :stickers="cube.state.l" />

      <DemoFace
        class="row-start-2"
        :size
        :stickers="cube.state.f" />

      <DemoFace
        class="row-start-2"
        :size
        :stickers="cube.state.r" />

      <DemoFace
        class="row-start-2"
        :size
        :stickers="cube.state.b" />

      <DemoFace
        class="col-start-2"
        :size
        :stickers="cube.state.d" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cube } from '@/index'
import { useElementBounding, useEventListener } from '@vueuse/core'
import Button from '~/components/Button.vue'
import DemoFace from './DemoFace.vue'
import RangeInput from '~/components/RangeInput.vue'

const size = ref(3)

const cube = ref(new Cube(size.value))

const boxEl = useTemplateRef('boxEl')

const { width } = useElementBounding(boxEl)

onMounted(() => {
  useEventListener(window, 'keydown', onKeydown)
})

watch(size, reset)

function onKeydown(e: KeyboardEvent) {
  const turn = {
    'i': 'R',
    'k': 'R-',
    'j': 'U',
    'f': 'U-',
    'e': 'L-',
    'd': 'L',
    's': 'D',
    'l': 'D-',
    'w': 'B',
    'o': 'B-',
    'a': 'Y-',
    ';': 'Y',
    'u': 'X',
    'n': 'X-',
    'r': 'X',
    'c': 'X-',
    'm': 'X-',
    'v': 'X-',
    'I': '2R',
    'K': '2R-',
    'E': '2L-',
    'D': '2L',
    'J': 'U',
    'F': 'U-',
    'g': 'F-',
    'h': 'F',
    'G': 'Fw-',
    'H': 'Fw',
    '9': 'Rw',
    ',': 'Rw-',
    '4': 'Lw-',
    'x': 'Lw',
    '3': 'Lw-',
  }[e.key]

  if (turn) {
    cube.value.turn(turn)
  }
}

function reset() {
  cube.value = new Cube(size.value)
}
</script>
