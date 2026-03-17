<template>
  <div>
    <div class="gap-2 grid mb-6">
      <FaceTurningControls
        v-model:size="size"
        :max
        @reset="reset"
        @scramble="scramble"
        @turn="turn" />

      <div class="flex items-center gap-x-6 text-sm px-2">
        <StatusText
          label="Solved"
          :status="solved" />

        <StatusText
          label="Super"
          :status="solvedSuper" />
      </div>
    </div>

    <div
      class="grid grid-cols-4 mt-6 select-none"
      :class="{
        'gap-2': size < 3,
        'gap-1': size >= 3 && size < 5,
        'gap-0.5': size >= 5
      }"
      :style="{
        '--cube-size': `repeat(${size}, 1fr)`,
        '--sticker-gap': size < 3 ? '6px' : size < 5 ? '3px' : size < 7 ? '1px' : '0px',
        '--sticker-radius': size < 4 ? '6px' : size < 6 ? '4px' : '2px',
      }">
      <CubeDemoFace
        v-model="hoverSticker"
        class="col-start-2"
        face="u"
        :cube />

      <CubeDemoFace
        v-model="hoverSticker"
        class="row-start-2"
        face="l"
        :cube />

      <CubeDemoFace
        v-model="hoverSticker"
        class="row-start-2"
        face="f"
        :cube />

      <CubeDemoFace
        v-model="hoverSticker"
        class="row-start-2"
        face="r"
        :cube />

      <CubeDemoFace
        v-model="hoverSticker"
        class="row-start-2"
        face="b"
        :cube />

      <CubeDemoFace
        v-model="hoverSticker"
        class="col-start-2"
        face="d"
        :cube />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cube } from '@/index'
import { useUrlSearchParams } from '@vueuse/core'
import CubeDemoFace from './CubeDemoFace.vue'
import StatusText from '~/components/StatusText.vue'
import FaceTurningControls from '~/components/FaceTurningControls.vue'
import type { CubeSticker } from '@/cube/types'
import { useKeymap } from '~/.vitepress/composables/use-keymap'

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

const solved = computed(() => cube.value.solved())

const solvedSuper = computed(() => cube.value.solved({ super: true }))

const hoverSticker = shallowRef<CubeSticker | null>(null)

onMounted(reset)

onUnmounted(() => {
  delete (window as Window & { cube?: Cube }).cube
})

watch(size, reset)

useKeymap({
  escape: reset,
  keymap: {
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
    'J': '2U',
    'F': '2U-',
    'g': 'F-',
    'h': 'F',
    'G': 'Fw-',
    'H': 'Fw',
    ',': 'Rw-',
    'x': 'Lw',
    'p': 'Z',
    'q': 'Z-',
    'L': '2D-',
    'S': '2D',
    'W': 'Bw',
    'O': 'Bw-',
  },
  onKey(notation: string) {
    cube.value.turn(notation)
  },
})

function reset() {
  cube.value = new Cube(size.value)

  ;(window as Window & { cube?: Cube }).cube = cube.value
}

function scramble() {
  cube.value.scramble()
}

function turn(turn: string) {
  cube.value.turn(turn)
}
</script>
