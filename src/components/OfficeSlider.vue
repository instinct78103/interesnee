<template>
  <div :class="$style.root">
    <BaseSlider
      :options="sliderOpts"
      :goSlide="currentSlider"
    >
      <template #slider>
        <div :class="$style.office" v-for="(value, index) in office" :key="index" class="office">
          <div :class="$style.officePhotos" :ref="el => imagesSliderRefs[index] = el">
            <app-image
              v-for="(image, imgIndex) in value.images" :key="imgIndex"
              :class="[$style.carouselImg, {[$style.isActive]: imgIndex === sliders[index]?.currentIndex}]"
              :x1="image.webp"
              :webp="image.webp"
              :alt="value.city"
              lazy
              :width="200"
              :height="180"
              @click="openPopup(value, imgIndex)"
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

    <Dialog ref="dialog">
      <template #arrowLeft>
        <button class="leftArrow _arrow_13bbr_5 _leftArrow_13bbr_20"><svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      </template>
      <template #body>
        <div v-for="(image, index) in officeSelected?.images" :key="image" :ref="el => dialogImagesRef[index] = el">
          <app-image
            :x1="image.webp"
            :webp="image.webp"
            alt="Office photo"
            lazy
            :width="480"
            :height="320"
          />
        </div>
      </template>
      <template #arrowRight>
        <button @click="goNext()" class="rightArrow _arrow_13bbr_5 _rightArrow_13bbr_24"><svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg></button>
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import AppImage from '@/components/AppImage.vue';
import BaseSlider from '@/components/BaseSlider.vue';
import Dialog from '@/components/Dialog.vue';
import $style from './OfficeSlider.module.scss';
import { useSlider } from '@/composables/useSlider.js';

const dialog = ref(null);
const showModal = () => dialog?.value?.showModal();
const dialogImagesRef = ref([])

const imagesSliderRefs = ref([]);
const sliders = ref([]);
const officeSelected = ref(null);

const openPopup = (value, imgIndex) => {
  officeSelected.value = value;
  showModal()
  nextTick(() => dialogImagesRef.value[imgIndex].scrollIntoView({
    behavior: 'smooth',
    inline: 'start',
    block: 'nearest',
  }))
};

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
    const slider = useSlider(imagesSliderRefs.value[index], { autoplay: true, autoplaySpeed: 3000 });
    sliders.value[index] = slider;
  });

  observeInnerSliders();

});
onUnmounted(() => innerObservers.forEach(observer => observer.disconnect()));

const sliderOpts = {
  dotsClass: $style.sliderDots,
  autoplay: false,
};
</script>

<style lang="scss" module></style>
