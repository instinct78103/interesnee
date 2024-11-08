<script setup>
import { definePage } from 'unplugin-vue-router/runtime';
import { useRoute } from 'vue-router/auto';
import SideButton from '@/components/BaseSideButton.vue';

const route = useRoute();
const projectSlug = route.params;

const test = definePage({
  meta: {
    name: 'projects',
  },
});

</script>

<template>
  {{ projectSlug }}

  <SideButton
    path-to="/projects"
    type="route">
    Назад к проектам
  </SideButton>
</template>

<style scoped>

</style>