<template>
  <section :class="$style.root">

    <h2 :class="$style.title">Наши офисы</h2>

    <BaseSlider
      ref="slick"
      :is-manual-init="true"
      :is-destroyed="!isSlickInit"
      :class="$style.container"
      :options="slickOpts">
      <div
        v-for="(office, index) in offices"
        :key="index"
        :class="{[$style.hasGallery]: office.images}"
        @click="openCarousel(office)">
        <Office
          v-if="index <= 3"
          :office="office"
          :class="$style.image"
        />
      </div>
    </BaseSlider>

    <el-dialog
      :visible.sync="showCarousel"
      class="dialogWithCarousel">
      <el-carousel
        v-if="selectedOffice && selectedOffice.images"
        :interval="4000"
        height="600px">
        <el-carousel-item
          v-for="(image, index) in selectedOffice.images"
          :key="index">
          <el-image
            :src="image"
            :class="$style.carouselImg"
            fit="cover"/>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>

  </section>
</template>

<script>
import Office from 'components/Office';
import { offices } from 'data/mockCommonInfo';
import BaseSlider from 'components/BaseSlider';
import baseSlickMethods from 'config/base-slick';

export default {
  name: 'TeamOffices',
  components: {
    Office,
    BaseSlider,
  },
  mixins: [baseSlickMethods],
  data() {
    return {
      offices,
      selectedOffice: null,
      showCarousel: false,
      isSlickInit: false,
      slickOpts: {
        arrows: false,
        dots: true,
        dotsClass: this.$style.sliderDots,
      },
    };
  },
  methods: {
    openCarousel(office) {
      if (office.images) {
        this.selectedOffice = office;
        this.showCarousel = true;
      }
    },
  },
};
</script>

<style lang="scss" module>
@import '../styles/variables';
@import '../styles/mixins';
@import '../styles/helpers';

.root {
  @extend %section;

  @include media('<tablet') {
    display: block;
  }

  &::after {
    display: none;
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

.container {
  @extend %container;
  @extend %content;
  max-width: 1170px;

  display: flex;
  justify-content: space-between;
  position: relative;

  @include media('<desktop') {
    text-align: center;
  }
}

.carouselImg {
  width: 100%;
  height: 600px;
}

.hasGallery {
  cursor: pointer;
}

.sliderDots {
  @extend %slickDots;
}
</style>
