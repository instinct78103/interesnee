<template>
  <div ref="slider" :class="$style.slider" :style="customStyles" @mouseenter="stopAutoScroll" @mouseleave="resumeAutoScroll">
    <button @click="scrollLeft" v-if="options?.arrows" class="leftArrow" :class="[$style.arrow, $style.leftArrow]">
      <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <slot />
    <button @click="autoScroll" v-if="options?.arrows" class="rightArrow" :class="[$style.arrow, $style.rightArrow]">
      <svg width="18" height="18" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 8 L12 18 L22 28" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

defineProps({
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
let intervalId = null;

const scrollLeft = () => {
  if (slider.value) {
    slider.value.scrollBy({
      left: -slider.value.clientWidth,
      behavior: 'smooth',
    });
  }
};

const scrollRight = () => {
  if (slider.value) {
    slider.value.scrollBy({
      left: slider.value.clientWidth,
      behavior: 'smooth',
    });
  }
};

const autoScroll = () => {
  if (slider.value) {
    const currentScroll = slider.value.scrollLeft;
    const slideWidth = slider.value.clientWidth;

    // If the end of the scroll container is reached, reset to 0
    if (currentScroll >= slider.value.scrollWidth - slideWidth) {
      slider.value.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      scrollRight(); // Scroll to the next slide
    }
  }
};

// Set up interval for auto-scrolling
const startAutoScroll = () => {
  intervalId = setInterval(autoScroll, 3000); // Change slide every 3 seconds
};

// Clear interval on component unmount
onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

// Start auto-scrolling on component mount
onMounted(() => {
  startAutoScroll();
});

const stopAutoScroll = () => {
  clearInterval(intervalId);
};

const resumeAutoScroll = () => {
  startAutoScroll();
};

</script>
<style lang="scss" module>

.slider {
  &::-webkit-scrollbar {
    display: none;
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

</style>