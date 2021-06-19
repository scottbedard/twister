<template>
  <div>
    <h1 class="font-bold text-2xl">
      Cube
    </h1>

    <p class="mb-6">
      A face-turning NxN cube.
    </p>

    <div class="gap-6 grid md:grid-cols-12">
      <div class="md:col-span-6 xl:col-span-4">
        <div class="gap-6 grid sm:grid-cols-3 ">
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

        <pre>{{ { size } }}</pre>
      </div>

      <div class="border border-blue-500 md:col-span-6 xl:col-span-8">
        <pre>{{ model }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Button, Input } from 'playground/components'
import { Cube } from '@/index'
import { defineComponent, onMounted, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    const size = ref(3)

    const model = ref(new Cube({ size: size.value }))

    const turns = ref('')

    const reset = () => {
      model.value = new Cube({ size: size.value })
    }

    const scramble = () => {
      model.value.scramble()
    }

    onMounted(() => {
      (window as any).model = model.value
    })
    
    watch(() => model.value.options.size, (n: number) => {
      size.value = n

      reset()
    })

    return {
      model,
      reset,
      scramble,
      size,
      turns,
    }
  },
  components: {
    Button,
    Input,
  },
})
</script>