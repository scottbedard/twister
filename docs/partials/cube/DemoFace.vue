<template>
  <div
    class="gap-(--sticker-gap) grid grid-cols-(--cube-size)">
    <div
      v-for="sticker in displayStickers"
      :key="`${sticker.face}-${sticker.index}`"
      :class="[
        'aspect-square flex items-center justify-center rounded-(--sticker-radius) overflow-hidden',
        'outline -outline-offset-1 outline--(--vp-c-border)',
        {
          u: 'bg-yellow-300 border-t-green-500 border-l-orange-500 border-r-red-500 border-b-blue-500',
          l: 'bg-orange-500 border-t-yellow-300 border-l-green-500 border-r-blue-500 border-b-gray-100',
          f: 'bg-blue-500 border-t-yellow-300 border-l-orange-500 border-r-red-500 border-b-gray-100',
          r: 'bg-red-500 border-t-yellow-300 border-l-blue-500 border-r-green-500 border-b-gray-100',
          b: 'bg-green-500 border-t-yellow-300 border-l-red-500 border-r-orange-500 border-b-gray-100',
          d: 'bg-gray-100 border-t-blue-500 border-l-orange-500 border-r-red-500 border-b-green-500',
        }[sticker.face],
      ]"
      :style="{
        borderTopWidth: polygonContainsPoint(paths.t, sticker.coords.t) ? 'var(--sticker-border)' : undefined,
        borderLeftWidth: polygonContainsPoint(paths.l, sticker.coords.l) ? 'var(--sticker-border)' : undefined,
        borderBottomWidth: polygonContainsPoint(paths.b, sticker.coords.b) ? 'var(--sticker-border)' : undefined,
        borderRightWidth: polygonContainsPoint(paths.r, sticker.coords.r) ? 'var(--sticker-border)' : undefined,
      }" />
  </div>
</template>

<script setup lang="ts">
import type { CubeSticker } from '@/index'
import type { Vec } from '@/utils/types'

const {
  size,
  stickers,
} = defineProps<{
  size: number
  stickers: CubeSticker[]
}>()

type Paths = Record<'t' | 'l' | 'b' | 'r', Vec<3, Vec<2>>>

const displayStickers = computed(() => {
  return stickers.map((sticker) => {
    const coords = getIndexCoords(sticker.index, size)
    return { ...sticker, coords }
  })
})

const paths = computed<Paths>(() => {
  const mid: Vec<2> = [size / 2, size / 2]
  return {
    t: [[0, 0], [size, 0], mid],
    l: [[0, 0], mid, [0, size]],
    b: [[0, size], mid, [size, size]],
    r: [[size, size], mid, [size, 0]],
  }
})

function getIndexCoords(index: number, size: number): Record<'t' | 'l' | 'b' | 'r', Vec<2>> {
  const col = index % size
  const row = Math.floor(index / size)
  return {
    t: [col + 0.5, row],
    l: [col, row + 0.5],
    b: [col + 0.5, row + 1],
    r: [col + 1, row + 0.5],
  }
}

function cross(o: Vec<2>, p: Vec<2>, q: Vec<2>): number {
  return (p[0] - o[0]) * (q[1] - o[1]) - (p[1] - o[1]) * (q[0] - o[0])
}

function polygonContainsPoint(path: [Vec<2>, Vec<2>, Vec<2>], coord: Vec<2>): boolean {
  const [a, b, c] = path
  const dAB = cross(a, b, coord)
  const dABc = cross(a, b, c)
  const dBC = cross(b, c, coord)
  const dBCa = cross(b, c, a)
  const dCA = cross(c, a, coord)
  const dCAb = cross(c, a, b)

  return (
    ((dAB <= 0 && dABc <= 0) || (dAB >= 0 && dABc >= 0))
    && ((dBC <= 0 && dBCa <= 0) || (dBC >= 0 && dBCa >= 0))
    && ((dCA <= 0 && dCAb <= 0) || (dCA >= 0 && dCAb >= 0))
  )
}
</script>
