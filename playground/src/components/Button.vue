<template>
  <button
    class="appearance-none bg-gray-800 h-12 px-4 rounded w-full sm:w-auto hover:bg-gray-700"
    :class="{
      'pointer-events-none': disabled,
    }"
    :disabled="disabled"
    @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
  },
};
</script>
