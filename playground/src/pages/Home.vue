<template>
  <h1 class="font-bold mb-2 text-center text-4xl">Twister</h1>

  <p class="mb-12 text-center">An open source library for modeling the state of twisty puzzles.</p>

  <div class="gap-4 flex flex-col max-w-2xl mx-auto">
    <div class="font-bold">
      Getting Started:
    </div>

    <div>
      The recommended way to install Twister is via NPM.
    </div>

    <Code>
      npm install @bedard/twister
    </Code>

    <div>
      Alternatively, you may use the CDN. This method exposes the library globally as Twister.
    </div>

    <Code>
      &lt;script src=&quot;https://unpkg.com/@bedard/twister&quot;&gt;&lt;/script&gt;
    </Code>

    <div>
      Once the library is installed, instantiate a model and start twisting!
    </div>

    <Code>
      import { Cube } from '@bedard/twister'<br />
      <br />
      const model = new Cube({ size: 3 })<br />
      <br />
      model.turn('R U- R-')
    </Code>

    <div>
      For further usage instructions, <a class="underline" href="https://github.com/scottbedard/twister#readme" target="_blank">please refer to the full documentation</a>.
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Code } from '@/components'

export default defineComponent({
  components: {
    Code,
  },
})
</script>