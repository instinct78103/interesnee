<script setup>

import { SITE_NAME } from '@/helpers.js'

definePage({
  meta: {
    title: `${SITE_NAME} - Наши проекты`,
  },
})

import ProjectHero from '@/components/project/ProjectHero.vue';
import ProjectDescription from '@/components/project/ProjectDescription.vue';
import SideButton from '@/components/BaseSideButton.vue';
</script>

<template>
  <ProjectHero />
  <ProjectDescription />
  <SideButton path-to="/projects" type="route">Назад к проектам</SideButton>
</template>

<style scoped>

</style>