<template>
  <div class="relative">
    <select
      class="appearance-none bg-transparent block cursor-pointer text-xl text-gray-700 tracking-wide outline-none pr-12 w-full sm:w-auto hover:text-gray-600"
      @change="$emit('input', $event.target.value)"
      :value="value">
      <slot />
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: [Number, String],
  },
};
</script>

<style scoped>
div:after {
  border: 2px solid theme('colors.gray.700');
  border-top: 0;
  border-left: 0;
  content: '';
  display: block;
  height: 0.5rem;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
  width: 0.5rem;
}

div:hover:after {
  border-color: theme('colors.gray.600');
}
</style>
