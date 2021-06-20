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
        <div>Solved: true</div>
        <div>Turns: None</div>
      </div>
    </div>

    <div class="md:col-span-6">
      <pre class="text-xs">{{ model.output() }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Button, InlineCode, Input } from 'playground/components'
import { computed, defineComponent, ref, watch } from 'vue'
import { Dodecaminx } from '@/index'
import DodecaminxNet from 'playground/partials/dodecaminx/DodecaminxNet.vue'

export default defineComponent({
  setup() {
    const model = ref(new Dodecaminx({ size: 3 }))

    const turns = ref('')

    const nextSize = computed(() => model.value.options.size >= 10 ? 2 : model.value.options.size + 1)

    const reset = () => {
      model.value = new Dodecaminx({ size: model.value.options.size })
    }

    const scramble = () => {
      model.value.scramble()
    }

    watch(() => model.value.options.size, reset)

    return {
      model,
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