<template>
  <a
    class="bg-gray-800 px-2 py-1 rounded whitespace-pre hover:bg-gray-700 hover:text-white"
    :href="href"
    @click.prevent="$emit('click', $event)">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      default: '#',
      type: String,
    },
  },
};
</script>
