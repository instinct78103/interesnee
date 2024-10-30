import { ref, onMounted, watch, onUnmounted } from 'vue';

export function useSlider(sliderRef, props) {
  const slider = ref(null);
  const slideIndex = ref(0);
  let intervalId = null;
  const numberOfSlides = ref(0);
  let observer = null;
  let scrollTimeout = null;

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

  const scrollNext = () => {
    if (!slider.value) return;
    slideIndex.value = (slideIndex.value + 1) % numberOfSlides.value;
  };

  const scrollPrev = () => {
    if (!slider.value) return;
    slideIndex.value = (slideIndex.value - 1 + numberOfSlides.value) % numberOfSlides.value;
  };

  const startAutoScroll = () => {
    if (props.options.autoplay && !intervalId) {
      intervalId = setInterval(scrollNext, props.options.autoplaySpeed);
    }
  };

  const stopAutoScroll = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  // Watch for autoplay prop to start/stop autoplay dynamically
  // watch(() => props.options.autoplay, (newValue) => {
  //   if (newValue) {
  //     startAutoScroll();
  //   } else {
  //     stopAutoScroll();
  //   }
  // });

  // Observer to pause autoplay when the slider is not visible
  const visibilityObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startAutoScroll();
        } else {
          stopAutoScroll();
        }
      });
    },
    { threshold: 0.5 }, // Trigger when 50% of the slider is in view
  );

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

  // onMounted(() => {
  //   if (slider.value) {
  //     numberOfSlides.value = slider.value.children.length;
  //     visibilityObserver.observe(slider.value); // Start observing slider visibility
  //     nextTick(updateActiveSlideObserver); // Observe individual slides after DOM updates
  //   }
  //
  //   if (props.options.autoplay) {
  //     startAutoScroll();
  //   }
  // });

  onMounted(() => {
    observeSlides();
  });

  // onBeforeUnmount(() => {
  //   if (observer) {
  //     observer.disconnect();
  //     observer = null;
  //   }
  // });

  onUnmounted(() => observer.disconnect());

  // Optionally handle mouseenter/mouseleave to pause/resume autoplay
  const resumeAutoScroll = () => {
    if (props.options.autoplay) {
      startAutoScroll();
    }
  };

  return {
    slider,
    slideIndex,
    scrollNext,
    scrollPrev,
    stopAutoScroll,
    resumeAutoScroll,
    scrollToSlide,
  };
}