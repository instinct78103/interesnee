<template>
  <section :class="$style.section">
    <div :class="$style.container">
      <div :class="$style.gallery">
        <div v-for="(image, index) in images" :key="image" :class="$style.photo" @click="openPopup(index)">
          <img :src="image" :class="$style.galleryImage" alt="Culture photo">
          <button :class="$style.playButton" type="button" />
        </div>
      </div>

      <!-- Section actions -->
      <div :class="$style.actions">
        <button
          v-show="!expanded && videos.length > 8"
          :class="$style.button"
          aria-label="Показать все видео"
          type="button"
          @click="expanded = !expanded"
        >
          Показать все
        </button>
      </div>
    </div>

    <!-- Slider dialog -->
    <!--    <el-dialog-->
    <!--      :visible.sync="popupOpened"-->
    <!--      :class="['dialogWithCarousel', $style.dialog]"-->
    <!--      top="5vh"-->
    <!--      @closed="stopVideos"-->
    <!--    >-->
    <!--      <el-carousel-->
    <!--        ref="carousel"-->
    <!--        :interval="4000"-->
    <!--        :autoplay="false"-->
    <!--        :initial-index="initialIndex"-->
    <!--        indicator-position="none"-->
    <!--        arrow="always"-->
    <!--        @change="stopVideos"-->
    <!--      >-->
    <!--        <el-carousel-item-->
    <!--          v-for="(video, index) in videos"-->
    <!--          :key="index"-->
    <!--          :class="$style.sliderItem">-->
    <!--          <video-->
    <!--            :class="$style.sliderPhoto"-->
    <!--            width="800"-->
    <!--            controls>-->
    <!--            <source-->
    <!--              :src="video"-->
    <!--              type="video/mp4">-->
    <!--          </video>-->
    <!--        </el-carousel-item>-->
    <!--      </el-carousel>-->
    <!--    </el-dialog>-->
  </section>
  <Dialog ref="dialog" :onscrollend="stopVideos" :onclose="stopVideos">
    <div v-for="(video, index) in videos" :key="video" class="sliderItem" :ref="(el) => videoSlidesRef[index] = el">
      <video :class="$style.sliderPhoto" width="800" controls>
        <source :src="video" type="video/mp4">
      </video>
    </div>
  </Dialog>
</template>

<script setup>
import { videoFiles, previews } from '@/data/culture-videos';
import { computed, ref, watch } from 'vue';
import Dialog from '@/components/Dialog.vue';

const dialog = ref(null);
const videoSlidesRef = ref([])
const showModal = () => dialog?.value?.showModal();

const previewPhotos = ref(previews);
const videos = ref(videoFiles);
const initialPhotos = computed(() => previewPhotos.value.slice(0, 8));
const expanded = ref(false);
const popupOpened = ref(false);
const images = ref(initialPhotos.value);
const initialIndex = ref(0);


const columnMinWidth = computed(() => {
  const videosCount = images.value.length;
  let width = 263;

  if (videosCount === 1) {
    width = 700;
  } else if (videosCount === 2) {
    width = 500;
  } else if (videosCount >= 3 && videosCount <= 6) {
    width = 300;
  }

  return width;
});

function openPopup(index) {
  showModal();
  initialIndex.value = index;

}

watch(expanded, newVal => images.value = newVal ? previewPhotos.value : initialPhotos.value);
watch(initialIndex, newVal => videoSlidesRef.value[newVal].scrollIntoView({
  behavior: 'instant',
  inline: 'start',
  block: 'nearest',
}))

function stopVideos() {
  const videos = document.getElementsByTagName('video');
  Object.keys(videos).forEach(index => {
    const video = videos[index];
    video.pause();
    video.currentTime = 0;
  });
}

/**
 * Team culture component.
 */
// export default {
//   methods: {
//     /**
//      * Open photo details popup.
//      *
//      * @param {number} index - Image index.
//      */
//     openPopup(index) {
//       this.popupOpened = true;
//       this.initialIndex = index;
//       this.setActiveSlide(index);
//     },
//     /**
//      * Close photo details popup.
//      */
//     closePopup() {
//       this.popupOpened = false;
//     },
//     /**
//      * Set active slide of popup slider.
//      *
//      * @param {number} index - Image index.
//      */
//     setActiveSlide(index) {
//       if (this.$refs.carousel) {
//         this.$refs.carousel.setActiveItem(index);
//       }
//     },
//     stopVideos() {
//       const videos = document.getElementsByTagName('video');
//       Object.keys(videos).forEach(index => {
//         const video = videos[index];
//         video.pause();
//         video.currentTime = 0;
//       });
//     },
//   },
// };
</script>

<style lang="scss" module>
@use '@/scss/helpers';

.section {
  @extend %section;
}

.container {
  @extend %container;
  max-width: 1140px;
}

.title {
  @extend %sectionTitle;
  margin: 0 0 clamp(30px, 5vw, 80px);
  text-align: center;
}

.gallery {
  --gap: 15px;
  gap: var(--gap);
  min-height: 300px;
  columns: 260px;
}

.galleryImage {
  @extend %hoverBlock;
}

.photo {
  display: grid;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  margin: 0;
  object-fit: fill;
  cursor: pointer;

  + .photo {
    margin-top: var(--gap);
  }

  &:hover .playButton {
    opacity: 1;
    transform: scale(1.1);
  }

  img {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    display: block;
    width: 100%;
    height: auto;
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
  }

  .playButton {
    grid-column: 1 / 1;
    grid-row: 1 / 1;
    border-style: solid;
    border-width: 37px 0 37px 60px;
    border-color: transparent transparent transparent var(--gray);
    display: block;
    background-color: transparent;
    z-index: 1;
    opacity: 0.7;
    transition: all 0.3s;
    cursor: pointer;
    justify-self: center;
  }
}

.sliderPhoto {
  min-width: 100%;
}

.loader {
  z-index: 4;
  width: 100%;
  height: 100%;
}

.actions {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

.button {
  @extend %button;
  width: 160px;
  padding-block: clamp(15px, 5vw, 20px);
  padding-bottom: 20px;

  @media(width <= 480px) {
    display: block;
    margin: 0 auto;
    width: auto;
  }
}
</style>
<!--<style lang="scss">-->
<!--dialog {-->
<!--  .dialog&#45;&#45;wrap {-->
<!--    display: flex;-->
<!--    scroll-snap-type: x mandatory;-->
<!--    scroll-behavior: smooth;-->
<!--    overflow-x: auto;-->
<!--    scrollbar-width: none;-->

<!--    > * {-->
<!--      outline: none;-->
<!--      display: flex;-->
<!--      align-items: center;-->
<!--      justify-content: center;-->
<!--      scroll-snap-align: start;-->
<!--      scroll-snap-stop: always;-->
<!--      width: 90cqmin;-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</style>-->