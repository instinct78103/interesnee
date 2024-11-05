import { onMounted, onUnmounted, ref } from 'vue';

export function useSlider2(sliderRef, props) {
  const isVisible = ref(false);
  const currentIndex = ref(0);
  let visibilityObserver = null;
  let observer = null;
  let intervalId = null;

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
      { threshold: 0.1 },
    );

    visibilityObserver.observe(sliderRef.value);
  };

  const observeSlides = () => {
    if (!sliderRef.value) return;
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentIndex.value = [...sliderRef.value.children].indexOf(entry.target);
          }
        });
      },
      { threshold: 0.6 },
    );

    [...sliderRef.value.children].forEach((slide) => observer.observe(slide));
  };

  function scrollNext() {
    currentIndex.value++;
    if (currentIndex.value > sliderRef.value.children.length - 1) {
      currentIndex.value = 0;
    }
  }

  function scrollPrev() {
    currentIndex.value--;
    if (currentIndex.value < 0) {
      currentIndex.value++;
    }
  }

  const scrollToSlide = function (index) {
    scrollToSlide.scrollTimeout = null;
    const sliderWidth = sliderRef.clientWidth;  // Width of the visible slider area
    const slideWidth = sliderRef.children[index].offsetWidth; // Width of each slide
    const targetPosition = index * slideWidth;

    // Adjust if the slideWidth is smaller than the slider width (peek behavior on desktop)
    const adjustPosition = Math.min(targetPosition, sliderRef.scrollWidth - sliderWidth);

    clearTimeout(scrollToSlide.scrollTimeout);
    scrollToSlide.scrollTimeout = setTimeout(() => {
      sliderRef.scrollTo({
        left: adjustPosition,
        behavior: 'smooth',
      });
    }, 250);
  };

  const startAutoScroll = () => {
    if (props?.autoplay && props?.autoplaySpeed && isVisible.value) {
      intervalId = setInterval(scrollNext, props?.autoplaySpeed);
    }
  };

  const stopAutoScroll = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const resumeAutoScroll = () => {
    if (props?.autoplay) {
      startAutoScroll();
    }
  };

  onMounted(() => {
    startAutoScroll();
    observeSlides();
    observeVisibility();

    sliderRef.value?.addEventListener('mouseenter', stopAutoScroll);
    sliderRef.value?.addEventListener('mouseleave', resumeAutoScroll);
  });

  onUnmounted(() => {
    observer?.disconnect();
    visibilityObserver?.disconnect();
    stopAutoScroll();

    sliderRef.value?.removeEventListener('mouseenter', stopAutoScroll);
    sliderRef.value?.removeEventListener('mouseleave', resumeAutoScroll);
  });

  return {
    currentIndex,
    scrollToSlide,
    scrollNext,
    scrollPrev,
  };

}