<script setup>

import { SITE_NAME } from '@/helpers.js';
import { useRoute } from 'vue-router/auto';

definePage({
  meta: {
    title: `${SITE_NAME} - Наши проекты`,
  },
});

import ProjectHero from '@/components/project/ProjectHero.vue';
import ProjectDescription from '@/components/project/ProjectDescription.vue';
import SideButton from '@/components/BaseSideButton.vue';
import { projects } from '@/data/projects.js';
import { computed } from 'vue';

const currentIndexBySlug = computed(() => projects.findIndex(project => project.slug === useRoute().params.project));
const prevProject = computed(() => projects[currentIndexBySlug.value - 1] || null);
const nextProject = computed(() => projects[currentIndexBySlug.value + 1] || null);

</script>

<template>
  <ProjectHero />
  <ProjectDescription />
  <div :class="$style.projectsNav">
    <router-link v-if="prevProject" :to="`/projects/${prevProject.slug}`">Предыдущий проект</router-link>
    <router-link v-if="nextProject" :to="`/projects/${nextProject.slug}`">Следующий проект</router-link>
  </div>
  <SideButton path-to="/projects" type="route">Назад к проектам</SideButton>
</template>

<style lang="scss" module>
.projectsNav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 20px 10px 40px;

  a {
    font-size: 14px;
    line-height: 1.25rem;
    background: #fff;
    border-radius: 24px;
    border: 1px solid #e7e5e4ff;
    padding: 8px 16px;
    text-decoration: none;
    color: var(--color-black, #000);
    text-align: center;

    &:hover {
      cursor: pointer;
      filter: brightness(95%);
    }
  }
}
</style>