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
        class="border border-dotted border-gray-800"
        viewBox="0 0 2 2"
        xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(1, 1) rotate(0)">
          <path
            v-if="center"
            fill="transparent"
            stroke-width="0.005"
            stroke="red"
            :d="d(center)" />
          <path
            v-for="(path, index) in middles"
            fill="transparent"
            stroke-width="0.005"
            stroke="red"
            :d="d(path)"
            :key="index" />
          <path
            v-for="(path, index) in corners"
            fill="transparent"
            stroke-width="0.005"
            stroke="red"
            :d="d(path)"
            :key="index" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const defaultSize = 3;

import { map, sortedIndex, times } from 'lodash-es';
import PuzzleHeader from '@/components/PuzzleHeader.vue';
import { bilerp, intersect, isEven } from '@/utils';
import { Dodecaminx } from '../../../dist/index.esm';
import { chunkCols, chunkRows } from '~/utils/array';

const toSvgOrientation = ([x, y]) => [x, -y];

const toPathCoordinates = arr => arr.map(toSvgOrientation);

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

// star lines
const [s0, s1, s2, s3, s4] = [
  [m_p4_p0, m_p1_p2],
  [m_p0_p1, m_p2_p3],
  [m_p1_p2, m_p3_p4],
  [m_p2_p3, m_p4_p0],
  [m_p3_p4, m_p0_p1],
];

const mapColumns = (n) => times(n ** 2).map((x, i) => i % n);
const mapRows = (n) => times(n ** 2).map((x, i) => Math.floor(i / n));

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
    center() {
      if (this.isEven) {
        return;
      }

      return [
        intersect(s4, s0),
        intersect(s1, s0),
        intersect(s1, s2),
        intersect(s2, s3),
        intersect(s4, s3),
      ];
    },
    corners() {
      const corners = [];

      const cornerLayers = Math.floor(this.puzzleSize / 2);
      const colMap = mapColumns(cornerLayers);
      const rowMap = mapRows(cornerLayers);
      const layerSize = 1 / (cornerLayers);

      this.model.state.u.corners.forEach((corner, cornerIndex) => {
        corner.forEach((sticker, stickerIndex) => {
          const col = colMap[stickerIndex];
          const row = rowMap[stickerIndex];
          const quintant = this.quintants[cornerIndex];

          const l1 = bilerp(quintant[0], quintant[3], layerSize * col);
          const l2 = bilerp(quintant[1], quintant[2], layerSize * col);
          const r1 = bilerp(quintant[0], quintant[3], layerSize * (col + 1));
          const r2 = bilerp(quintant[1], quintant[2], layerSize * (col + 1));

          const c1 = bilerp(l1, l2, 1 - (layerSize * row));
          const c2 = bilerp(l1, l2, 1 - (layerSize * (row + 1)));
          const c3 = bilerp(r1, r2, 1 - (layerSize * (row + 1)));
          const c4 = bilerp(r1, r2, 1 - (layerSize * row));

          corners.push([c1, c2, c3, c4]);
        });
      });

      return corners;
    },
    middles() {
      return [
        // ...
      ];
    },
    quintants() {
      const [q0, q1, q2, q3, q4] = this.quintantOrigins;

      return [
        [q0, m_p4_p0, p0, m_p0_p1],
        [q1, m_p0_p1, p1, m_p1_p2],
        [q2, m_p1_p2, p2, m_p2_p3],
        [q3, m_p2_p3, p3, m_p3_p4],
        [q4, m_p3_p4, p4, m_p4_p0],
      ];
    },
    quintantOrigins() {
      return this.isEven
        ? [origin, origin, origin, origin, origin]
        : this.center;
    },
    isEven() {
      return (this?.model?.options?.size || 0) % 2 === 0;
    },
    puzzleSize() {
      return this.model?.options?.size || defaultSize;
    },
  },
  methods: {
    d(arr) {
      const [start, ...points] = toPathCoordinates(arr);

      return `M ${start.join(',')} L ${points.map(p => p.join(',')).join(' ')} Z`;
    },
    fresh() {
      console.log('fresh');

      this.model = new Dodecaminx({
        size: this.puzzleSize,
      });

      window.dodecaminx = this.model;
    },
    line(v1, v2) {
      const [x1, y1] = toSvgOrientation(v1);
      const [x2, y2] = toSvgOrientation(v2);
      return { x1, x2, y1, y2 };
    },
  },
  watch: {
    'model.options.size': 'fresh',
  }
};
</script>
