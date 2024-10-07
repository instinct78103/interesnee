<script setup>
import SideButton from '@/components/BaseSideButton.vue';
import HomeHero from '@/components/home/HomeHero.vue';
import HomeTechnologies from '@/components/home/HomeTechnologies.vue';
import HomeNumbers from '@/components/home/HomeNumbers.vue';
import HomeJoin from '@/components/home/HomeJoin.vue';
import HomeCases from '@/components/home/HomeCases.vue';
</script>

<template>
  <SideButton path-to="/join">Есть работа!</SideButton>
  <HomeHero />
  <HomeTechnologies />
  <HomeNumbers />
  <HomeJoin />
  <HomeCases />
</template>

<style scoped>

</style>