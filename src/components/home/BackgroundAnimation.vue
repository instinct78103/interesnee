<template>
  <section :class="$style.root" ref="root">
    <slot />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Velocity from 'velocity-animate';
import $style from '@/components/home/BackgroundAnimation.module.scss';

const breakpoints = {
  desktop: 1024,
  tablet: 768,
  phone: 480,
};

const root = ref(null);
const container = ref(null);
let dots = ref([]);
let dotsCount = ref(0);
let containerWidth = ref(0);
let containerHeight = ref(0);
let visibilitySection = null;

const dotsColor = '#f75050';
const translateZMin = -725;
const translateZMax = 600;
const containerAnimationMap = {
  perspective: [50, 215],
};
const isVisible = ref(false);

const observeSection = () => {
  visibilitySection = new IntersectionObserver(entries => {
    entries.forEach(entry => {

      isVisible.value = entry.isIntersecting;

      if (isVisible.value) {
        initialize();
      } else {
        if (container.value) {
          destroy();
        }
      }
    });
  }, { threshold: 0.1 });

  visibilitySection.observe(root.value);
};

const randomNumb = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const createDots = () => {
  const width = window.innerWidth;
  dotsCount.value = width > breakpoints.desktop ? 120 : width > breakpoints.phone ? 80 : 40;

  dots.value = Array.from({ length: dotsCount.value }).map(() => {
    const dot = document.createElement('div');
    dot.className = $style.dot;
    dot.style.backgroundColor = dotsColor;
    return dot;
  });
};

const setupContainer = () => {
  containerWidth.value = container.value.offsetWidth;
  containerHeight.value = container.value.offsetHeight;
  container.value.style.perspectiveOrigin = `${containerWidth.value / 2}px ${containerHeight.value * 0.45}px`;
};

const animateDots = () => {
  dots.value.forEach(dot => container.value.appendChild(dot));

  Velocity(
    dots.value,
    {
      translateX: [
        () => `+=${randomNumb(-containerWidth.value / 2.5, containerWidth.value / 2.5)}`,
        () => randomNumb(0, containerWidth.value),
      ],
      translateY: [
        () => `+=${randomNumb(-containerHeight.value / 2.75, containerHeight.value / 2.75)}`,
        () => randomNumb(0, containerHeight.value),
      ],
      translateZ: [
        () => `+=${randomNumb(translateZMin, translateZMax)}`,
        () => randomNumb(translateZMin, translateZMax),
      ],
      opacity: [() => Math.random(), () => Math.random() + 0.1],
    },
    { duration: 6000, loop: true },
  );
};

const animateContainer = () => {
  Velocity(container.value, containerAnimationMap, { duration: 800, loop: true, delay: 3250 });
};

const initialize = () => {
  if (!isVisible.value) return;
  container.value = document.createElement('div');
  container.value.className = $style.dotsContainer;
  root.value.appendChild(container.value);

  createDots();
  setupContainer();
  animateDots();
  animateContainer();
};

const destroy = () => {
  Velocity(container.value, 'stop');
  Velocity(dots.value, 'stop');
  container.value.remove();
};

const debounce = (func, wait) => {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(), wait);
  };
};

const handleResize = debounce(() => {
  destroy();
  initialize();
}, 250);

onMounted(() => {
  window.addEventListener('resize', handleResize, { passive: true });
  observeSection();
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
  visibilitySection.disconnect();
  destroy();
});
</script>
