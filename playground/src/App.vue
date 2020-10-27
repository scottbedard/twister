<template>
  <div class="p-8">
    <div class="font-bold gap-6 grid leading-none mb-12 text-2xl md:text-4xl md:grid-cols-2">
      <a class="hover:underline hover:text-white" href="https://github.com/scottbedard/twister">
        Twister
      </a>
      <div class="flex items-center md:justify-end">
        <Select v-model="route">
          <option>cube</option>
          <option>dodecaminx</option>
        </Select>
      </div>
    </div>

    <router-view />
  </div>
</template>

<script>
import Select from '@/components/Select.vue';

export default {
  components: {
    Select,
  },
  computed: {
    route: {
      get() {
        return this.$route.name;
      },
      set(name) {
        if (name !== this.$route.name) {
          this.$router.push({ name });
        }
      },
    },
  },
};
</script>
