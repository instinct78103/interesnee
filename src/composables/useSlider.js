import { ref, onMounted, watch, onUnmounted } from 'vue';

export function useSlider(sliderRef) {
  const slideIndex = ref(0);
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

  onMounted(() => observeSlides());
  onUnmounted(() => observer.disconnect());

  return {
    slideIndex,
  };
}