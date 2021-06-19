<template>
  <div>
    <h1 class="font-bold text-2xl">
      Cube
    </h1>

    <p class="mb-6">
      A face-turning NxN cube.
    </p>

    <div class="gap-6 grid md:grid-cols-12">
      <div class="gap-6 grid sm:grid-cols-3 md:col-span-6 xl:col-span-4">
        <Input
          v-model="turns"
          autofocus
          placeholder="Enter turns" />

        <Button @click="scramble">
          Scramble
        </Button>

        <Button @click="reset">
          Reset
        </Button>
      </div>

      <div class="border border-blue-500 md:col-span-6 xl:col-span-8">
        Cube will go here
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Button, Input } from '@/components'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const turns = ref('')

    const reset = () => {
      console.log('reset')
    }

    const scramble = () => {
      console.log('scramble')
    }

    return {
      reset,
      scramble,
      turns,
    }
  },
  components: {
    Button,
    Input,
  },
})
</script>