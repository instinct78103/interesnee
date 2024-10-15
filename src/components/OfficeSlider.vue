<template>
  <div :class="$style.root">
    <!-- Internal office slider -->
    <BaseSlider
      ref="slick"
      :is-manual-sliding="true"
      :options="sliderOpts"
      :go-slide="currentSlider"
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
            <!--            <el-carousel-->
            <!--              :interval="4000"-->
            <!--              :autoplay="true"-->
            <!--              :arrow="value.images.length > 1 ? 'always' : 'never'"-->
            <!--              :indicator-position="value.images.length > 1 ? 'outside' : 'none'"-->
            <!--              height="180px"-->
            <!--              trigger="click"-->
            <!--            >-->
            <!--              <el-carousel-item-->
            <!--                v-for="(image, index) in value.images"-->
            <!--                :key="index"-->
            <!--              >-->
            <!--                <app-image-->
            <!--                  :class="$style.carouselImg"-->
            <!--                  :x1="image.origin"-->
            <!--                  :webp="image.webp"-->
            <!--                  alt="Office photo"-->
            <!--                  lazy-->
            <!--                />-->
            <!--              </el-carousel-item>-->
            <!--            </el-carousel>-->
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
    <!--    <el-dialog-->
    <!--      :visible.sync="showDialog"-->
    <!--      :class="['dialogWithCarousel', $style.dialog]"-->
    <!--    >-->
    <!--      <el-carousel-->
    <!--        v-if="selectedOffice"-->
    <!--        :interval="4000"-->
    <!--        :autoplay="false"-->
    <!--        :class="$style.dialogSlider"-->
    <!--        :arrow="selectedOffice.images.length > 1 ? 'always' : 'never'"-->
    <!--        indicator-position="none"-->
    <!--        trigger="click"-->
    <!--      >-->
    <!--        <el-carousel-item-->
    <!--          v-for="(image, index) in selectedOffice.images"-->
    <!--          :key="index"-->
    <!--          :class="$style.dialogSliderItem">-->
    <!--          <app-image-->
    <!--            :class="$style.dialogImg"-->
    <!--            :x1="image.origin"-->
    <!--            :webp="image.webp"-->
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
import $style from './OfficeSlider.module.scss';

const sliderOpts = {
  dots: false,
  arrows: false,
  dotsClass: $style.sliderDots,
  autoplay: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  draggable: false,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        dots: true,
        draggable: true,
      },
    },
  ],
};

defineProps({
  office: {
    type: Array,
  },
  currentSlider: {
    type: Number,
    default: 0,
  },
});

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

<style lang="scss" module></style>
