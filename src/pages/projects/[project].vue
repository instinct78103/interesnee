<script setup>
import { ref } from 'vue';

import SideButton from '@/components/BaseSideButton.vue';
import ProjectDescription from '@/components/project/ProjectDescription.vue';
import ProjectHero from '@/components/project/ProjectHero.vue';

const activeTab = ref('issue');

function setActiveTab(value) {
  activeTab.value = value;
}



</script>

<template>

  <ProjectHero />
<!--  <ProjectDescription :active-tab="activeTab" @click="setActiveTab" />-->
<!--  <SideButton path-to="/projects" type="route">Назад к проектам</SideButton>-->
</template>

<style scoped>

</style>