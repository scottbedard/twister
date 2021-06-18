<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

<template>
  <Header />

  <div class="p-6 text-center">
    Soon...
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Header from './layout/Header.vue'

export default defineComponent({
  components: {
    Header,
  },
})
</script>