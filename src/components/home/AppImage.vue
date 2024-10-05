<script setup>
import VLazyImage from "v-lazy-image";

const props = defineProps({

})
</script>

<template>
  <v-lazy-image
    v-if="lazy"
    :src="x1"
    :alt
    :srcset="`${x1Image}, ${x2Image}`"
    :src-placeholder="placeholder || ''"
    :class="$style.image"
    use-picture>
    <source
      :srcset="webp"
      type="image/webp"
    >
  </v-lazy-image>

  <picture
    v-else
    :class="$style.host">
    <source
      :srcset="webp"
      :alt="alt"
      :class="$style.image"
      type="image/webp"
    >
    <img
      :srcset="`${x1Image}, ${x2Image}`"
      :alt="alt"
      :class="$style.image"
      decoding="async"
    >
  </picture>
</template>

<style scoped>

</style>