<template>
  <div :class="$style.root">
    <RotatedHeading>
      <h3>Наши работы</h3>
    </RotatedHeading>
    <div :class="$style.wrapper">
      <BaseSlider :options="sliderOpts" custom-styles="scroll-snap-type: x mandatory;display:flex;flex-wrap:nowrap;overflow-x:auto;scroll-behavior:smooth">
        <template #slider="{ sliderRef, activeClass, activeSlide }">
          <div v-for="(project, key) in projectsSlides" :key :class="[$style.projectSlideWrapper, {[activeClass]: key === activeSlide}]">
            <div :class="$style.projectSlide">
              <app-image
                :class="$style.picture"
                :x1="project.thumbnail.x1"
                :x2="project.thumbnail.x2"
                :webp="project.thumbnail.webp"
                :alt="project.name"
              />
              <div :class="$style.desc">
                <p :class="$style.title">{{ project.name }}</p>
                <p :class="$style.text">{{ project.shortDescription }}</p>
                <router-link :class="$style.button" :to="`/projects/${project.slug}`">Подробнее</router-link>
              </div>
            </div>
          </div>
        </template>
      </BaseSlider>
    </div>
  </div>
</template>
<script setup>
import RotatedHeading from '@/components/RotatedHeading.vue';
import BaseSlider from '@/components/BaseSlider.vue';
import AppImage from '@/components/AppImage.vue';
import { projectsSlides } from '@/data/projects.js';
import { ref } from 'vue';
import { useSlider } from '@/composables/useSlider.js';

const sliderRef = ref(null);

useSlider(sliderRef, { autoplay: true, autoplaySpeed: 3000 });

const sliderOpts = {
  dots: false,
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        dots: true,
        draggable: true,
      },
    },
  ],
};
</script>

<style lang="scss" module>
@import '@/scss/helpers';

.root {
  @extend %container;
  @extend %section;

  @media(width < 768px) {
    padding-top: 0;
  }
}

.wrapper {
  @extend %content;

  position: relative;
  scroll-snap-type: x mandatory;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  scroll-behavior: smooth;

  @media(width < 768px) {
    margin-inline: -15px;
  }
}


.projectSlideWrapper {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  padding-block: 0 35px;
  padding-inline: 35px;
  min-width: 100%;

  @media(width < 768px) {
    padding: 0;
  }
}

.projectSlide {
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: 1fr;
  align-items: center;

  @media(width < 768px) {
    grid-template-rows: 1fr fit-content(100%);
  }
}

.picture {
  box-shadow: -35px 35px 0 0 var(--gray);
  display: block;
  width: 100%;
  grid-row: 1 / 1;
  grid-column: 1 / span 10;

  @media(width < 768px) {
    grid-column: 1 / -1;
    box-shadow: none;
  }
}

.desc {
  border-radius: 2px;
  text-align: center;
  padding: 0 10px;
  grid-row: 1 / 1;
  grid-column: 7 / span 6;
  height: fit-content;

  @media(width >= 768px) {
    padding: 64px 28px 58px;
    border: 1px solid #eee;
    box-shadow: 0 1px 15px 0 rgba(0, 0, 0, 0.12);
    background-color: #fff;
  }

  @media(width < 768px) {
    margin-top: 40px;
    grid-row: 2;
    grid-column: 1 / -1;
  }
}

.title {
  @extend %heading;

  @media(width < 768px) {
    margin-bottom: 20px;
  }
}

.text {
  margin: 0 0 39px;
  padding: 0;
  font-size: 16px;
  line-height: 1.56;
  color: var(--gray-dark);
  text-wrap: balance;
}

.button {
  @extend %button;
}

.sliderDots {
  //@extend %slickDots;
  position: static;
  margin: 10px auto 0;
  transform: none;
}

.sliderArrow {
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  height: 36px;
  width: 36px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 50%;
  background-color: var(--gray-transparent);
  color: #fff;
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  text-align: center;
  font-size: 12px;
}

.sliderArrowLeft {
  left: 0;

  @media(width <= 480px) {
    left: 20px;
  }
}

.sliderArrowRight {
  right: 15%;

  @media(width < 1440px) {
    right: 12%;
  }

  @media(width < 1200px) {
    right: 13%;
  }

  @media(width < 768px) {
    right: 0;
  }

  @media(width <= 480px) {
    right: 20px;
  }
}
</style>
