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
        class="border-dashed border-4 border-gray-800 text-gray-700"
        viewBox="0 0 4 4"
        xmlns="http://www.w3.org/2000/svg">
        <g
          v-for="face in faces"
          :key="face.key"
          :transform="face.transform">
          <path
            v-for="(path, index) in face.paths"
            fill="transparent"
            stroke-width="0.01"
            stroke="currentColor"
            :d="d(path)"
            :key="`corner-${index}`" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { bilerp, intersect, isEven } from '@/utils';
import { times } from 'lodash-es';
import PuzzleHeader from '@/components/PuzzleHeader.vue';
import { Dodecaminx } from '../../../dist/index.esm';

const toSvgOrientation = ([x, y]) => [x, -y];
const toPathCoordinates = (arr) => arr.map(toSvgOrientation);

// default puzzle size
const defaultSize = 5;

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

const t = ([x, y]) => `translate(${x},${y})`;

const height = 0.80901699;
const uOrigin = [2, 1];
const fOrigin = bilerp([2, 1], [2, 0], -height * 2);

const faceTransforms = {
  u: `${t(uOrigin)}`,
  f: `${t(fOrigin)} rotate(36)`,
};

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
        return null;
      }

      return [
        intersect(s4, s0),
        intersect(s1, s0),
        intersect(s1, s2),
        intersect(s2, s3),
        intersect(s4, s3),
      ];
    },
    cornerOrigins() {
      return this.isEven
        ? [origin, origin, origin, origin, origin]
        : this.center;
    },
    cornerOutlines() {
      const [cp0, cp1, cp2, cp3, cp4] = this.cornerOrigins;

      return [
        [cp0, m_p4_p0, p0, m_p0_p1],
        [cp1, m_p0_p1, p1, m_p1_p2],
        [cp2, m_p1_p2, p2, m_p2_p3],
        [cp3, m_p2_p3, p3, m_p3_p4],
        [cp4, m_p3_p4, p4, m_p4_p0],
      ];
    },
    faces() {
      return Object.entries(faceTransforms).map(([key, transform]) => {
        const face = this.model.state[key];

        return {
          key,
          paths: [
            this.center,
            ...this.corners(face),
            ...this.middles(face),
          ].filter((x) => x),
          transform,
        };
      });
    },
    isEven() {
      return isEven(this.puzzleSize);
    },
    middleOutlines() {
      if (this.isEven) {
        return [];
      }

      const [cp0, cp1, cp2, cp3, cp4] = this.cornerOrigins;

      return [
        [cp0, cp1, m_p0_p1],
        [cp1, cp2, m_p1_p2],
        [cp2, cp3, m_p2_p3],
        [cp3, cp4, m_p3_p4],
        [cp4, cp0, m_p4_p0],
      ];
    },
    puzzleSize() {
      return this.model?.options?.size || defaultSize;
    },
  },
  methods: {
    corners(face) {
      const paths = [];

      const cornerLayers = Math.floor(this.puzzleSize / 2);
      const colMap = mapColumns(cornerLayers);
      const rowMap = mapRows(cornerLayers);
      const layerSize = 1 / (cornerLayers);

      face.corners.forEach((corner, cornerIndex) => {
        corner.forEach((sticker, stickerIndex) => {
          const col = colMap[stickerIndex];
          const row = rowMap[stickerIndex];
          const quintant = this.cornerOutlines[cornerIndex];

          const l1 = bilerp(quintant[0], quintant[3], layerSize * col);
          const l2 = bilerp(quintant[1], quintant[2], layerSize * col);
          const r1 = bilerp(quintant[0], quintant[3], layerSize * (col + 1));
          const r2 = bilerp(quintant[1], quintant[2], layerSize * (col + 1));

          const c1 = bilerp(l1, l2, 1 - (layerSize * row));
          const c2 = bilerp(l1, l2, 1 - (layerSize * (row + 1)));
          const c3 = bilerp(r1, r2, 1 - (layerSize * (row + 1)));
          const c4 = bilerp(r1, r2, 1 - (layerSize * row));

          paths.push([c1, c2, c3, c4]);
        });
      });

      return paths;
    },
    d(arr) {
      const [start, ...points] = toPathCoordinates(arr);

      return `M ${start.join(',')} L ${points.map((p) => p.join(',')).join(' ')} Z`;
    },
    fresh() {
      console.log('fresh');

      this.model = new Dodecaminx({
        size: this.puzzleSize,
      });

      window.dodecaminx = this.model;
    },
    middles(face) {
      const paths = [];

      face.middles.forEach((middle, middleIndex) => {
        const [mo0, mo1, mo2] = this.middleOutlines[middleIndex];

        middle.forEach((sticker, stickerIndex, arr) => {
          const l1 = bilerp(mo0, mo2, stickerIndex / arr.length);
          const l2 = bilerp(mo0, mo2, (stickerIndex + 1) / arr.length);
          const r1 = bilerp(mo1, mo2, stickerIndex / arr.length);
          const r2 = bilerp(mo1, mo2, (stickerIndex + 1) / arr.length);

          paths.push([l1, l2, r2, r1]);
        });
      });

      return paths;
    },
  },
  watch: {
    'model.options.size': 'fresh',
  },
};
</script>
