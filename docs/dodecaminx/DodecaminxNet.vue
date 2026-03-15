<template>
  <div>
    <pre class="text-xs">{{ dodecaminx }}</pre>
  </div>
</template>

<script lang="ts" setup>
import type { Dodecaminx } from '@/index'

defineProps<{
  dodecaminx: Dodecaminx
}>()
</script>
