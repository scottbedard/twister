<template>
  <div>
    <PuzzleHeader>Dodecaminx</PuzzleHeader>

    <div class="grid gap-6 items-start md:grid-cols-2">
      <div class="gap-6 grid grid-cols-3 text-center sm:grid-cols-4">
        <a
          v-for="n in 24"
          v-text="n + 1"
          class="text-xl hover:underline"
          href="#"
          :class="{
            'font-bold text-blue-700': n + 1 === model.options.size
          }"
          :key="n"
          @click.prevent="model.options.size = n + 1" />
      </div>
      <svg
        v-if="face"
        class="border-2 border-dashed border-gray-700"
        viewBox="0 0 2 2"
        xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(1, 1) rotate(0)">
          <path
            v-for="(sticker, index) in face"
            :d="path(sticker)"
            :key="index"
            stroke-width="0.0025"
            stroke="red" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { map, sortedIndex, times } from 'lodash-es';
import PuzzleHeader from '@/components/PuzzleHeader.vue';
import { bilerp, intersect, isEven } from '@/utils';
import { Dodecaminx } from '../../../dist/index.esm';

const toPathCoordinates = arr => arr.map(([x, y]) => [x, -y]);

// origin
const origin = [0, 0];

// outer pentagon
const [p0, p1, p2, p3, p4] = [
  [0, 1],
  [Math.sin((Math.PI * 2) / 5), Math.cos((Math.PI * 2) / 5)],
  [Math.sin((Math.PI * 4) / 5), -Math.cos(Math.PI / 5)],
  [-Math.sin((Math.PI * 4) / 5), -Math.cos(Math.PI / 5)],
  [-Math.sin((Math.PI * 2) / 5), Math.cos((Math.PI * 2) / 5)],
];

// outer midpoints
const m_p0_p1 = bilerp(p0, p1, 0.5);
const m_p1_p2 = bilerp(p1, p2, 0.5);
const m_p2_p3 = bilerp(p2, p3, 0.5);
const m_p3_p4 = bilerp(p3, p4, 0.5);
const m_p4_p0 = bilerp(p4, p0, 0.5);

/**
 * Generate sticker paths
 */
function generateStickers(model) {
  const faceLayers = Math.floor(model.options.size / 2);

  if (isEven(model.options.size)) {    
    const perimeter = [p0, p1, p2, p3, p4]
      .map((p, i, arr) => [p, arr[i + 1] || arr[0]])
      .map(l => times(model.options.size)
        .map((x, j) => bilerp(l[0], l[1], j / model.options.size))
      );

    const asterisk = times(faceLayers).map((x, i) => [
      bilerp(origin, m_p0_p1, 1 - (i / faceLayers)),
      bilerp(origin, m_p1_p2, 1 - (i / faceLayers)),
      bilerp(origin, m_p2_p3, 1 - (i / faceLayers)),
      bilerp(origin, m_p3_p4, 1 - (i / faceLayers)),
      bilerp(origin, m_p4_p0, 1 - (i / faceLayers)),
    ]);

    return [
      // [p0, p1, p2, p3, p4],
      ...asterisk,
      ...perimeter,
    ];
  }

  return [
    [p0, p1, p2, p3, p4],
  ];
}

// const [s0, s1, s2, s3, s4] = [
//   bilerp(p0, p1, 0.5),
//   bilerp(p1, p2, 0.5),
//   bilerp(p2, p3, 0.5),
//   bilerp(p3, p4, 0.5),
//   bilerp(p4, p0, 0.5),
// ];

// // kilominx
// const kilominx = [
//   [origin, s4, p0, s0, origin],
//   [origin, s0, p1, s1, origin],
//   [origin, s1, p2, s2, origin],
//   [origin, s2, p3, s3, origin],
//   [origin, s3, p4, s4, origin],
// ];

// // megaminx
// const [ip0, ip1, ip2, ip3, ip4] = [
//   intersect([s0, s3], [s4, s1]),
//   intersect([s0, s2], [s4, s1]),
//   intersect([s0, s2], [s1, s3]),
//   intersect([s1, s3], [s2, s4]),
//   intersect([s3, s0], [s2, s4]),
// ];

// const megaminx = [
//   [ip0, ip1, ip2, ip3, ip4],
//   [p0, s0, ip0, s4],
//   [s0, ip0, ip1],
//   [s0, p1, s1, ip1, s0],
//   [s1, ip2, ip1],
//   [p2, s2, ip2, s1, p2],
//   [s2, ip2, ip3],
//   [s2, p3, s3, ip3],
//   [s3, ip3, ip4],
//   [p4, s4, ip4, s3],
//   [s4, ip0, ip4],
// ];

// // masterminx
// const [ o0, o1, o2, o3, o4, o5, o6, o7, o8, o9 ] = [
//   bilerp(p0, p1, 0.25),
//   bilerp(p0, p1, 0.75),
//   bilerp(p1, p2, 0.25),
//   bilerp(p1, p2, 0.75),
//   bilerp(p2, p3, 0.25),
//   bilerp(p2, p3, 0.75),
//   bilerp(p3, p4, 0.25),
//   bilerp(p3, p4, 0.75),
//   bilerp(p4, p0, 0.25),
//   bilerp(p4, p0, 0.75),
// ];

// const masterminx = [
//   [p0, p1, p2, p3, p4],
//   [p0, o0, intersect([o0, bilerp(s4, origin, 0.5)], [o9, bilerp(s0, origin, 0.5)]), o9],
//   [o0, s0, bilerp(s0, origin, 0.5), intersect([o0, bilerp(s4, origin, 0.5)], [o9, bilerp(s0, origin, 0.5)])],
//   [s0, o1, bilerp(s1, origin, 0.5), o2, bilerp(s0, origin, 0.5)],
// ];

export default {
  created() {
    this.fresh();
  },
  data() {
    return {
      model: null,
    };
  },
  components: {
    PuzzleHeader,
  },
  computed: {
    isEven() {
      return this.size % 2 === 0;
    },
    face() {
      const stickers = generateStickers(this.model);

      return stickers.map(toPathCoordinates);
    },
    puzzleSize() {
      return this.model?.options?.size || 4;
    },
  },
  methods: {
    fresh() {
      this.model = new Dodecaminx({
        size: this.puzzleSize,
      });

      window.dodecaminx = this.model;
    },
    path([ start, ...points ]) {
      return `M ${start.join(',')} L ${points.map(p => p.join(',')).join(' ')} Z`;
    },
  },
  watch: {
    'model.options.size': 'fresh',
  }
};
</script>
