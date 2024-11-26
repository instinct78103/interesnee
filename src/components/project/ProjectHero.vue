<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <Breadcrumbs :links />
    </div>

    <div :class="$style.imageContainer">
      <app-image
        v-if="project.mainImage"
        :class="$style.img"
        :src="project.mainImage.x1"
        :x1="project.mainImage.x1"
        :x2="project.mainImage.x2"
        :alt="project.name"
        :src-placeholder="project.mainImage.placeholder"
        :key="`${project.name}-head-image`"
      />
    </div>
  </div>
</template>
<script setup>
import AppImage from '@/components/AppImage.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';

import { useProjectsStore } from '@/store/useProjects.js';
import { storeToRefs } from 'pinia';

const { currentProject: project } = storeToRefs(useProjectsStore());

const links = [
  {
    name: 'Проекты',
    path: '/projects',
  },
  {
    name: project.value.name,
  },
];
</script>

<style lang="scss" module scoped>
@import '@/scss/helpers';

.root {
  background-size: cover;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  min-height: clamp(235px, 5vw, 400px);
}

.imageContainer {
  width: 100%;
}

.imageContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 300px;
}
</style>
