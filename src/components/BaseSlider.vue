<template>
  <button @click="scrollPrev" v-if="options?.arrows" class="leftArrow" :class="[$style.arrow, $style.leftArrow]">
    <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
  <div ref="slider" :class="[$style.slider, {[$style.fade]: options?.fade}]" :style="customStyles" @mouseenter="stopAutoScroll" @mouseleave="resumeAutoScroll">
    <slot :activeSlide="slideIndex" :activeClass="$style.active" />
  </div>
  <button @click="scrollNext" v-if="options?.arrows" class="rightArrow" :class="[$style.arrow, $style.rightArrow]">
    <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>

</template>

<script setup>
import { ref, onMounted, computed, watch, inject, onUnmounted } from 'vue';
import { useSlider } from '@/composables/useSlider.js';

const props = defineProps({
  options: {
    type: Object,
    default: () => ({}),
  },
  isManualInit: {
    type: Boolean,
    default: false,
  },
  isDestroyed: {
    type: Boolean,
    default: false,
  },
  isManualSliding: {
    type: Boolean,
    default: false,
  },
  goSlide: {
    type: Number,
    default: 0,
  },
  customStyles: {
    type: String,
    default: '',
  },
});

const slider = ref(null);
const { slideIndex } = useSlider(slider, props);

const refSlideIndex = ref(slideIndex);

const numberOfSlides = computed(() => slider.value?.children.length || 0);

const activeIndex = inject('activeIndex', 0);
const updateActiveIndex = inject('updateActiveIndex', null);

function scrollPrev() {
  slideIndex.value--;
  if (slideIndex.value < 0) {
    slideIndex.value++;
  }
}

function scrollNext() {
  slideIndex.value++;
  if (slideIndex.value > numberOfSlides.value - 1) {
    slideIndex.value = 0;
  }
}

if (updateActiveIndex) {
  watch(refSlideIndex, (newValue) => {
    updateActiveIndex(newValue);
  });
}

watch(() => props.goSlide, (newValue) => {
  refSlideIndex.value = newValue;
});

let intervalId = null;

// Set up interval for auto-scrolling
const startAutoScroll = () => {
  if (props?.options?.autoplay && props?.options?.autoplaySpeed) {
    intervalId = setInterval(scrollNext, props?.options?.autoplaySpeed);
  }
};

const stopAutoScroll = () => {
  if (intervalId) {
    clearInterval(intervalId);
  }
};

onMounted(() => {
  startAutoScroll();
});

onUnmounted(() => {
  stopAutoScroll();
});

const resumeAutoScroll = () => {
  if (props?.options?.autoplay) {
    startAutoScroll();
  }
};

</script>
<style lang="scss" module>

.slider {
  &::-webkit-scrollbar {
    //display: none;
  }
}

.arrow {
  position: absolute;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  top: 50%;
  background: rgba(31, 45, 61, .5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  border-radius: 50%;
}

.leftArrow {
  left: 0;
}

.rightArrow {
  transform: rotate(0.5turn);
  right: 0;
}

.fade {
  display: grid;

  > div {
    grid-area: 1 / 1;
    opacity: 0;
    transition: opacity 0.5s;
    pointer-events: none;
    will-change: opacity;

    &.active {
      pointer-events: all;
      opacity: 1;
    }
  }
}

</style>