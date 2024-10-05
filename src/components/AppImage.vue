<template>
  <v-lazy-image
    v-if="lazy"
    :src="x1"
    :alt
    :srcset="`${x1Image}, ${x2Image}`"
    :src-placeholder="placeholder || ''"
    :class="[$style.image, 'wqqwqwqw']"
    use-picture
  />
  <picture
    v-else
    :class="$style.host">
    <source :srcset="webp" :class="$style.image" type="image/webp">
    <img :srcset="`${x1Image}, ${x2Image}`" :alt :class="$style.image" decoding="async">
  </picture>
</template>

<script setup>

import VLazyImage from 'v-lazy-image';
import { computed } from 'vue';

const props = defineProps({
  x1: { type: String, default: '' },
  x2: { type: String, default: '' },
  webp: { type: String, default: '' },
  alt: { type: String, default: '' },
  lazy: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
});

const x1Image = computed(() => props.x1 ? `${props.x1} 1x` : '');
const x2Image = computed(() => props.x2 ? `${props.x2} 2x` : '');

</script>

<style module>
.image,
.image img {
  width: 100%;
  object-fit: cover;
}
</style>
