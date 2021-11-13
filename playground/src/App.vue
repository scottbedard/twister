<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

a:not(.unstyled) {
  @apply hover:text-green-500;
}
</style>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />

    <div class="flex-1 p-6">
      <RouterView />
    </div>

    <div class="p-6 text-sm">
      <a
        v-text="`v${version}`"
        href="https://github.com/scottbedard/twister/blob/main/CHANGELOG.md"
        target="_blank"
        title="View changelog" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import { version } from '@/index'
import Header from './layout/Header.vue'
</script>