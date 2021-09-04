<template>
  <h1 class="font-bold text-2xl">
    Dodecaminx
  </h1>

  <p class="mb-6">
    A face turning N-layered dodecahedron.
  </p>

  <div class="gap-6 grid md:grid-cols-12">
    <div class="md:col-span-6">
      <div class="gap-6 grid mb-6 sm:grid-cols-3 ">
        <Input
          v-model="turns"
          autofocus
          placeholder="Enter turns"
          @keypress.enter="model.turn(turns)" />

        <Button @click="scramble">
          Scramble
        </Button>

        <Button @click="reset">
          Reset
        </Button>
      </div>
      
      <p class="leading-loose mb-6">
        This puzzle is exposed globally as <InlineCode>window.model</InlineCode> Use your dev tools or the inputs above to
        manipulate it. For example, try running <InlineCode @click="model.options.size = nextSize">model.options.size = {{ nextSize }}</InlineCode>,
        or <InlineCode @click="model.turn('R')">model.turn('R')</InlineCode>.
      </p>

      <div class="leading-loose">
        <div class="flex flex-wrap items-center gap-x-3">
          <b>Editor:</b>

          <a
            v-for="(color, index) in colors"
            href="#"
            title="Select color"
            :class="['border border-darken-25 h-4 rounded-full shadow-sm transition-all w-4 dark:border-lighten-25', {
              'transform scale-150 shadow-md': selectedColor === index,
            }]"
            :style="{
              background: color,
            }"
            :key="index"
            @click.prevent="selectColor(index)" />

          <a
            class="unstyled hover:text-red-500"
            href="#"
            title="Clear puzzle"
            @click.prevent="clear">
            <Icon name="x" />
          </a>

          <a
            href="#"
            title="Copy state"
            @click.prevent="copyState">
            <Icon name="clipboard" size="4.2" />  
          </a>

          <span
            v-if="copied"
            class="font-bold text-xs">
            State copied!
          </span>
        </div>
        <div><b>Solved:</b> {{ model.test() }}</div>
        <div><b>Turns:</b> {{ moveHistory.join(' ') }}</div>
      </div>
    </div>

    <div class="md:col-span-6">
      <DodecaminxNet
        :colors="colors"
        :model="model"
        @click-sticker="onClickSticker" />
    </div>
  </div>
</template>

<script lang="ts">
import { Button, Icon, InlineCode, Input } from 'playground/components'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { Dodecaminx } from '@/index'
import { useClipboard } from '@vueuse/core'
import DodecaminxNet from 'playground/partials/dodecaminx/DodecaminxNet.vue'

export default defineComponent({
  setup() {
    const colors = [
      '#4B5563', // b: gray
      '#ED8936', // bl: orange
      '#9AE6B4', // br: light green
      '#FBD38D', // d: creme
      '#90CDF4', // dbl: light blue
      '#F687B3', // dbr: pink
      '#2F855A', // dl: dark green
      '#E53E3E', // dr: red
      '#F3F4F6', // f: white
      '#9F7AEA', // l: purple
      '#2B6CB0', // r: dark blue
      '#F6E05E', // u: yellow
    ]

    const clipboard = useClipboard()

    const copied = ref(false)

    const selectedColor = ref<number | null>(null)

    const size = ref(3)
    
    const model = ref(new Dodecaminx({ size: size.value }))

    const moveHistory = ref<string[]>([])

    const turns = ref('')

    const nextSize = computed(() => model.value.options.size >= 10 ? 2 : model.value.options.size + 1)

    const clear = () => {
      model.value.stickers().forEach(sticker => {
        sticker.value = null
      })
    }

    const copyState = () => {
      clipboard.copy(JSON.stringify(model.value.output()));

      copied.value = true;

      setTimeout(() => {
        copied.value = false;
      }, 3000);
    }

    const onClickSticker = (sticker: any) => {
      console.log('click', sticker)
      if (sticker.value === selectedColor.value) {
        sticker.value = null
      } else {
        sticker.value = selectedColor.value
      }
    }

    const reset = () => {
      moveHistory.value = []
      model.value = new Dodecaminx({ size: size.value })

      const nativeTurn = model.value.turn.bind(model.value)

      model.value.turn = (move: string) => {
        moveHistory.value.push(move)
        nativeTurn(move)
      }

      (window as any).model = model.value
    }

    const scramble = () => {
      model.value.scramble()
    }

    const selectColor = (color: number) => {
      if (color === selectedColor.value) {
        selectedColor.value = null
      } else {
        selectedColor.value = color
      }
    }

    onMounted(reset)
    
    watch(() => model.value.options.size, (n: number) => {
      size.value = n
      reset()
    })

    return {
      clear,
      colors,
      copied,
      copyState,
      model,
      moveHistory,
      nextSize,
      onClickSticker,
      reset,
      scramble,
      selectColor,
      selectedColor,
      turns,
    }
  },
  components: {
    Button,
    DodecaminxNet,
    Icon,
    InlineCode,
    Input,
  },
})
</script>