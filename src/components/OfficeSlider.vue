<template>
  <div :class="$style.root">
    <!-- Internal office slider -->
    <BaseSlider
      ref="slick"
      :is-manual-sliding="true"
      :options="sliderOpts"
      :go-slide="currentSlider"
      @afterChange="slideChanged"
    >
      <div
        v-for="(value, index) in office"
        :key="index"
      >
        <div :class="$style.office">
          <div
            :class="$style.officePhotos"
            @click="openCarousel(value)"
          >
            <el-carousel
              :interval="4000"
              :autoplay="true"
              :arrow="value.images.length > 1 ? 'always' : 'never'"
              :indicator-position="value.images.length > 1 ? 'outside' : 'none'"
              height="180px"
              trigger="click"
            >
              <el-carousel-item
                v-for="(image, index) in value.images"
                :key="index"
              >
                <app-image
                  :class="$style.carouselImg"
                  :x1="image.origin"
                  :webp="image.webp"
                  alt="Office photo"
                  lazy
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div :class="$style.textWrap">
            <template v-if="value.link">
              <a :href="value.link">
                <p :class="$style.title">{{ value.city }}</p>
              </a>
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
      </div>
    </BaseSlider>

    <!-- Office dialog -->
    <el-dialog
      :visible.sync="showDialog"
      :class="['dialogWithCarousel', $style.dialog]"
    >
      <el-carousel
        v-if="selectedOffice"
        :interval="4000"
        :autoplay="false"
        :class="$style.dialogSlider"
        :arrow="selectedOffice.images.length > 1 ? 'always' : 'never'"
        indicator-position="none"
        trigger="click"
      >
        <el-carousel-item
          v-for="(image, index) in selectedOffice.images"
          :key="index"
          :class="$style.dialogSliderItem">
          <app-image
            :class="$style.dialogImg"
            :x1="image.origin"
            :webp="image.webp"
            alt="Office photo"
            lazy
          />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script setup>
import BaseSlider from '@/components/BaseSlider.vue';

// export default {
//   name: 'OfficeSlider',
//   props: {
//     office: {
//       type: Array,
//       default: () => [],
//     },
//     show: {
//       type: Boolean,
//       default: true,
//     },
//     currentSlider: {
//       type: Number,
//       default: 0,
//     },
//   },
//   data() {
//     return {
//       /**
//        * Selected office on map state.
//        */
//       selectedOffice: null,
//       /**
//        * Show office preview dialog state.
//        */
//       showDialog: false,
//       sliderOpts: {
//         dots: false,
//         arrows: false,
//         dotsClass: this.$style.sliderDots,
//         autoplay: false,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         draggable: false,
//         responsive: [
//           {
//             breakpoint: 768,
//             settings: {
//               dots: true,
//               draggable: true,
//             },
//           },
//         ],
//       },
//     };
//   },
//   watch: {
//     showDialog() {
//       // Hack to remove hidden body overflow on close modal.
//       if (!this.showDialog) {
//         $('body').css('overflow', '');
//
//         // Reset selected office to improve UX
//         // to not show previous office on new popup opening.
//         setTimeout(() => {
//           this.selectedOffice = null;
//         }, 500);
//       }
//     },
//   },
//   methods: {
//     slideChanged(event, slick, currentSlide) {
//       this.$emit('sliderChanged', currentSlide);
//     },
//     /**
//      * Open office preview dialog.
//      *
//      * @param {Object} office - Selected office.
//      */
//     openCarousel(office) {
//       this.selectedOffice = office;
//       this.showDialog = true;
//     },
//   },
// };
</script>

<style lang="scss" module>
//@import '../styles/variables';
@import '@/scss/helpers';

$slider-brake-point: 768px;

.root {
  max-width: 600px;
  margin: auto;
}

.dialog [role='dialog'] {
  margin: auto 20px;
  width: 960px;
}

.dialog [class='el-dialog__body'] {
  padding: 0;
}

.office {
  text-align: center;
  margin: auto;
  justify-content: center;
  display: flex;

  @media (max-width: $slider-brake-point) {
    flex-direction: column;
  }
}

.officePhotos {
  cursor: pointer;
  display: inline-block;
  width: 50%;
  overflow: unset;
  margin-right: 20px;

  @media (max-width: $slider-brake-point) {
    width: 100%;
  }

  ul li button {
    width: 8px;
    height: 8px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    outline: none;
    font-size: 0;
    background-color: var(--dots-color);
  }

  ul li[class*='is-active'] button {
    background-color: var(--dots-active-color);
  }
}

.dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0;

  .dialogImg {
    height: 100%;

    img {
      object-fit: cover;
      width: 100%;
      max-height: 600px;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
  }

  .dialogSliderItem {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.carouselImg img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  &:hover {
    transform: scale(1.05);
  }
}

.image {
  max-width: 330px;
  margin-right: 20px;

  @media (max-width: $slider-brake-point) {
    margin: auto;
  }
}

.textWrap {
  text-align: left;
  max-width: 330px;
  margin: auto 0;
  user-select: text;

  @media (max-width: $slider-brake-point) {
    text-align: center;
    margin: auto;
  }
}

.title {
  color: var(--blue);
  font-size: clamp(20px, 3vw, 24px);
  line-height: 1.25;
}

.address {
  opacity: 0.8;
  color: var(--blue);
  font-size: 16px;
  line-height: 1.5;
}

/*========== Slider ===========*/
.sliderDots {
  position: static;
  margin: 10px auto 0;
  transform: none;

  &:hover {
    transform: scale(1.05);
  }
}
/*===== End of Slider =========*/

@media (width > $slider-brake-point) {
  .dialog {
    [class='el-carousel__container'] {
      height: 600px;
    }
  }
}

@media (max-width: $slider-brake-point) {
  [class='el-dialog'] {
    width: 60%;
  }

  .dialogImg {
    max-height: 600px;
    height: 100%;
  }
}

@media (max-width: 1365px) {
  .dialog [role='dialog'] {
    margin: auto 20px;
    width: 100%;
  }
}

@media (max-width: 415px) {
  .dialog [role='dialog'] {
    margin: auto 5px;
  }
}
</style>
