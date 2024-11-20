<template>
  <div :class="$style.root">
    <!-- Internal office slider -->
    <BaseSlider
      ref="slick"
      :is-manual-sliding="true"
      :options="sliderOpts"
      @afterChange="slideChanged"
    >
      <div
        :class="$style.projectPhotos"
        @click="openCarousel()">
<!--        <el-carousel-->
<!--          :interval="4000"-->
<!--          :autoplay="true"-->
<!--          arrow="always"-->
<!--          trigger="click"-->
<!--        >-->
<!--          <el-carousel-item-->
<!--            v-for="(image, index) in sliderContent"-->
<!--            :key="index"-->
<!--          >-->
<!--            <app-image-->
<!--              :class="$style.carouselImg"-->
<!--              :x1="image.x1"-->
<!--              :x2="image.x2"-->
<!--              :placeholder="image.x1"-->
<!--              alt="Office photo"-->
<!--              lazy-->
<!--            />-->
<!--          </el-carousel-item>-->
<!--        </el-carousel>-->
      </div>
    </BaseSlider>

<!--    <el-dialog-->
<!--      :visible.sync="showDialog"-->
<!--      :class="['dialogWithCarousel', $style.dialog]"-->
<!--    >-->
<!--      <el-carousel-->
<!--        :interval="4000"-->
<!--        :autoplay="false"-->
<!--        :class="$style.dialogSlider"-->
<!--        arrow="always"-->
<!--        indicator-position="none"-->
<!--        trigger="click"-->
<!--      >-->
<!--        <el-carousel-item-->
<!--          v-for="(image, index) in sliderContent"-->
<!--          :key="index"-->
<!--          :class="$style.dialogSliderItem">-->
<!--          <app-image-->
<!--            :class="$style.dialogImg"-->
<!--            :x1="image.x1"-->
<!--            :x2="image.x2"-->
<!--            :placeholder="image.x1"-->
<!--            alt="Office photo"-->
<!--            lazy-->
<!--          />-->
<!--        </el-carousel-item>-->
<!--      </el-carousel>-->
<!--    </el-dialog>-->
  </div>
</template>

<script setup>
import BaseSlider from '@/components/BaseSlider.vue';

// export default {
//   name: 'ProjectSlider',
//   components: { BaseSlider },
//   props: {
//     sliderContent: {
//       type: Array,
//       default: () => [],
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
//     openCarousel() {
//       this.showDialog = true;
//     },
//   },
// };
</script>

<style lang="scss" module>
//@import '../styles/variables';
@import '@/scss/helpers';

$slider-md-brake-point: 1000px;
$slider-brake-point: 768px;

.root {
  max-width: 80%;
  margin: 0 auto 30px;
}

.dialog [role='dialog'] {
  margin: auto 20px;
  width: 1200px;
}

.dialog [class='el-dialog__body'] {
  padding: 0;
}

.projectPhotos {
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

  [class='el-carousel__container'] {
    height: 550px;

    @media (max-width: $slider-md-brake-point) {
      height: 400px;
    }

    @media (max-width: $slider-brake-point) {
      height: 200px;
    }
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
      max-height: 700px;
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
  @extend %hoverBlock;

  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-size: clamp(20px, 4vw, 24px);
  line-height: 30px;

  @media (max-width: $slider-brake-point) {
    font-size: 20px;
  }
}

.address {
  opacity: 0.8;
  color: var(--blue);
  font-size: 16px;
  line-height: 1.5;
}

/*========== Slider ===========*/
.sliderDots {
  //@extend %slickDots;
  position: static;
  margin: 10px auto 0;
  transform: none;
}
/*===== End of Slider =========*/

@media (width > 768px) {
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
