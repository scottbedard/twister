<template>
  <div>
    <svg
      viewBox="0 0 9.8 4.9"
      xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2.6, 2.2)">
        <g
          v-for="face in faces"
          :key="face.key"
          :transform="face.transform">
          <path
            v-for="(obj, index) in face.stickers"
            stroke="currentColor"
            :d="d(obj?.path ?? [])"
            :fill="colors[obj?.sticker.value]"
            :key="`corner-${index}`"
            :stroke-width="strokeWidth" />
        </g>
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { angleFrom, bilerp, intersect, isEven, measure, toPathCoords, toSvgCoords } from 'playground/utils/math'
import { computed, defineComponent, PropType } from 'vue'
import { Dodecaminx } from '@/index'
import { identity, times } from 'lodash-es'
import { Line, Vector } from 'playground/utils/types'

type Face = Dodecaminx['state']['u']

const mapCols = (n: number) => times(n ** 2).map((x, i) => i % n)
const mapRows = (n: number) => times(n ** 2).map((x, i) => Math.floor(i / n))

// colors
const colors = [
  '#718096', // b: gray
  '#ED8936', // bl: orange
  '#9AE6B4', // br: light green
  '#FBD38D', // d: creme
  '#90CDF4', // dbl: light blue
  '#F687B3', // dbr: pink
  '#2F855A', // dl: dark green
  '#E53E3E', // dr: red
  '#F7FAFC', // f: white
  '#9F7AEA', // l: purple
  '#2B6CB0', // r: dark blue
  '#F6E05E', // u: yellow
]

// origin
const origin: Vector = [0, 0]

// outer pentagon
const [p0, p1, p2, p3, p4]: Vector[] = [
  [0, 1],
  [Math.sin((Math.PI * 2) / 5), Math.cos((Math.PI * 2) / 5)],
  [Math.sin((Math.PI * 4) / 5), -Math.cos(Math.PI / 5)],
  [-Math.sin((Math.PI * 4) / 5), -Math.cos(Math.PI / 5)],
  [-Math.sin((Math.PI * 2) / 5), Math.cos((Math.PI * 2) / 5)],
]

// outer midpoints
const m_p0_p1 = bilerp(p0, p1, 0.5)
const m_p1_p2 = bilerp(p1, p2, 0.5)
const m_p2_p3 = bilerp(p2, p3, 0.5)
const m_p3_p4 = bilerp(p3, p4, 0.5)
const m_p4_p0 = bilerp(p4, p0, 0.5)

// star lines
const [s0, s1, s2, s3, s4]: Line[] = [
  [m_p4_p0, m_p1_p2],
  [m_p0_p1, m_p2_p3],
  [m_p1_p2, m_p3_p4],
  [m_p2_p3, m_p4_p0],
  [m_p3_p4, m_p0_p1],
]

// dodecahedron net
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

const net: Record<keyof Dodecaminx['state'], [Vector, number]> = {
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

// center path
const centerPath = [
  intersect(s4, s0) as Vector,
  intersect(s1, s0) as Vector,
  intersect(s1, s2) as Vector,
  intersect(s2, s3) as Vector,
  intersect(s4, s3) as Vector,
]

export default defineComponent({
  setup(props) {
    const cornerOrigins = computed(() => isEven(props.model.options.size)
        ? [origin, origin, origin, origin, origin]
        : centerPath
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

    const faces = computed(() => Object.entries(net).map(([key, transform]) => {
      const face = props.model.state[key as keyof Dodecaminx['state']]
      const [v, deg] = transform
      const [x, y] = toSvgCoords(v)
      
      return {
        key,
        stickers: [
          ...corners(face),
          ...middles(face),
          center(face),
        ].filter(identity),
        transform: `translate(${x},${y}) rotate(${deg})`,
      }
    }))

    const middleOutlines = computed(() => {
      if (isEven(props.model.options.size)) {
        return []
      }

      const [cp0, cp1, cp2, cp3, cp4] = cornerOrigins.value

      return [
        [m_p0_p1, cp1, cp0],
        [m_p1_p2, cp2, cp1],
        [m_p2_p3, cp3, cp2],
        [m_p3_p4, cp4, cp3],
        [m_p4_p0, cp0, cp4],
      ]
    })

    const strokeWidth = computed(() => {
      return props.model.options.size > 10
        ? 0.01
        : Math.max(0.02, (7 - props.model.options.size) / 100)
    })

    const center = (face: Face) => {
      return isEven(props.model.options.size)
        ? null
        : {  path: centerPath, sticker: face[2] }
    }

    const corners = (face: Face) => {
      const stickers: { path: Vector[], sticker: any }[] = []
      const cornerLayers = Math.floor(props.model.options.size / 2)
      const colMap = mapCols(cornerLayers)
      const rowMap = mapRows(cornerLayers)
      const layerSize = 1 / cornerLayers

      face[0].forEach((corner: any, cornerIndex: any) => {
        corner.forEach((sticker: any, stickerIndex: any) => {
          const col = colMap[stickerIndex]
          const row = rowMap[stickerIndex]
          const quintant = cornerOutlines.value[cornerIndex]
          const l1 = bilerp(quintant[3], quintant[2], layerSize * col)
          const l2 = bilerp(quintant[0], quintant[1], layerSize * col)
          const r1 = bilerp(quintant[3], quintant[2], layerSize * (col + 1))
          const r2 = bilerp(quintant[0], quintant[1], layerSize * (col + 1))
          const c1 = bilerp(l1, l2, 1 - (layerSize * row))
          const c2 = bilerp(l1, l2, 1 - (layerSize * (row + 1)))
          const c3 = bilerp(r1, r2, 1 - (layerSize * (row + 1)))
          const c4 = bilerp(r1, r2, 1 - (layerSize * row))

          stickers.push({
            path: [c1, c2, c3, c4],
            sticker,
          })
        })
      })

      return stickers
    }

    const d = (arr: (Vector | undefined)[]) => {
      const [start, ...points] = toPathCoords(arr as Vector[])

      return `M ${start.join(',')} L ${points.map((p) => p.join(',')).join(' ')} Z`
    }

    const middles = (face: Face) => {
      const stickers: { path: Vector[], sticker: any }[] = []

      face[1]?.forEach((middle, middleIndex) => {
        const [mo0, mo1, mo2] = middleOutlines.value[middleIndex]

        middle.forEach((sticker, stickerIndex, arr) => {
          const mp0 = bilerp(mo0, mo1, stickerIndex / arr.length)
          const mp1 = bilerp(mo0, mo1, (stickerIndex + 1) / arr.length)
          const mp2 = bilerp(mo0, mo2, (stickerIndex + 1) / arr.length)
          const mp3 = bilerp(mo0, mo2, stickerIndex / arr.length)

          stickers.push({
            path: [mp0, mp1, mp2, mp3],
            sticker,
          })
        })
      })

      return stickers
    }

    return {
      colors,
      d,
      faces,
      strokeWidth,
    }
  },
  props: {
    model: {
      required: true,
      type: Object as PropType<Dodecaminx>
    },
  },
})
</script>
