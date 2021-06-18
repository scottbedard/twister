<template>
  <div class="border-b border-gray-300 flex h-20 justify-between px-6 dark:border-gray-600">
    <div class="flex font-bold items-center">
      Twister
    </div>

    <nav class="flex gap-4 items-center">
      <a href="#" @click.prevent>
        Cube
      </a>

      <a href="#" @click.prevent>
        Dodecaminx
      </a>

      <a
        href="https://github.com/scottbedard/twister"
        target="_blank">
        <Icon name="github" size="4.5" />
      </a>

      <a
        href="#"
        title="Visit speedcube.site"
        @click.prevent>
        <Icon name="box" />
      </a>

      <a
        href="#"
        :title="`Toggle ${isDark ? 'light' : 'dark'} mode`"
        @click.prevent="toggleDark">
        <Icon :name="isDark ? 'moon' : 'sun'" />
      </a>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Icon } from '@/components'
import { useToggle } from '@vueuse/core'
import { isDark } from '@/store/state'

export default defineComponent({
  setup() {
    const toggleDark = useToggle(isDark)

    return {
      isDark,
      toggleDark,
    }
  },
  components: {
    Icon
  },
})
</script>