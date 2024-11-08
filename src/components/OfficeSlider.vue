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
              v-for="(image, imgIndex) in value.images" :key="imgIndex"
              :class="[$style.carouselImg, {[$style.isActive]: imgIndex === sliders[index]?.currentIndex}]"
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
              <button :class="{ [$style.isActive]: innerIndexes[index]?.value === key }" @click="scrollToImage(index, key)"></button>
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
import { computed, onMounted, onUnmounted, ref } from 'vue';
import AppImage from '@/components/AppImage.vue';
import BaseSlider from '@/components/BaseSlider.vue';
import $style from './OfficeSlider.module.scss';
import { useSlider2 } from '@/composables/useSlider2.js';

const imagesSliderRefs = ref([]);
const sliders = ref([]);

const scrollToImage = (idx, buttonClickedIndex) => {
  const slider = sliders.value[idx];
  if (slider) {
    slider.scrollToSlide(buttonClickedIndex);
    slider.currentIndex = buttonClickedIndex;
  }
};

const props = defineProps({
  office: {
    type: Array,
  },
  currentSlider: {
    type: Number,
    default: 0,
  },
});

const office = computed(() => props.office);

const innerIndexes = ref([]);
let innerObservers = [];

const observeInnerSliders = () => {
  imagesSliderRefs.value.forEach((innerSlider, i) => {

    if (!innerSlider) return;

    const currentInnerIndex = ref(0);
    innerIndexes.value[i] = currentInnerIndex;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {

          if (entry.isIntersecting) {
            currentInnerIndex.value = [...innerSlider.children].indexOf(entry.target);
          }
        });
      }, { threshold: 0.6 },
    );

    [...innerSlider.children].forEach(slide => observer.observe(slide));
    innerObservers.push(observer);

  });
};

// Set up slider functionality for each office
onMounted(() => {
  office.value.forEach((_, index) => {
    const slider = useSlider2(imagesSliderRefs.value[index], {autoplay: true, autoplaySpeed: 3000 });
    sliders.value[index] = slider;
  });

  observeInnerSliders();

});
onUnmounted(() => innerObservers.forEach(observer => observer.disconnect()));

const sliderOpts = {
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
</script>

<style lang="scss" module></style>
