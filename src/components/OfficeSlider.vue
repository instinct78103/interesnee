<template>
  <div :class="$style.root">
    <BaseSlider
      :is-manual-sliding="true"
      :options="sliderOpts"
      :go-slide="currentSlider"
    >
      <template #slider>
        <div :class="$style.office" v-for="(value, index) in office" :key="index">
          <div :class="$style.officePhotos" @click="openCarousel(value)" :ref="el => imagesSliderRefs[index] = el">
            <app-image
              v-for="(image, index) in value.images" :key="index"
              :class="$style.carouselImg"
              :x1="image.webp"
              :webp="image.webp"
              :alt="value.city"
              lazy
              :width="200"
              :height="180"
            />
          </div>

          <ul :class="$style.indicatorsList" v-if="value.images.length > 1">
            <li v-for="(_, key) in value.images" :key>
              <button @click="scrollToImage(index, key)"></button>
            </li>
          </ul>
          <div :class="$style.textWrap">
            <template v-if="value.link">
              <router-link :to="`${value.link}`">
                <p :class="$style.title">{{ value.city }}</p>
              </router-link>
            </template>
            <template v-else>
              <p :class="$style.title">{{ value.city }}</p>
            </template>
            <p :class="$style.address">
              {{ value.address }} <br>
              {{ value.tel }}
            </p>
          </div>
        </div>
      </template>
    </BaseSlider>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppImage from '@/components/AppImage.vue';
import BaseSlider from '@/components/BaseSlider.vue';
import $style from './OfficeSlider.module.scss';

const imagesSliderRefs = ref([]);
const scrollToImage = (idx, buttonClickedIndex) => imagesSliderRefs.value[idx]
  .children[buttonClickedIndex]
  .scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  });

const sliderOpts = {
  dots: false,
  arrows: false,
  dotsClass: $style.sliderDots,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: false,
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

defineProps({
  office: {
    type: Array,
  },
  currentSlider: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" module></style>
