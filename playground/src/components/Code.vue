<template>
  <div class="bg-gray-100 font-mono group mb-2 p-4 relative rounded dark:bg-gray-700">
    <a
      class="absolute flex opacity-0 items-center right-4 text-xs top-4 group-hover:opacity-100"
      href="#"
      title="Copy to clipboard"
      @click.prevent.stop="copySource">
      <Icon name="copy" size="4" />
    </a>

    <div class="whitespace-pre-line" ref="source">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import Icon from './Icon.vue'

export default defineComponent({
  setup() {
    const source = ref<HTMLElement>()

    const { copy } = useClipboard()

    const copySource = () => {
      copy(source.value?.textContent?.trim() ?? '');
    }

    return {
      copySource,
      source,
    }
  },
  components: {
    Icon,
  },
})
</script>