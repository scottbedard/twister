<template>
  <a
    class="bg-gray-100 font-mono px-2 py-1 rounded unstyled whitespace-pre hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
    :href="href">
    <slot />
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    href: {
      default: '#',
      type: String,
    },
  },
})
</script>
