<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

a:not(.unstyled) {
  @apply hover:text-green-500;
}
</style>

<template>
  <Header />

  <div class="p-6">
    <RouterView />
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