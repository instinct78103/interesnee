<template>
  <section :class="$style.section">
    <div :class="$style.container">
      <div :class="$style.gallery">
        <!-- Photos galley -->
        <stack
          :column-min-width="columnMinWidth"
          :gutter-width="15"
          :gutter-height="15"
          :monitor-images-loaded="true"
        >
          <!-- Gallery item -->
          <stack-item
            v-for="(image, index) in images"
            :class="$style.photo"
            :key="index"
            style="transition: transform 300ms"
          >
            <img
              :src="image"
              :class="$style.galleryImage"
              alt="Culture photo"
              decoding="async"
              @click="openPopup(index)"
            >

            <button
              :class="$style.playButton"
              type="button"
              @click="openPopup(index)"
            />
          </stack-item>
        </stack>
      </div>

      <!-- Section actions -->
      <div :class="$style.actions">
        <button
          v-show="!expanded && videos.length > 8"
          :class="$style.button"
          aria-label="Показать все видео"
          type="button"
          @click="toggleExpanded"
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
</template>

<script setup>
// import { Stack, StackItem } from 'vue-stack-grid';
import { videoFiles, previews } from '@/data/culture-videos';
import { computed, ref } from 'vue';
// import BaseLoader from './BaseLoader';

const initialPhotos = computed(() => previewPhotos.value.slice(0, 8));


const expanded = ref(false);
const popupOpened = ref(false);
const images = ref(initialPhotos.value);
const initialIndex = ref(0);
const previewPhotos = ref(previews);
const videos = ref(videoFiles);


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

/**
 * Team culture component.
 */
export default {
  watch: {
    expanded() {
      if (this.expanded) {
        this.images = this.previewPhotos;
      } else {
        this.images = this.initialPhotos;
      }
    },
    popupOpened() {
      // Hack to remove hidden body overflow on close modal.
      if (!this.popupOpened) {
        $('body').css('overflow', '');
      }
    },
  },
  methods: {
    /**
     * Toggle expanded gallery state.
     */
    toggleExpanded() {
      this.expanded = !this.expanded;
    },
    /**
     * Open photo details popup.
     *
     * @param {number} index - Image index.
     */
    openPopup(index) {
      this.popupOpened = true;
      this.initialIndex = index;
      this.setActiveSlide(index);
    },
    /**
     * Close photo details popup.
     */
    closePopup() {
      this.popupOpened = false;
    },
    /**
     * Set active slide of popup slider.
     *
     * @param {number} index - Image index.
     */
    setActiveSlide(index) {
      if (this.$refs.carousel) {
        this.$refs.carousel.setActiveItem(index);
      }
    },
    stopVideos() {
      const videos = document.getElementsByTagName('video');
      Object.keys(videos).forEach(index => {
        const video = videos[index];
        video.pause();
        video.currentTime = 0;
      });
    },
  },
};
</script>

<style lang="scss" module>
@import '../styles/variables';
@import '../styles/helpers';

.section {
  @extend %section;

  @include media('<=desktop') {
    padding-bottom: 150px;
  }

  @include media('<=phone') {
    padding-bottom: 100px;
  }
}

.container {
  @extend %container;
  max-width: 1140px;

  @include media('<desktop-xlg') {
    max-width: 992px;
  }
}

.title {
  @extend %sectionTitle;
  margin: 0 0 relative-mb(80, 46);
  text-align: center;

  @include media('<=phone') {
    margin-bottom: 30px;
  }
}

.gallery {
  min-height: 300px;
}

.galleryImage {
  @extend %hoverBlock;
}

.playButton {
  border-style: solid;
  border-width: 37px 0 37px 60px;
  border-color: $transparent $transparent $transparent $gray;
  display: block;
  background-color: $transparent;
  z-index: 999;
  position: absolute;
  margin: auto;
  opacity: 0.7;
  transition: all 0.3s;
  cursor: pointer;
}

.photo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  margin: 0;
  object-fit: fill;
  cursor: pointer;
  position: relative;

  &:hover .playButton {
    opacity: 1;
    transform: scale(1.1);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
  }
}

.loader {
  z-index: 4;
  width: 100%;
  height: 100%;
}

/*========== Actions styles ===========*/
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
  padding-top: 20px;
  padding-bottom: 20px;

  @include media('<=phone') {
    display: block;
    margin: 0 auto;
    width: auto;
    padding-top: 15px;
    padding-bottom: 15px;
  }
}

/*======== End of Actions styles =======*/

/*========== Dialog ===========*/
.dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;

  .sliderPhoto {
    width: 100%;
    background-color: $black;
  }

  [class*='el-carousel__item'] {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.dialog [class='el-dialog'] {
  background-color: $transparent;
  box-shadow: none;
}

.dialog [class='el-dialog__body'] {
  padding: 0;
}

@media (max-width: 1366px) {
  .dialog [role='dialog'] {
    margin: auto 20px;
    width: 100%;
  }

  [class='el-dialog'] {
    width: 100%;
  }
}

@media (min-width: 769px) {
  .dialog {
    [class='el-carousel__container'] {
      height: 85vh;
    }
  }
}

@media (max-width: 768px) {
  [class='el-dialog'] {
    width: 60%;
  }

  .sliderPhoto {
    max-height: 85vh;
    height: 100%;
  }

  .dialog {
    [role='dialog'] {
      margin: auto 5px;
    }

    [class='el-carousel__container'] {
      height: 85vh;
    }
  }
}

@media (max-width: 415px) {
  .dialog [role='dialog'] {
    margin: auto 2px;
  }
}

/*========== End of Dialog ===========*/
</style>
