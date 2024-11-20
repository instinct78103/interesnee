<template>
  <div :class="$style.root">
    <div :class="$style.container">
      <Breadcrumbs :links />
    </div>

    <div :class="$style.imageContainer">
      <app-image
        v-if="project.current.mainImage"
        :class="$style.img"
        :src="project.current.mainImage.x1"
        :x1="project.current.mainImage.x1"
        :x2="project.current.mainImage.x2"
        :alt="project.current.name"
        :src-placeholder="project.current.mainImage.placeholder"
        :key="`${project.current.name}-head-image`"
      />
    </div>
  </div>
</template>
<script setup>
// import { mapGetters } from 'vuex';
// import { GET_PROJECT } from 'store/getters';
import AppImage from '@/components/AppImage.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { useRoute } from 'vue-router/auto';
import { ref } from 'vue';
import { projects } from '@/data/projects.js';

const route = useRoute();
const projectSlug = route.params;
const project = ref({});

console.log(projects, projectSlug);

//temp below
project.value.current = projects.find(project => project.slug === projectSlug.project);

console.log(project.value)

const links = [
  {
    name: 'Проекты',
    path: '/projects',
  },
  {
    name: project.value.current.name,
  },
];

// export default {
//   name: 'Hero',
//   components: { AppImage, Breadcrumbs },
//   computed: {
//     ...mapGetters({
//       project: GET_PROJECT,
//     }),
//     links() {
//       return [
//         {
//           name: 'Проекты',
//           path: '/projects',
//         },
//         {
//           name: this.project.current.name,
//         },
//       ];
//     },
//   },
// };
</script>

<style lang="scss" module scoped>
//@import '../styles/variables';
//@import '../styles/mixins';
@import '@/scss/helpers';

.root {
  min-height: 568px;
  background-size: cover;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;

  @media(width < 1024px) {
    min-height: 400px;
  }

  @media(width < 768px) {
    min-height: 300px;
  }

  @media(width <= 480px) {
    min-height: 235px;
  }
}

.imageContainer {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}

.imageContainer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
