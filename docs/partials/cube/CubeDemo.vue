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
          :max
          :min="2" />

        <div class="opacity-90 text-sm">
          {{ size }}x{{ size }}
        </div>
      </div>
    </div>

    <div
      class="gap-2 grid grid-cols-4"
      :style="{
        '--cube-size': `repeat(${size}, 1fr)`,
        '--sticker-gap': size < 3 ? '6px' : size < 5 ? '3px' : size < 7 ? '1px' : '0px',
        '--sticker-radius': size < 4 ? '6px' : size < 6 ? '4px' : '2px',
      }">
      <DemoFace
        v-model="hoverSticker"
        class="col-start-2"
        face="u"
        :cube />

      <DemoFace
        v-model="hoverSticker"
        class="row-start-2"
        face="l"
        :cube />

      <DemoFace
        v-model="hoverSticker"
        class="row-start-2"
        face="f"
        :cube />

      <DemoFace
        v-model="hoverSticker"
        class="row-start-2"
        face="r"
        :cube />

      <DemoFace
        v-model="hoverSticker"
        class="row-start-2"
        face="b"
        :cube />

      <DemoFace
        v-model="hoverSticker"
        class="col-start-2"
        face="d"
        :cube />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cube } from '@/index'
import type { CubeSticker } from '@/index'
import { useEventListener, useUrlSearchParams } from '@vueuse/core'
import Button from '~/components/Button.vue'
import DemoFace from './CubeDemoFace.vue'
import RangeInput from '~/components/RangeInput.vue'

const params = useUrlSearchParams('history', { initialValue: { size: '3' } })

const size = computed({
  get: () => {
    const v = Array.isArray(params.size) ? params.size[0] : params.size
    const n = Number(v)
    return Number.isInteger(n) && n >= 1 && n <= max ? n : 3
  },
  set: (v: number) => {
    params.size = String(v)
  },
})

const max = 10

const cube = ref(new Cube(size.value))

const hoverSticker = shallowRef<CubeSticker | null>(null)

onMounted(() => {
  reset()

  document.querySelector('#cube-api')?.addEventListener('click', () => {
    console.log(cube.value)
  })

  useEventListener(window, 'keydown', onKeydown)
})

onUnmounted(() => {
  delete (window as Window & { cube?: Cube }).cube
})

watch(size, reset)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    reset()

    return
  }

  const turn = {
    '3': 'Lw-',
    '4': 'Lw-',
    '9': 'Rw',
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
    ',': 'Rw-',
    'x': 'Lw',
    'p': 'Z',
    'q': 'Z-',
  }[e.key]

  if (turn) {
    cube.value.turn(turn)
  }
}

function reset() {
  cube.value = new Cube(size.value)

  ;(window as Window & { cube?: Cube }).cube = cube.value
}
</script>
