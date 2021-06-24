<template>
  <h1 class="font-bold text-2xl">
    Dodecaminx
  </h1>

  <p class="mb-6">
    A face-turning N-layered dodecahedron.
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
        <div><b>Solved:</b> {{ model.test() }}</div>
        <div><b>Turns:</b> {{ moveHistory.join(' ') }}</div>
      </div>
    </div>

    <div class="md:col-span-6">
      <DodecaminxNet :model="model" />
    </div>
  </div>
</template>

<script lang="ts">
import { Button, InlineCode, Input } from 'playground/components'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import { Dodecaminx } from '@/index'
import DodecaminxNet from 'playground/partials/dodecaminx/DodecaminxNet.vue'

export default defineComponent({
  setup() {
    const size = ref(3)
    
    const model = ref(new Dodecaminx({ size: size.value }))

    const moveHistory = ref<string[]>([])

    const turns = ref('')

    const nextSize = computed(() => model.value.options.size >= 10 ? 2 : model.value.options.size + 1)

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

    onMounted(reset)
    
    watch(() => model.value.options.size, (n: number) => {
      size.value = n
      reset()
    })

    return {
      model,
      moveHistory,
      nextSize,
      reset,
      scramble,
      turns,
    }
  },
  components: {
    Button,
    DodecaminxNet,
    InlineCode,
    Input,
  },
})
</script>