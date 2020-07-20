<style scoped>
  rect {
    stroke: theme('colors.gray.900');
  }
</style>

<template>
  <div>
    <h2 class="font-bold leading-none mb-6 text-2xl">Cube</h2>

    <div class="grid gap-6 items-start md:grid-cols-2">
      <div>
        <div class="grid gap-6 grid-cols-6 mb-6">
          <form class="col-span-6 xl:col-span-2" @submit.prevent="turn">
            <Input
              v-model="turns"
              autofocus
              placeholder="enter turns" />
          </form>
          <Button class="col-span-6 sm:col-span-3 xl:col-span-2" @click="model.scramble()">Scramble</Button>
          <Button class="col-span-6 sm:col-span-3 xl:col-span-2" @click="model.reset()">Reset</Button>
        </div>
        <p class="leading-loose mb-6">
          This cube is exposed globally as <ClickableCode @click="log">window.cube</ClickableCode>.
          Use your dev tools or the inputs above to manipulate it. For example, try runnning <ClickableCode @click="resize">cube.options.size = n</ClickableCode>,
          or <ClickableCode @click="model.turn('R')">cube.turn('R')</ClickableCode>.
        </p>

        <div class="font-bold mb-1">Options:</div>
        <pre v-text="model.options" class="mb-6" />

        <div class="font-bold mb-1">Solved:</div>
        <div class="mb-6" v-text="model.isSolved()" />

        <div class="font-bold mb-1">Turns:</div>
        <div
          v-text="scramble || 'None'"
          class="overflow-y-auto select-all"
          style="max-height: 240px" />
      </div>

      <svg
        viewBox="0 0 4 3"
        xmlns="http://www.w3.org/2000/svg">
        <g
          v-for="face in Object.keys(model.state)"
          :key="face"
          :transform="`translate(${faceTransforms[face][0]}, ${faceTransforms[face][1]})`">
          <rect
            v-for="(sticker, index) in model.state[face]"
            :fill="colors[sticker.value]"
            :height="stickerSize"
            :key="index"
            :rx="stickerSize / 4"
            :stroke-width="stickerSize / 10"
            :width="stickerSize"
            :x="stickerSize * colMap[index]"
            :y="stickerSize * rowMap[index]"
          />
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
import { times } from 'lodash-es';
import Button from '@/components/Button.vue';
import ClickableCode from '@/components/ClickableCode.vue';
import Input from '@/components/Input.vue';
import { Cube } from '../../../dist/index.esm';

const mapColumns = (n) => times(n ** 2).map((x, i) => i % n);

const mapRows = (n) => times(n ** 2).map((x, i) => Math.floor(i / n));

export default {
  created() {
    this.fresh();
  },
  data() {
    return {
      model: null,
      scramble: null,
      turns: '',
    };
  },
  components: {
    Button,
    ClickableCode,
    Input,
  },
  computed: {
    colors() {
      return ['#FFEE5D', '#EFAA18', '#2589E2', '#EC6157', '#5CBD60', '#F0F0F0'];
    },
    colMap() {
      return mapColumns(this.puzzleSize);
    },
    faceTransforms() {
      return {
        u: [1, 0],
        l: [0, 1],
        f: [1, 1],
        r: [2, 1],
        b: [3, 1],
        d: [1, 2],
      };
    },
    puzzleSize() {
      return this.model?.options?.size || 3;
    },
    rowMap() {
      return mapRows(this.puzzleSize);
    },
    stickerSize() {
      return 1 / this.puzzleSize;
    },
  },
  methods: {
    fresh() {
      this.model = new Cube({ size: this.puzzleSize });

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

      window.cube = this.model;
    },
    log() {
      console.log(window.cube);
    },
    resize() {
      const max = 10;
      this.model.options.size = Math.max((this.model.options.size + 1) % (max + 1), 2);
    },
    turn() {
      this.model.turn(this.turns);
    },
  },
  watch: {
    'model.options.size': 'fresh',
  },
};
</script>
