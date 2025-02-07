<script setup>
import {useRoute} from 'vue-router/auto';
import Hero from '@/components/Hero.vue';

const route = useRoute()
</script>

<template>

  <Hero>
    <strong>Работать с нами</strong> <em>Очень Интересно</em>
  </Hero>

  {{route.params}}
</template>

<style scoped>

</style>