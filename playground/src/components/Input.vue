<template>
  <input
    class="appearance-none block border bg-gray-50 border-gray-200 min-h-12 placeholder-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
    ref="input"
    :placeholder="placeholder"
    :value="modelValue"
    @input="onInput" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup(props, { emit }) {
    const input = ref<HTMLInputElement>()

    const onInput = () => {
      emit('update:modelValue', input.value?.value)
    }
    
    onMounted(() => {
      if (props.autofocus) {
        input.value?.focus()
      }
    })

    return {
      input,
      onInput,
    }
  },
  emits: [
    'update:modelValue',
  ],
  props: {
    autofocus: {
      default: false,
      type: Boolean,
    },
    modelValue: {
      default: '',
      type: [Number, String],
    },
    placeholder: {
      type: String,
    },
  },
})
</script>