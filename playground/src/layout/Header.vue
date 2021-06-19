<template>
  <div
    class="border-b border-gray-200 flex h-16 items-center justify-between px-6 dark:border-gray-600"
    ref="headerEl">
    <!-- title -->
    <RouterLink
      class="flex font-bold items-center"
      :to="{ name: 'home' }">
      <Icon class="mr-2" name="box" size="5.5" />

      Twister
    </RouterLink>

    <!-- mobile nav toggle -->
    <a
      class="sm:hidden"
      href="#"
      :title="`${isMobileNavExpanded ? 'Hide' : 'Show'} mobile navigation`"
      @click.prevent="toggleMobileNav">
      <Icon :name="isMobileNavExpanded ? 'x' : 'menu'" />
    </a>

    <!-- mobile nav -->
    <nav
      class="bg-white border-l border-gray-200 fixed flex flex-col h-full max-w-xs right-0 top-16 transform transition-transform w-2/3 dark:bg-gray-900 dark:border-gray-600 sm:hidden"
      :class="isMobileNavExpanded ? 'translate-x-0' : 'translate-x-full'">
      <RouterLink
        class="border-b border-gray-200 flex items-center px-2 py-4 dark:border-gray-600"
        :to="{ name: 'cube' }">
        <Icon class="mr-1" name="chevron-right" />

        Cube
      </RouterLink>

      <RouterLink
        class="border-b border-gray-200 flex items-center px-2 py-4 dark:border-gray-600"
        :to="{ name: 'dodecaminx' }">
        <Icon class="mr-1" name="chevron-right" />

        Dodecaminx
      </RouterLink>

      <div class="flex gap-4 justify-center pt-4">
        <a
          href="https://github.com/scottbedard/twister"
          target="_blank">
          <Icon name="github" size="4.5" />
        </a>

        <a
          href="#"
          :title="`Toggle ${isDark ? 'light' : 'dark'} mode`"
          @click.prevent="toggleDark">
          <Icon :name="isDark ? 'moon' : 'sun'" />
        </a>
      </div>
    </nav>

    <!-- desktop nav -->
    <nav class="gap-4 hidden items-center sm:flex">
      <RouterLink :to="{ name: 'cube' }">
        Cube
      </RouterLink>

      <RouterLink :to="{ name: 'dodecaminx' }">
        Dodecaminx
      </RouterLink>

      <a
        href="https://github.com/scottbedard/twister"
        target="_blank">
        <Icon name="github" size="4.5" />
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
import { defineComponent, ref, watch } from 'vue'
import { Icon } from '@/components'
import { isDark } from '@/store/state'
import { useRoute } from 'vue-router'
import { onClickOutside, useToggle } from '@vueuse/core'

export default defineComponent({
  setup() {
    const headerEl = ref(null)

    const isMobileNavExpanded = ref(false)

    const route = useRoute()

    const toggleDark = useToggle(isDark)

    const toggleMobileNav = useToggle(isMobileNavExpanded)

    const collapseMobileNav = () => {
      isMobileNavExpanded.value = false
    }

    onClickOutside(headerEl, collapseMobileNav)

    watch(route, collapseMobileNav)

    return {
      headerEl,
      isDark,
      isMobileNavExpanded,
      toggleDark,
      toggleMobileNav,
    }
  },
  components: {
    Icon
  },
})
</script>