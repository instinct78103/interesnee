<script setup>
import { definePage } from 'unplugin-vue-router/runtime';
import {useRoute} from 'vue-router/auto';
const route = useRoute()
const projectSlug = route.params.slug

const test = definePage({
  meta: {
    name: 'projects',
  },
});

</script>

<template>
  {{test.meta}} {{projectSlug}}
</template>

<style scoped>

</style>