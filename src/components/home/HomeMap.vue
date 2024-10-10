<template>
  <section :class="[$style.root, $style.background]">
    <div :class="$style.container">

      <RotatedHeading>
        <h3>Наши офисы</h3>
      </RotatedHeading>

      <div :class="$style.wrapper">
        <h2 :class="$style.subHeading">
          Мы находимся в нескольких городах
        </h2>

        <button
          v-for="(item, index) in offices"
          :key="index"
          :class="[$style.placemarkBtn, item.className, {[$style.active]: selected === item.value, }, officeClasses[item.value]]"
          :aria-label="`Перейти на город ${item.city}`"
          @click="setActiveMarker(item.value, index)"
        >
          <HomeMapMark :is-active="selected === item.value"/>
          <span :class="$style.placemarkCity">{{ item.city }}</span>
        </button>
      </div>

    </div>

    <div :class="$style.bottomLine">
      <OfficeSlider
        :office="offices"
        :current-slider="currentSlide"
        @sliderChanged="sliderChanged"
      />
    </div>
  </section>
</template>

<script setup>
import RotatedHeading from '@/components/RotatedHeading.vue';
import HomeMapMark from '@/components/home/HomeMapMark.vue';
import OfficeSlider from '@/components/OfficeSlider.vue';
import { offices } from '@/data/commonInfo.js';

// export default {
//   name: 'HomeMap',
//   data() {
//     return {
//       currentSlide: 0,
//       showOffice: false,
//       selected: 'ekb',
//       offices,
//       officeClasses: {
//         ekb: this.$style.placemarkEkb,
//         rdn: this.$style.placemarkRdn,
//         ksk: this.$style.placemarkKsk,
//         sch: this.$style.placemarkSch,
//         ny: this.$style.placemarkNy,
//         ch: this.$style.placemarkCh,
//         nb: this.$style.placemarkNb,
//         hcm: this.$style.placemarkHcm,
//       },
//     };
//   },
//   computed: {
//     officesAndMarks() {
//       return this.offices.map(office => {
//         const officeAndMark = office;
//         officeAndMark.className = this.officeClasses[office.value];
//         return office;
//       });
//     },
//     selectedOffice() {
//       return this.officesAndMarks.find(obj => obj.value === this.selected);
//     },
//   },
//   created() {
//     this.setSelected(this.selected);
//   },
//   methods: {
//     sliderChanged(index) {
//       this.setSelected(offices[index].value);
//     },
//     setActiveMarker(value, index) {
//       this.setSelected(value);
//       this.currentSlide = Number(index);
//     },
//     setSelected(value) {
//       this.showOffice = false;
//       this.selected = value;
//       this.$nextTick().then(() => {
//         this.showOffice = true;
//       });
//     },
//   },
// };
</script>

<style lang="scss" module>
@import '@/scss/helpers';

$white-opacity: rgba(255, 255, 255, 0.49);

/*========== breakpoint ===========*/
$lg: 1199px;

.root {
  @extend %section;
  height: 1000px;
  padding-top: 70px;
  padding-bottom: 140px;
  overflow: hidden;
  position: relative;

  @media(width <= 1024px) {
    height: 900px;
  }
}

.root.background {
  background: #fff url('/static/map2.jpg') no-repeat center 150px;
  background-size: 1440px auto;

  @media (max-width: $lg) {
    background-size: 100% auto;
    background-position: center clamp(28%, 4vw, 48%);
  }

  @media (max-width: 442px) {
    background-size: 100%;
    background-position: -10px 29%;
  }
}

.bottomLine {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  min-height: 346px;
  width: 100%;
  padding: 50px 0;
  background-color: $white-opacity;
}

.container {
  @extend %container;
  height: 100%;

  @media(width < 768px) {
    height: 100%;
  }
}

.wrapper {
  @extend %content;
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
}

.subHeading {
  @extend %heading;
  text-align: center;
  margin-bottom: 64px;

  @media(width < 768px) {
    text-align: center;
  }
}

.placemarkBtn {
  position: absolute;
  display: inline-block;
  vertical-align: top;
  padding: 0;
  border: 0;
  outline: none;
  background-color: transparent;
  cursor: pointer;
}

.placemarkCity {
  font-size: 16px;
  line-height: 1.5;
  position: absolute;
  color: var(--red-light);
  opacity: 0.8;
  transition: color 0.3s;
  min-width: 100px;
  display: block;
  left: 50%;
  top: 40px;
  transform: translateX(-55%);

  @media(width < 768px) {
    display: none;
  }
}

.placemarkEkb {
  top: 32%;
  right: 29%;

  @media (max-width: $lg) {
    top: clamp(22%, 3vw, 34%);
    right: 35%;
  }

  .placemarkCity {
    transform: none;
    bottom: -9px;
    top: auto;
    right: 40px;
    left: auto;
  }
}

.placemarkRdn {
  top: 34%;
  right: 26%;

  @media (max-width: $lg) {
    top: 35%;
    right: 33%;
  }

  @media(width <= 768px) {
    top: 35%;
    right: 29%;
  }

  @media(width <= 480px) {
    top: 23%;
  }
}

.placemarkSch {
  top: 39%;
  right: 32%;

  @media (max-width: $lg) {
    top: clamp(26%, 3vw, 43%);
    right: clamp(33%, 3vw, 38%);
  }
}

.placemarkKsk {
  top: 31%;
  right: 14%;

  @media (max-width: $lg) {
    top: clamp(22%, 3vw, 32.5%);
    right: 25%;
  }
}

.placemarkNy {
  top: 38%;
  left: 14%;

  @media (max-width: $lg) {
    top: 40%;
    left: 18%;
  }

  @media (max-width: 1186px) {
    left: 19%;
  }

  @media (max-width: 1138px) {
    top: 41%;
    left: 21%;
  }

  @media(width <= 1024px) {
    top: 41%;
    left: 23%;
  }

  @media(width < 768px) {
    top: 28.5%;
  }

  @media(width <= 480px) {
    top: 24%;
    left: 20%;
  }

  @media (max-width: 442px) {
    left: 17%;
  }
}

.placemarkCh {
  top: 38%;
  left: 7%;

  @media (max-width: $lg) {
    top: 38%;
    left: 14%;
  }

  @media (max-width: 1186px) {
    left: 15%;
  }

  @media (max-width: 1138px) {
    top: 39%;
    left: 15%;
  }

  @media(width <= 1024px) {
    top: 39%;
    left: 18%;
  }

  @media(width < 768px) {
    top: 28.5%;
  }

  @media(width <= 480px) {
    top: 24%;
    left: 18%;
  }

  @media (max-width: 442px) {
    top: 22%;
    left: 14%;
  }
}

.placemarkNb {
  top: 43%;
  left: -2%;

  @media (max-width: $lg) {
    top: 43%;
    left: 9%;
  }

  @media (max-width: 1135px) {
    left: 10%;
  }

  @media (max-width: 1106px) {
    left: 11%;
  }

  @media (max-width: 1085px) {
    left: 12%;
  }

  @media(width <= 1024px) {
    top: 47%;
    left: 14%;
  }

  @media(width < 768px) {
    top: 35%;
  }

  @media(width <= 480px) {
    top: 27%;
    left: 13%;
  }

  @media (max-width: 442px) {
    left: 9%;
  }

  .placemarkCity {
    min-width: 150px;
  }
}

.placemarkHcm {
  top: 54%;
  right: 10%;

  @media (max-width: $lg) {
    top: 50%;
    right: 17.5%;
  }

  @media (max-width: 1197px) {
    right: 17%;
  }

  @media (max-width: 1178px) {
    right: 18%;
  }

  @media (max-width: 1124px) {
    right: 19.5%;
  }

  @media(width <= 1024px) {
    top: 53%;
    right: 21%;
  }

  @media(width <= 768px) {
    top: 40%;
    right: 18.5%;
  }

  @media (max-width: 683px) {
    top: 37%;
  }

  @media(width <= 480px) {
    top: 29.5%;
    right: 17%;
  }

  @media (max-width: 442px) {
    right: 19%;
  }

  @media (max-width: 360px) {
    top: 28%;
  }
}

.placemarkBtn.active {
  pointer-events: none;

  .placemarkCity {
    color: var(--blue);
  }
}
</style>
