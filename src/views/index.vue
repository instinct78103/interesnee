<script setup>
import SideButton from '@/components/BaseSideButton.vue';
import HomeHero from '@/components/home/HomeHero.vue';
import HomeTechnologies from '@/components/home/HomeTechnologies.vue';
import HomeNumbers from '@/components/home/HomeNumbers.vue';
import HomeJoin from '@/components/home/HomeJoin.vue';
</script>

<template>
  <SideButton path-to="/join">Есть работа!</SideButton>
  <HomeHero />
  <HomeTechnologies />
  <HomeNumbers />
  <HomeJoin />
</template>

<style scoped>

</style>