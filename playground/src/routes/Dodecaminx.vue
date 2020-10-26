<template>
  <div class="grid gap-6 items-start md:grid-cols-12">
    <div class="md:col-span-5">
      <div class="grid gap-6 grid-cols-6 mb-6">
        <form class="col-span-6 xl:col-span-2" @submit.prevent="turn(turns)">
          <Input
            v-model="turns"
            autofocus
            placeholder="enter turns" />
        </form>
        <Button class="col-span-6 sm:col-span-3 xl:col-span-2" @click="model.scramble()">Scramble</Button>
        <Button class="col-span-6 sm:col-span-3 xl:col-span-2" @click="model.reset()">Reset</Button>
      </div>
      <p class="leading-loose mb-6">
        This puzzle is exposed globally as <ClickableCode @click="log">window.dodecaminx</ClickableCode>.
        It can be resized by running <ClickableCode @click="resize">dodecaminx.options.size = {{ nextSize }}</ClickableCode>.
        To execute turns, use the controls above or run commands like <ClickableCode @click="turn('U')">dodecaminx.turn('U')</ClickableCode>.
      </p>
      <div class="font-bold mb-1">Options:</div>
      <pre v-text="model.options" />
    </div>
    <div class="text-gray-900 relative w-full md:col-span-7">
      <svg
        class="absolute right-0"
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
              :d="d(obj.path)"
              :data-id="obj.sticker.data.id"
              :fill="colors[obj.sticker.value]"
              :key="`corner-${index}`"
              :stroke-width="strokeWidth" />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import {
  angleFrom, bilerp, intersect, isEven, measure,
} from '@/utils';
import { identity, times } from 'lodash-es';
import Button from '@/components/Button.vue';
import ClickableCode from '@/components/ClickableCode.vue';
import Input from '@/components/Input.vue';
import { Dodecaminx } from '~/index.esm';

const toSvgOrientation = ([x, y]) => [x, -y];

const toPathCoordinates = (arr) => arr.map(toSvgOrientation);

// colors
const colors = {
  b: '#718096', // gray
  bl: '#ED8936', // orange
  dl: '#2F855A', // dark green
  d: '#FBD38D', // creme
  dbl: '#90CDF4', // light blue
  dbr: '#F687B3', // pink
  br: '#9AE6B4', // light green
  dr: '#E53E3E', // red
  f: '#F7FAFC', // white
  l: '#B794F4', // purple
  r: '#2B6CB0', // dark blue
  u: '#F6E05E', // yellow
};

// custom initial values to map colors to faces
const initialValues = Object.keys(colors).reduce((acc, face) => Object.assign(acc, { [face]: face }), {});

// sizes
const defaultSize = 3;
const maxSize = 10;

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

// dodecahedron net
const innerRadius = measure(origin, m_p0_p1);
const lOrigin = bilerp(origin, m_p3_p4, 2);
const fOrigin = bilerp(origin, m_p2_p3, 2);
const rOrigin = bilerp(origin, m_p1_p2, 2);
const blOrigin = bilerp(origin, m_p4_p0, 2);
const brOrigin = bilerp(origin, m_p0_p1, 2);
const dbrOrigin = angleFrom(rOrigin, 18, innerRadius * 2);
const dOrigin = angleFrom(dbrOrigin, -18, innerRadius * 2);
const bOrigin = angleFrom(dOrigin, 90, innerRadius * 2);
const dlOrigin = angleFrom(dOrigin, -54, innerRadius * 2);
const dblOrigin = angleFrom(dOrigin, 18, innerRadius * 2);
const drOrigin = angleFrom(dOrigin, -126, innerRadius * 2);

const net = {
  u: [origin],
  l: [lOrigin, 36],
  f: [fOrigin, 36],
  r: [rOrigin, 36],
  bl: [blOrigin, 36],
  br: [brOrigin, 36],
  dbr: [dbrOrigin],
  d: [dOrigin, 36],
  b: [bOrigin],
  dbl: [dblOrigin],
  dr: [drOrigin],
  dl: [dlOrigin],
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
      turns: '',
    };
  },
  destroyed() {
    delete window.dodecaminx;
  },
  components: {
    Button,
    ClickableCode,
    Input,
  },
  computed: {
    centerPath() {
      return [
        intersect(s4, s0),
        intersect(s1, s0),
        intersect(s1, s2),
        intersect(s2, s3),
        intersect(s4, s3),
      ];
    },
    colors() {
      return colors;
    },
    cornerOrigins() {
      return this.isEven
        ? [origin, origin, origin, origin, origin]
        : this.centerPath;
    },
    cornerOutlines() {
      const [cp0, cp1, cp2, cp3, cp4] = this.cornerOrigins;

      return [
        [p0, m_p0_p1, cp0, m_p4_p0],
        [p1, m_p1_p2, cp1, m_p0_p1],
        [p2, m_p2_p3, cp2, m_p1_p2],
        [p3, m_p3_p4, cp3, m_p2_p3],
        [p4, m_p4_p0, cp4, m_p3_p4],
      ];
    },
    faces() {
      return Object.entries(net).map(([key, transform]) => {
        const face = this.model.state[key];
        const [coordinates, degrees = 0] = transform;
        const [x, y] = toSvgOrientation(coordinates);

        return {
          key,
          stickers: [
            this.center(face),
            ...this.corners(face),
            ...this.middles(face),
          ].filter(identity),
          transform: `translate(${x},${y}) rotate(${degrees})`,
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
        [m_p0_p1, cp1, cp0],
        [m_p1_p2, cp2, cp1],
        [m_p2_p3, cp3, cp2],
        [m_p3_p4, cp4, cp3],
        [m_p4_p0, cp0, cp4],
      ];
    },
    nextSize() {
      return Math.max((this.model.options.size + 1) % (maxSize + 1), 2);
    },
    prevSize() {
      if (this.model.options.size === 2) {
        return maxSize;
      }

      return Math.min(maxSize, Math.max(2, this.model.options.size - 1));
    },
    puzzleSize() {
      return this.model?.options?.size || defaultSize;
    },
    strokeWidth() {
      if (this.puzzleSize > 10) {
        return 0.01;
      }

      return Math.max(0.02, (7 - this.puzzleSize) / 100);
    },
  },
  methods: {
    center(face) {
      if (this.isEven) {
        return null;
      }

      return {
        path: this.centerPath,
        sticker: face.center,
      };
    },
    corners(face) {
      const stickers = [];

      const cornerLayers = Math.floor(this.puzzleSize / 2);
      const colMap = mapColumns(cornerLayers);
      const rowMap = mapRows(cornerLayers);
      const layerSize = 1 / cornerLayers;

      face.corners.forEach((corner, cornerIndex) => {
        corner.forEach((sticker, stickerIndex) => {
          const col = colMap[stickerIndex];
          const row = rowMap[stickerIndex];
          const quintant = this.cornerOutlines[cornerIndex];

          const l1 = bilerp(quintant[3], quintant[2], layerSize * col);
          const l2 = bilerp(quintant[0], quintant[1], layerSize * col);
          const r1 = bilerp(quintant[3], quintant[2], layerSize * (col + 1));
          const r2 = bilerp(quintant[0], quintant[1], layerSize * (col + 1));

          const c1 = bilerp(l1, l2, 1 - (layerSize * row));
          const c2 = bilerp(l1, l2, 1 - (layerSize * (row + 1)));
          const c3 = bilerp(r1, r2, 1 - (layerSize * (row + 1)));
          const c4 = bilerp(r1, r2, 1 - (layerSize * row));

          stickers.push({
            path: [c1, c2, c3, c4],
            sticker,
          });
        });
      });

      return stickers;
    },
    d(arr) {
      const [start, ...points] = toPathCoordinates(arr);

      return `M ${start.join(',')} L ${points.map((p) => p.join(',')).join(' ')} Z`;
    },
    fresh() {
      this.model = new Dodecaminx({
        size: this.puzzleSize,
        values: initialValues,
      });

      // tag each sticker with a unique id for easier debugging
      Object.keys(this.model.state).forEach((key) => {
        const face = this.model.state[key];

        if (face.center) {
          face.center.data.id = `center-${key}`;
        }

        face.corners.forEach((corners, i) => {
          corners.forEach((obj, j) => {
            obj.data.id = `${key}-corner-${'abcde'[i]}-${j}`;
          });
        });

        face.middles.forEach((middles, i) => {
          middles.forEach((obj, j) => {
            obj.data.id = `${key}-middle-${'abcde'[i]}-${j}`;
          });
        });
      });

      const reset = this.model.reset.bind(this.model);
      const turn = this.model.turn.bind(this.model);

      this.model.reset = () => {
        this.scramble = null;
        reset();
      };

      this.model.scramble = (turns) => {
        this.scramble = this.model.generateScramble(turns);
        this.model.turn(this.scramble);
      };

      this.model.turn = (alg) => {
        this.scramble = `${this.scramble || ''} ${alg}`.trim();
        turn(alg);
      };

      window.dodecaminx = this.model;
    },
    log() {
      console.log(window.dodecaminx);
    },
    middles(face) {
      const stickers = [];

      face.middles.forEach((middle, middleIndex) => {
        const [mo0, mo1, mo2] = this.middleOutlines[middleIndex];

        middle.forEach((sticker, stickerIndex, arr) => {
          const mp0 = bilerp(mo0, mo1, stickerIndex / arr.length);
          const mp1 = bilerp(mo0, mo1, (stickerIndex + 1) / arr.length);
          const mp2 = bilerp(mo0, mo2, (stickerIndex + 1) / arr.length);
          const mp3 = bilerp(mo0, mo2, stickerIndex / arr.length);

          stickers.push({
            path: [mp0, mp1, mp2, mp3],
            sticker,
          });
        });
      });

      return stickers;
    },
    resize(e) {
      this.model.options.size = e.ctrlKey || e.metaKey
        ? this.prevSize
        : this.nextSize;
    },
    turn(alg) {
      this.model.turn(alg);
    },
  },
  watch: {
    'model.options.size': 'fresh',
  },
};
</script>
