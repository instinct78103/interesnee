import { ref, onMounted, watch, onUnmounted } from 'vue';

export function useSlider(sliderRef, props) {
  const slideIndex = ref(0);
  let observer = null;
  let scrollTimeout = null;
  let intervalId = null;
  let visibilityObserver = null;
  const isVisible = ref(false);

  const startAutoScroll = () => {
    if (props?.options?.autoplay && props?.options?.autoplaySpeed && isVisible.value) {
      intervalId = setInterval(scrollNext, props?.options?.autoplaySpeed);
    }
  };

  const stopAutoScroll = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const resumeAutoScroll = () => {
    if (props?.options?.autoplay) {
      startAutoScroll();
    }
  };

  const scrollToSlide = (index) => {
    const sliderWidth = sliderRef.value.clientWidth;  // Width of the visible slider area
    const slideWidth = sliderRef.value.children[index].offsetWidth; // Width of each slide
    const targetPosition = index * slideWidth;

    // Adjust if the slideWidth is smaller than the slider width (peek behavior on desktop)
    const adjustPosition = Math.min(targetPosition, sliderRef.value.scrollWidth - sliderWidth);

    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      sliderRef.value.scrollTo({
        left: adjustPosition,
      });
    }, 250);
  };

  watch(slideIndex, (newVal) => scrollToSlide(newVal));

  const observeSlides = () => {
    if (!sliderRef.value) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            slideIndex.value = [...sliderRef.value.children].indexOf(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );

    [...sliderRef.value.children].forEach((slide) => observer.observe(slide));
  };

  const observeVisibility = () => {
    if (!sliderRef.value) return;

    visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.value = entry.isIntersecting;
          if (isVisible.value) {
            startAutoScroll();
          } else {
            stopAutoScroll();
          }
        });
      },
      { threshold: 0.1 }
    );

    visibilityObserver.observe(sliderRef.value);
  };

  onMounted(() => {
    startAutoScroll()
    observeSlides();
    observeVisibility()
  });
  onUnmounted(() => {
    observer?.disconnect();
    visibilityObserver?.disconnect();
    stopAutoScroll();
  });

  function scrollNext() {
    slideIndex.value++;
    if (slideIndex.value > sliderRef.value.children.length - 1) {
      slideIndex.value = 0;
    }
  }

  function scrollPrev() {
    slideIndex.value--;
    if (slideIndex.value < 0) {
      slideIndex.value++;
    }
  }

  return {
    slideIndex,
    scrollNext,
    scrollPrev,
    stopAutoScroll,
    resumeAutoScroll,
    observeSlides,
  };
}