<template>
  <section>
    <Hero>
      <strong>Вдохновленные вызовом</strong>,
      <br>создаем <em>удивительные</em> <em>продукты!</em>
    </Hero>
    <ProjectsCustomers />
    <ProjectsList />
  </section>
</template>

<script setup>
import Hero from '@/components/Hero.vue';
import ProjectsCustomers from '@/components/projects/ProjectsCustomers.vue';
import ProjectsList from '@/components/projects/ProjectsList.vue';
</script>