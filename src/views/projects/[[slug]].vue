<script setup>
import { definePage } from 'unplugin-vue-router/runtime';

const test = definePage({
  meta: {
    name: 'projects',
  },
});

</script>

<template>
  {{test.meta}}
</template>

<style scoped>

</style>