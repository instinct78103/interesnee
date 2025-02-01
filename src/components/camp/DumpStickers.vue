<template>
  <section :class="$style.root">
    <div :class="$style.container">
      <base-slider
        :options="sliderOpts"
      >
        <app-image
          v-for="(imageName, index) in stickersImages"
          :class="$style.stickerImage"
          :key="index"
          :alt="imageName"
          :x1="`/images/stickers/${imageName}`"
        />
      </base-slider>

      <a
        :class="$style.button"
        href="https://t.me/addstickers/interesneeru"
        target="_blank"
      >
        Получи забавный Стикер-пак в Telegram
      </a>
    </div>
  </section>
</template>

<script>
import BaseSlider from 'components/BaseSlider';

export default {
  name: 'DumpStickers',
  components: {
    BaseSlider,
  },
  data() {
    return {
      sliderOpts: {
        dots: false,
        arrows: false,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplaySpeed: 10000,
        pauseOnHover: false,
        touchThreshold: 30,
        swipeToSlide: true,
        responsive: [
          {
            breakpoint: 980,
            settings: {
              slidesToShow: 3,
            },
          },
          {
            breakpoint: 550,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 320,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      },
      stickersImages: [
        'a-03-min.png',
        'a-04-min.png',
        'a-06-min.png',
        'a-07-min.png',
        'a-08-min.png',
        'a-09-min.png',
        'a-10-min.png',
        'a-11-min.png',
        'a-12-min.png',
        'a-13-min.png',
        'a-14-min.png',
        'a-15-min.png',
        'a-16-min.png',
        'a-17-min.png',
        'a-18-min.png',
        'a-28-min.png',
        'a-29-min.png',
        'a-30-min.png',
        'a-01-min.png',
        'a-02-min.png',
        'a-05-min.png',
      ],
    };
  },
};
</script>

<style lang="scss" module>
@import '../styles/variables';
@import '../styles/helpers';

.root {
  @extend %section;
  text-align: center;
}

.root:nth-child(odd) {
  @include media('<=phone') {
    background-color: $white;
  }
}

.stickerImage {
  padding: 20px;
}

.root::after {
  display: none;
}

.root .rotated {
  @include media('<=desktop-xlg') {
    max-width: 100%;
  }
}

.container {
  @extend %container;
}

.title {
  @extend %sectionTitle;
  margin: 0;
  text-align: center;
}

.desktopImage {
  width: 100%;

  @include media('<=phone') {
    display: none;
  }

  @include media('>phone') {
    display: initial;
  }
}

.mobileImage {
  width: 100%;

  @include media('<=phone') {
    display: initial;
  }

  @include media('>phone') {
    display: none;
  }
}

.button {
  @extend %button;
  margin-top: 15px;
}
</style>
