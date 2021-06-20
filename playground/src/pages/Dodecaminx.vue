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
          @keypress.enter="turn" />

        <Button @click="scramble">
          Scramble
        </Button>

        <Button @click="reset">
          Reset
        </Button>
      </div>
      
      <p class="leading-loose mb-6">
        This puzzle is exposed globally as <InlineCode>window.model</InlineCode> Use your dev tools or the inputs above to
        manipulate it. For example, try running <InlineCode>model.options.size = {{ 4 }}</InlineCode>,
        or <InlineCode>model.turn('R')</InlineCode>.
      </p>

      <div class="leading-loose">
        <div>Solved: true</div>
        <div>Turns: None</div>
      </div>
    </div>

    <div class="md:col-span-6">
      Soon...
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Button, InlineCode, Input } from 'playground/components'
import DodecaminxNet from 'playground/partials/dodecaminx/DodecaminxNet.vue'

export default defineComponent({
  setup() {
    const turns = ref('')

    const reset = () => {

    }

    const scramble = () => {

    }

    const turn = () => {

    }

    return {
      reset,
      scramble,
      turn,
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