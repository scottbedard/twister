<template>
  <div>
    <svg
      viewBox="0 0 9.8 4.9"
      xmlns="http://www.w3.org/2000/svg">
      <g
        class="text-gray-900"
        transform="translate(2.6, 2.2)">
        <template
          v-for="face in faces"
          :key="`group-${face.key}`">
          <clipPath :id="`clip-${face.key}`">
            <path
              stroke="currentColor"
              :d="pathD(outline)" />
          </clipPath>

          <path
            stroke="currentColor"
            :d="pathD(outline)"
            :stroke-width
            :transform="face.transform" />

          <g
            :clip-path="`url(#clip-${face.key})`"
            :transform="face.transform">
            <path
              v-for="(obj, index) in face.stickers"
              :key="`sticker-${index}`"
              stroke="currentColor"
              :d="pathD(obj?.path ?? [])"
              :fill="color(obj?.sticker)"
              :stroke-width
              @click="$emit('click-sticker', obj!.sticker)" />
          </g>
        </template>
      </g>
    </svg>
  </div>
</template>

<script lang="ts" setup>
import type { CompositeMatrix } from '@/utils/composite-matrix'
import {
  angleFrom,
  bilerp,
  intersect,
  measure,
  toPathCoords,
  toSvgCoords,
  type Line,
  type Vector,
} from '@/utils/math'
import { floor, times } from '@/utils'
import type { Dodecaminx } from '@/index'
import type { DodecaminxFace, DodecaminxSticker } from '@/dodecaminx/types'
import { computed } from 'vue'

const props = defineProps<{
  dodecaminx: Dodecaminx
}>()

defineEmits<{ 'click-sticker': [sticker: DodecaminxSticker] }>()

const FACE_ORDER: DodecaminxFace[] = [
  'u', 'l', 'f', 'r', 'bl', 'br', 'dbr', 'd', 'b', 'dbl', 'dr', 'dl',
]

const COLORS = [
  '#4B5563', '#ED8936', '#9AE6B4', '#FBD38D', '#90CDF4', '#F687B3',
  '#2F855A', '#E53E3E', '#F3F4F6', '#9F7AEA', '#2B6CB0', '#F6E05E',
]

type Face = CompositeMatrix<DodecaminxSticker>

const isEven = (n: number) => n % 2 === 0

const mapCols = (n: number) => times(n ** 2).map((_, i) => i % n)
const mapRows = (n: number) => times(n ** 2).map((_, i) => Math.floor(i / n))

const origin: Vector = [0, 0]

const [p0, p1, p2, p3, p4]: Vector[] = [
  [0, 1],
  [Math.sin((Math.PI * 2) / 5), Math.cos((Math.PI * 2) / 5)],
  [Math.sin((Math.PI * 4) / 5), -Math.cos(Math.PI / 5)],
  [-Math.sin((Math.PI * 4) / 5), -Math.cos(Math.PI / 5)],
  [-Math.sin((Math.PI * 2) / 5), Math.cos((Math.PI * 2) / 5)],
]

const m_p0_p1 = bilerp(p0, p1, 0.5)
const m_p1_p2 = bilerp(p1, p2, 0.5)
const m_p2_p3 = bilerp(p2, p3, 0.5)
const m_p3_p4 = bilerp(p3, p4, 0.5)
const m_p4_p0 = bilerp(p4, p0, 0.5)

const [s0, s1, s2, s3, s4]: Line[] = [
  [m_p4_p0, m_p1_p2],
  [m_p0_p1, m_p2_p3],
  [m_p1_p2, m_p3_p4],
  [m_p2_p3, m_p4_p0],
  [m_p3_p4, m_p0_p1],
]

const innerRadius = measure(origin, m_p0_p1)
const lOrigin = bilerp(origin, m_p3_p4, 2)
const fOrigin = bilerp(origin, m_p2_p3, 2)
const rOrigin = bilerp(origin, m_p1_p2, 2)
const blOrigin = bilerp(origin, m_p4_p0, 2)
const brOrigin = bilerp(origin, m_p0_p1, 2)
const dbrOrigin = angleFrom(rOrigin, 18, innerRadius * 2)
const dOrigin = angleFrom(dbrOrigin, -18, innerRadius * 2)
const bOrigin = angleFrom(dOrigin, 90, innerRadius * 2)
const dlOrigin = angleFrom(dOrigin, -54, innerRadius * 2)
const dblOrigin = angleFrom(dOrigin, 18, innerRadius * 2)
const drOrigin = angleFrom(dOrigin, -126, innerRadius * 2)

const net: Record<DodecaminxFace, [Vector, number]> = {
  u: [origin, 0],
  l: [lOrigin, 36],
  f: [fOrigin, 36],
  r: [rOrigin, 36],
  bl: [blOrigin, 36],
  br: [brOrigin, 36],
  dbr: [dbrOrigin, 0],
  d: [dOrigin, 36],
  b: [bOrigin, 0],
  dbl: [dblOrigin, 0],
  dr: [drOrigin, 0],
  dl: [dlOrigin, 0],
}

const centerPath: Vector[] = [
  intersect(s4, s0) as Vector,
  intersect(s1, s0) as Vector,
  intersect(s1, s2) as Vector,
  intersect(s2, s3) as Vector,
  intersect(s4, s3) as Vector,
]

const size = computed(() => props.dodecaminx.size)
const halfSize = computed(() => floor(size.value / 2))

const cornerOrigins = computed(() =>
  isEven(size.value)
    ? [origin, origin, origin, origin, origin]
    : centerPath,
)

const cornerOutlines = computed(() => {
  const [cp0, cp1, cp2, cp3, cp4] = cornerOrigins.value
  return [
    [p0, m_p0_p1, cp0, m_p4_p0],
    [p1, m_p1_p2, cp1, m_p0_p1],
    [p2, m_p2_p3, cp2, m_p1_p2],
    [p3, m_p3_p4, cp3, m_p2_p3],
    [p4, m_p4_p0, cp4, m_p3_p4],
  ]
})

const middleOutlines = computed(() => {
  if (isEven(size.value)) return []
  const [cp0, cp1, cp2, cp3, cp4] = cornerOrigins.value
  return [
    [m_p0_p1, cp1, cp0],
    [m_p1_p2, cp2, cp1],
    [m_p2_p3, cp3, cp2],
    [m_p3_p4, cp4, cp3],
    [m_p4_p0, cp0, cp4],
  ]
})

const strokeWidth = computed(() =>
  size.value > 10 ? 0.01 : Math.max(0.02, (7 - size.value) / 100),
)

const color = (sticker: DodecaminxSticker) => {
  const i = FACE_ORDER.indexOf(sticker.face)
  return COLORS[i] ?? '#9CA3AF'
}

const center = (face: Face): { path: Vector[], sticker: DodecaminxSticker } | null => {
  if (isEven(size.value) || face.length < 3) return null
  const c = face[2]
  return c !== undefined ? { path: centerPath, sticker: c } : null
}

const corners = (face: Face): { path: Vector[], sticker: DodecaminxSticker }[] => {
  const stickers: { path: Vector[], sticker: DodecaminxSticker }[] = []
  const cornerLayers = halfSize.value
  if (cornerLayers < 1) return stickers
  const n = cornerLayers
  const colMap = mapCols(n)
  const rowMap = mapRows(n)
  const layerSize = 1 / n
  const cornersData = face[0]

  cornersData.forEach((corner, cornerIndex) => {
    corner.forEach((sticker, stickerIndex) => {
      const col = colMap[stickerIndex]
      const row = rowMap[stickerIndex]
      const quintant = cornerOutlines.value[cornerIndex]
      const l1 = bilerp(quintant[3], quintant[2], layerSize * col)
      const l2 = bilerp(quintant[0], quintant[1], layerSize * col)
      const r1 = bilerp(quintant[3], quintant[2], layerSize * (col + 1))
      const r2 = bilerp(quintant[0], quintant[1], layerSize * (col + 1))
      const c1 = bilerp(l1, l2, 1 - layerSize * row)
      const c2 = bilerp(l1, l2, 1 - layerSize * (row + 1))
      const c3 = bilerp(r1, r2, 1 - layerSize * (row + 1))
      const c4 = bilerp(r1, r2, 1 - layerSize * row)
      stickers.push({ path: [c1, c2, c3, c4], sticker })
    })
  })
  return stickers
}

const middles = (face: Face): { path: Vector[], sticker: DodecaminxSticker }[] => {
  const stickers: { path: Vector[], sticker: DodecaminxSticker }[] = []
  if (isEven(size.value) || face.length < 2 || !face[1]) return stickers
  const middleRows = face[1]
  middleRows.forEach((middle, middleIndex) => {
    const [mo0, mo1, mo2] = middleOutlines.value[middleIndex]
    middle.forEach((sticker, stickerIndex, arr) => {
      const st = sticker
      if (st === undefined) return
      const mp0 = bilerp(mo0, mo1, stickerIndex / arr.length)
      const mp1 = bilerp(mo0, mo1, (stickerIndex + 1) / arr.length)
      const mp2 = bilerp(mo0, mo2, (stickerIndex + 1) / arr.length)
      const mp3 = bilerp(mo0, mo2, stickerIndex / arr.length)
      stickers.push({ path: [mp0, mp1, mp2, mp3], sticker: st })
    })
  })
  return stickers
}

const pathD = (arr: Vector[]) => {
  if (arr.length === 0) return ''
  const [start, ...points] = toPathCoords(arr)
  return `M ${start.join(',')} L ${points.map(p => p.join(',')).join(' ')} Z`
}

const faces = computed(() =>
  (Object.entries(net) as [DodecaminxFace, [Vector, number]][]).map(([key, [v, deg]]) => {
    const face = props.dodecaminx.state[key] as Face
    const [x, y] = toSvgCoords(v)
    const centerSticker = center(face)
    const stickerList = [
      ...corners(face),
      ...middles(face),
      ...(centerSticker ? [centerSticker] : []),
    ]
    return {
      key,
      stickers: stickerList,
      transform: `translate(${x},${y}) rotate(${deg})`,
    }
  }),
)

const outline = [p0, p1, p2, p3, p4]
</script>
