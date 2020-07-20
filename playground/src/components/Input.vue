<template>
  <input
    class="appearance-none border border-transparent bg-gray-700 h-12 px-4 rounded w-full hover:border-gray-600"
    :value="value"
    @input="$emit('input', $event.target.value)" />
</template>

<script>
export default {
  props: {
    value: [Number, String],
  },
};
</script>
