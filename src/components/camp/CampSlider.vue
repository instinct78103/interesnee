<template>
  <section
    id="lottery"
    :class="$style.root"
  >
    <div :class="$style.descriptionCol">
      <h2 :class="$style.title">
        Отзывы
      </h2>

      <div :class="$style.descriptionContainer">
        <img
          :class="$style.icQuotes"
          decoding="async"
          src="/static/ic_quotes.svg"
          alt="quotes">
        <base-slider
          :class="[$style.contentSlider, 'feedback-quote-carousel']"
          :options="quoteSliderOpts"
        >
          <blockquote
            v-for="(data, index) in sliderContent"
            :class="$style.commentWrap"
            :key="index">
            <p v-html="data.feedback.content"/>
            <p :class="$style.commentAuthor">
              {{ data.feedback.author }}
            </p>
          </blockquote>
        </base-slider>
      </div>
    </div>
    <div :class="$style.contentCol">
      <base-slider
        :class="$style.contentSlider"
        :options="sliderOpts"
      >
        <app-image
          v-for="(data, index) in sliderContent"
          :key="index"
          :class="$style.contentImage"
          :alt="data.img.alt"
          :x1="data.img.x1"
          :webp="data.img.webp"
        />
      </base-slider>
    </div>
  </section>
</template>

<script>
import BaseSlider from 'components/BaseSlider';
import summerCampFeedbacks from 'data/summerCampFeedbacks';

export default {
  name: 'CampSlider',
  components: {
    BaseSlider,
  },
  data() {
    return {
      sliderOpts: {
        dots: true,
        arrows: true,
        dotsClass: this.$style.sliderDots,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplaySpeed: 10000,
        pauseOnHover: false,
        asNavFor: '.feedback-quote-carousel',
        prevArrow: `<button type="button" class="${this.$style.sliderArrow}
          ${
            this.$style.sliderArrowLeft
          }" tabindex="0"><i class="el-icon-arrow-left"></i></button>`,
        nextArrow: `<button type="button" class="${this.$style.sliderArrow}
          ${
            this.$style.sliderArrowRight
          }" tabindex="0"><i class="el-icon-arrow-right"></i></button>`,
      },
      quoteSliderOpts: {
        dots: false,
        arrows: false,
        autoplay: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: false,
      },
      currentSlider: 0,
      sliderContent: summerCampFeedbacks,
    };
  },
};
</script>

<style lang="scss" module>
@import '../styles/variables';
@import '../styles/helpers';

.root {
  @extend %container;

  display: flex;
  flex-flow: row nowrap;
  padding: 20px 45px;
  gap: 45px;
  align-items: center;
  background: $white-gray;

  @include media('<desktop') {
    flex-wrap: wrap;
    padding: 0;
  }
}

.sliderArrow {
  border: 0;
  outline: 0;
  padding: 0;
  margin: 0;
  height: 36px;
  width: 36px;
  cursor: pointer;
  transition: 0.3s;
  border-radius: 50%;
  background-color: $gray-transparent;
  color: $white;
  position: absolute;
  top: 50%;
  z-index: 10;
  transform: translateY(-50%);
  text-align: center;
  font-size: 12px;
}

.sliderArrowLeft {
  left: 35px;
}

.sliderArrowRight {
  right: 35px;
}

.descriptionCol {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 450px;
  padding: 40px 0;
  background: $white-gray;
  text-align: center;

  @include media('<=desktop') {
    padding: 0 $grid-gutter;
  }

  @include media('<desktop') {
    width: 100%;
    padding: $grid-gutter*2 $grid-gutter;
  }
}

.descriptionContainer {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  @include media('<desktop') {
    height: 460px;
  }

  @media (max-width: 1023px) {
    height: auto;
  }
}

.icQuotes {
  display: block;
  width: 34px;
  margin: 30px auto 20px;
}

.commentWrap {
  opacity: 0.8;
  color: $gray-dark;
  font-family: $default-font-stack;
  font-size: 16px;
  line-height: 1.5;
  padding: 0 5px;
  margin: 0;
  text-align: justify;

  & + & {
    margin-top: 10px;
  }

  p {
    &:first-child {
      text-indent: 40px;
    }

    &:last-child {
      font-weight: bold;
    }
  }

  br {
    content: '';
    margin: 5px;
    display: block;
  }
}

.commentAuthor {
  font-size: 14px;
  font-style: italic;
  text-align: center;
  margin-top: 20px;
}

.contentCol {
  position: relative;
  width: calc(100% - 450px - 45px);
  background-color: $white-gray;

  @include media('<desktop') {
    width: 100%;
  }
}

.title {
  @extend %sectionTitle;
  margin: 0;
  margin-bottom: relative-mb(17, 46);
  font-size: 46px;
  line-height: 1.2;
}

.list {
  padding: 0;
  margin: 0 0 25px;
  list-style: none;
  counter-reset: counter;
  text-align: left;
}

.listItem {
  display: inline-block;
  vertical-align: top;
  position: relative;
  padding: 0;
  padding-left: 20px;
  margin: 0;
  font-size: 0;
}

.listItem::before {
  @include set-fz-lh(16, 25);
  content: counter(counter)'.';
  counter-increment: counter;
  position: absolute;
  left: 0;
  top: 0;
  font-family: $default-font-stack;
  color: $gray-dark;
  opacity: 0.8;
}

.condition {
  @include set-fz-lh(24, 30);
  margin: 0;
  margin-bottom: relative-mb(23, 24);
  color: $red;

  @include media('<=desktop') {
    font-size: 20px;
  }
}

.text {
  @include set-fz-lh(16, 25);
  margin: 0;
  color: $gray-dark;
  opacity: 0.8;
}

.textMb {
  margin-bottom: 30px;

  @include media('<=desktop') {
    margin-bottom: 25px;
  }
}

.buttons {
  display: flex;
  justify-content: center;

  @include media('<tablet') {
    flex-wrap: wrap;
  }
}

.button {
  @extend %button;
  display: flex;
  align-items: center;
  padding: 9px 20px 7px;
  margin: 5px;
  white-space: nowrap;
}

.icon {
  width: 30px;
  height: 30px;
  fill: $white;
  margin-right: 5px;
}

.contentSlider {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.sliderDots {
  @extend %slickDots;
  bottom: 30px;

  @include media('<=phone') {
    bottom: 15px;
  }
}

.contentImage img {
  width: 100%;
  padding: 2px;
}
</style>
