<template>
  <div>
    <RangeInput
      v-model="size"
      :label="`Size (${size})`"
    />

    <pre>{{ foo }}</pre>

    <div class="gap-2 grid grid-cols-4">
      <div class="col-start-2 border border-[red]">
        U
      </div>

      <div class="row-start-2 border border-[blue]">
        L
      </div>

      <div class="row-start-2 border border-[green]">
        F
      </div>

      <div class="row-start-2 border border-[yellow]">
        R
      </div>

      <div class="row-start-2 border border-[purple]">
        B
      </div>
      <div class="row-start-3 col-start-2 border border-[orange]">
        D
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import RangeInput from './RangeInput.vue'
import { Cube } from '@/index'

const size = ref(3)
const foo = ref(new Cube(3))
</script>
