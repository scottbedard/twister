<template>
  <button
    class="appearance-none bg-gray-800 h-12 px-4 rounded w-full sm:w-auto hover:bg-gray-700"
    @click="$emit('click', $event)">
    <slot />
  </button>
</template>
