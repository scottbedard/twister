<template>
  <div>
    <FaceTurningControls
      v-model:size="size"
      class="mb-6"
      :max
      @reset="reset"
      @scramble="scramble" />

    <DodecaminxNet :dodecaminx />
  </div>
</template>

<script lang="ts" setup>
import { Dodecaminx } from '@/index'
import { useEventListener, useUrlSearchParams } from '@vueuse/core'
import DodecaminxNet from './DodecaminxNet.vue'
import FaceTurningControls from '~/components/FaceTurningControls.vue'

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

onMounted(() => {
  reset()

  useEventListener(window, 'keydown', onKeydown)
})

onUnmounted(() => {
  delete (window as Window & { dodecaminx?: Dodecaminx }).dodecaminx
})

watch(size, reset)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    reset()

    return
  }
}

function reset() {
  dodecaminx.value = new Dodecaminx(size.value)

  ;(window as Window & { dodecaminx?: Dodecaminx }).dodecaminx = dodecaminx.value
}

function scramble() {
  dodecaminx.value.scramble()
}
</script>
