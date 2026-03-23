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

    <DodecaminxNet :dodecaminx />
  </div>
</template>

<script lang="ts" setup>
import { Dodecaminx } from '@/index'
import { useKeymap } from '~/.vitepress/composables/use-keymap'
import { useUrlSearchParams } from '@vueuse/core'
import DodecaminxNet from './DodecaminxNet.vue'
import FaceTurningControls from '~/components/FaceTurningControls.vue'
import StatusText from '~/components/StatusText.vue'

const max = 10

const dodecaminx = ref(new Dodecaminx(3))

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

const solved = computed(() => dodecaminx.value.solved())

const solvedSuper = computed(() => dodecaminx.value.solved({ super: true }))

onMounted(reset)

onUnmounted(() => {
  delete (window as Window & { dodecaminx?: Dodecaminx }).dodecaminx
})

watch(size, reset)

useKeymap({
  escape: reset,
  keymap: {
    'i': 'R',
    'k': 'R-',
    'j': 'U',
    'f': 'U-',
    'h': 'F',
    'g': 'F-',
    'e': 'L-',
    'l': 'BR-',
    'd': 'L',
    '4': 'BL-',
    '8': 'BR',
    'a': 'u-',
    ';': 'u',
    'u': 'r',
    'm': 'r-',
    'r': 'l-',
    'c': 'l',
    'p': 'R-',
    'I': 'Rw',
    'K': 'Rw-',
    'E': 'Lw-',
    'D': 'Lw',
    'J': 'Uw',
    'F': 'Uw-',
    'H': 'Fw',
    'G': 'Fw-',
  },
  onKey: (notation: string) => {
    dodecaminx.value.turn(notation)
  },
})

function reset() {
  dodecaminx.value = new Dodecaminx(size.value)

  ;(window as Window & { dodecaminx?: Dodecaminx }).dodecaminx = dodecaminx.value
}

function scramble() {
  dodecaminx.value.scramble()
}

function turn(turn: string) {
  dodecaminx.value.turn(turn)
}
</script>
