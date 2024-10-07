<template>
  <div :class="$style.root">
    <RotatedHeading>
      <h3>Наши работы</h3>
    </RotatedHeading>

    <div :class="$style.wrapper">
      <BaseSlider ref="slick" :is-manual-sliding="true" :options="sliderOpts">
        <div v-for="(project, key) in projectsSlides" :key :class="$style.projectSlideWrapper">
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
      </BaseSlider>
    </div>

  </div>
</template>
<script setup>
import RotatedHeading from '@/components/RotatedHeading.vue';
import BaseSlider from '@/components/BaseSlider.vue';
import AppImage from '@/components/AppImage.vue';
import { projectsSlides } from '@/data/projects.js';

const sliderOpts = {
  dots: false,
  arrows: true,
  autoplay: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: true,
  // dotsClass: this.$style.sliderDots,
  // prevArrow: `<button type="button" class="${this.$style.sliderArrow} ${this.$style.sliderArrowLeft}" tabindex="0"><i class="el-icon-arrow-left"></i></button>`,
  // nextArrow: `<button type="button" class="${this.$style.sliderArrow} ${this.$style.sliderArrowRight}" tabindex="0"><i class="el-icon-arrow-right"></i></button>`,
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

  @media(width < 768px) {
    margin-inline: -15px;
  }

  [class*='slick-slider'] {
    margin-right: -15%;

    @media(width < 768px) {
      margin-right: 0;
    }

    ul li button {
      width: 8px;
      height: 8px;
      padding: 0;
      border: 0;
      border-radius: 50%;
      outline: none;
      font-size: 0;
      background-color: var(--dots-color);
    }

    ul li[class*='slick-active'] button {
      background-color: var(--dots-active-color);
    }
  }
}

.projectSlideWrapper {
  padding: 0 clamp(13%, 3vw, 30%) 35px 35px;

  @media(width < 768px) {
    padding: 0;
  }
}

.projectSlide {
  position: relative;
}

.picture {
  box-shadow: -35px 35px 0 0 #f0f0f0;
  display: block;
  width: 100%;

  @media(width < 768px) {
    box-shadow: none;
  }
}

.desc {
  $shadow: rgba(0, 0, 0, 0.12);
  border-radius: 2px;
  text-align: center;
  padding: 0 10px;

  @media(width >= 768px) {
    width: 392px;
    padding: 64px 28px 58px;
    border: 1px solid #eee;
    box-shadow: 0 1px 15px 0 $shadow;
    background-color: #fff;
    transform: translateY(-50%);
    position: absolute;
    top: 50%;
    right: -20%;
  }

  @media(width < 1440px) {
    right: -3%;
  }

  @media(width < 1200px) {
    right: 10%;
  }

  @media(width < 768px) {
    margin-top: 40px;
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
