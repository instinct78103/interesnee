<template>
  <article>
    <div :class="$style.root">
      <div :class="$style.wrapper">
        <h2 :class="$style.heading">
          {{ project.current.name }}
        </h2>

        <div :class="$style.progress">
          <div :class="$style.line">
            <div
              v-for="(stage, index) in stages"
              :class="[$style.point, {[$style.red]: stage.value !== activeTab}, {[$style.blue]: stage.value === activeTab} ]"
              :key="index"
            >
              <div :class="$style.mark">
                <svg :class="$style.icon">
                  <use :href="`${spriteSvg}#icon-tick`"></use>
                </svg>
              </div>
              <div :class="$style.btn">
                <button
                  :aria-label="stage.name"
                  :class="$style.button"
                  @click="setActiveTab(stage.value)"
                >{{ stage.name }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="project.current.description">
          <p
            v-if="activeTab === 'issue'"
            :class="$style.description"
            v-html="project.current.description.issue" />
          <p
            v-if="activeTab === 'process'"
            :class="$style.description"
            v-html="project.current.description.process" />
          <p
            v-if="activeTab === 'result'"
            :class="$style.description"
            v-html="project.current.description.result"
          />
        </div>
      </div>
    </div>

    <div :class="$style.galleryWrapper">
<!--      <ProjectSlider :slider-content="project.current.images" />-->

      <BaseSlider custom-styles="scroll-snap-type: x mandatory;display:flex;flex-wrap:nowrap;overflow-x:auto;scroll-behavior:smooth">
        <template #slider="{sliderRef, activeClass, activeSlide}">
            <app-image
              v-for="(slide, key) in project.current.images" :key
              :class="$style.picture"
              :x1="slide.x1"
              :x2="slide.x2"
              :webp="slide.webp"
              :alt="project.name"
            />
        </template>
      </BaseSlider>

      <template v-if="project.current.videos">
        <video
          v-for="(video, vIndex) in project.current.videos"
          :key="vIndex"
          :class="$style.video"
          :poster="video.poster"
          controls="controls"
        >
          <source
            v-for="(source, sIndex) in video.sources"
            :key="sIndex"
            :src="source.src"
            :type="source.type">
          Your browser does not support the video tag.
        </video>
      </template>
    </div>
  </article>
</template>
<script setup>
import { spriteSvg } from '@/helpers.js';

// import ProjectSlider from '@/components/project/ProjectSlider.vue';
import BaseSlider from '@/components/BaseSlider.vue';
import { ref, watch } from 'vue';
import { useSlider2 } from '@/composables/useSlider2.js';
import AppImage from '@/components/AppImage.vue';

const sliderRef = ref(null)
const activeTab = ref('issue');

const stages = [
  {
    name: 'Задача',
    value: 'issue',
  },
  {
    name: 'Процесс',
    value: 'process',
  },
  {
    name: 'Результат',
    value: 'result',
  },
];

const { currentIndex } = useSlider2(sliderRef, { autoplay: true, autoplaySpeed: 3000 });

watch(currentIndex, newValue => sliderRef.value.children[newValue].scrollIntoView({
  behavior: 'smooth',
  inline: 'start',
  block: 'nearest',
}));

// import { mapGetters } from 'vuex';
// import { GET_PROJECT } from 'store/getters';
// export default {
//   name: 'ProjectDescription',
//   components: {
//     SvgIcon,
//     ProjectSlider,
//   },
//   props: {
//     activeTab: {
//       type: String,
//       default: 'issue',
//     },
//   },
//   data() {
//     return {
//       stages: [
//         {
//           name: 'Задача',
//           value: 'issue',
//         },
//         {
//           name: 'Процесс',
//           value: 'process',
//         },
//         {
//           name: 'Результат',
//           value: 'result',
//         },
//       ],
//     };
//   },
//   computed: {
//     ...mapGetters({
//       project: GET_PROJECT,
//     }),
//   },
//   methods: {
//     setActiveTab(tab) {
//       this.$emit('click', tab);
//     },
//   },
// };
</script>

<style lang="scss" module>
//@import '@/scss/variables';
//@import '../styles/mixins';
@import '@/scss/helpers';

%descriptionContainer {
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.root {
  @extend %container;
  @extend %section;

  &::after {
    display: none;
  }
}

.wrapper {
  @extend %content;
}

.galleryWrapper {
  @extend %content;
  max-width: 1280px;
}

.heading {
  @extend %heading;
  text-align: center;
}

.imgWrapper {
  margin: 17px 0;
}

.img {
  width: 100%;
  min-height: 235px;
  object-fit: cover;
}

.progress {
  @extend %descriptionContainer;
  padding: 40px 70px 65px;
  margin-bottom: 55px;

  @media(width < 768px) {
    margin-bottom: 0;
    padding: 40px 54px 65px;
  }
}

.line {
  width: 100%;
  height: 2px;
  background-color: var(--gray-7);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.point {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  z-index: 1;
}

.point.red {
  background-color: var(--red-light);
}

.point.blue {
  background-color: var(--blue);
}

%position {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
}

.mark {
  @extend %position;
  bottom: 20px;
}

.icon {
  min-width: 36px;
  height: 36px;
  transition: fill 0.4s;
}

.point.red .icon {
  fill: var(--red-light);
}

.point.blue .icon {
  fill: var(--blue);
}

.btn {
  @extend %position;
  top: 20px;
}

.button {
  @extend %button;
  min-width: 140px;

  @media(width < 768px) {
    padding: 5px;
    min-width: 82px;
  }
}

.point.red .button {
  @extend %buttonWhite;

  color: var(--red-light);
  border: 2px solid var(--red-light);
  text-align: center;
  border-radius: 70px;
}

.point.blue .button {
  color: #fff;
  background-color: var(--blue);
  border: 2px solid var(--blue);
  text-align: center;
  border-radius: 70px;
}

.description {
  @extend %descriptionContainer;
  opacity: 0.8;
  color: var(--gray-dark);
  font-size: 16px;
  line-height: 25px;
  text-wrap: pretty;

  @media(width < 768px) {
    padding: 0 20px;
  }
}

.description a {
  color: var(--red);
  text-decoration: none;
  transition: all 0.3s;
  border-bottom: 1px solid transparent;

  &:hover {
    border-color: var(--red);
  }
}

// Projects video
.video {
  width: 100%;
  max-height: 80vh;
}
</style>
