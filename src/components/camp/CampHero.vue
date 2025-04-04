<template>
  <section :class="$style.hero">
    <div :class="$style.container">
      <app-image
        :class="$style.image"
        x1="/images/camp/summer-camp-2025-closed.webp"
        x2="/images/camp/summer-camp-2025-closed.webp"
        alt="Summer Camp 2025 Closed"
        webp="/images/camp/summer-camp-2025-closed.webp"
      />
    </div>
  </section>
</template>

<script setup>
import AppImage from '@/components/AppImage.vue';
</script>

<style lang="scss" module>
@use '@/scss/helpers';

$hero-color-left: #ef423c;
$hero-color-right: #f16c43;

.container {
  @extend %container;
  padding-right: 0;
  padding-left: 0;
}

.hero {
  position: relative;
  background: linear-gradient(90deg, #ee403d, #f27043);
}

.image img {
  display: block;
  width: 100%;
}
</style>
