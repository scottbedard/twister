<template>
  <div>
    <div class="mb-6 grid gap-x-6 gap-y-3">
      <div class="flex gap-x-4 w-full">
        <Button @click="reset">
          Reset
        </Button>

        <Button @click="scramble">
          Scramble
        </Button>

        <div class="inline-flex items-center gap-x-2">
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

      <div class="inline-flex items-center gap-x-4 opacity-90 text-sm px-2">
        <div class="inline-flex items-center gap-x-1">
          <div>Solved:</div>

          <div :class="solved ? 'text-green-500' : 'text-red-500'">
            <Check
              v-if="solved"
              :size="18" />

            <X
              v-else
              :size="18" />
          </div>
        </div>

        <div class="inline-flex items-center gap-x-1">
          <div>Super:</div>

          <div :class="solvedSuper ? 'text-green-500' : 'text-red-500'">
            <Check
              v-if="solvedSuper"
              :size="18" />

            <X
              v-else
              :size="18" />
          </div>
        </div>
      </div>
    </div>

    <div
      class="gap-1 grid grid-cols-4 select-none"
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
import { Check, X } from 'lucide-vue-next'
import { Cube } from '@/index'
import type { CubeSticker } from '@/index'
import { useEventListener, useUrlSearchParams } from '@vueuse/core'
import Button from '~/components/Button.vue'
import CubeDemoFace from './CubeDemoFace.vue'
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

const solved = computed(() => cube.value.solved())

const solvedSuper = computed(() => cube.value.solved({ super: true }))

const hoverSticker = shallowRef<CubeSticker | null>(null)

onMounted(() => {
  reset()

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
  }[e.key]

  if (turn) {
    cube.value.turn(turn)
  }
}

function reset() {
  cube.value = new Cube(size.value)

  ;(window as Window & { cube?: Cube }).cube = cube.value
}

function scramble() {
  cube.value.scramble()
}
</script>
