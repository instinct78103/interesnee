<template>
  <section :class="[$style.root, $style.background]">
    <div :class="$style.container">

      <RotatedHeading>
        <h3>Наши офисы</h3>
      </RotatedHeading>

      <div :class="$style.wrapper">
        <h2 :class="$style.subHeading">Мы находимся в нескольких городах</h2>

        <button
          v-for="(item, key) in offices"
          :key
          :class="[$style.placemarkBtn, item.className, {[$style.active]: selected === item.value, }, officeClasses[item.value]]"
          :aria-label="`Перейти на город ${item.city}`"
          @click="setActiveMarker(item.value, key)"
        >
          <HomeMapMark :is-active="selected === item.value" />
          <span :class="$style.placemarkCity">{{ item.city }}</span>
        </button>
      </div>

    </div>

    <div :class="$style.bottomLine">
      <OfficeSlider
        :office="offices"
        :current-slider="currentSlide"
      />
    </div>
  </section>
</template>

<script setup>
import RotatedHeading from '@/components/RotatedHeading.vue';
import HomeMapMark from '@/components/home/HomeMapMark.vue';
import OfficeSlider from '@/components/OfficeSlider.vue';
import { offices } from '@/data/commonInfo.js';
import $style from '@/components/home/HomeMap.module.scss';
import { nextTick, ref } from 'vue';

const selected = ref('ekb');
const currentSlide = ref(0);
const showOffice = ref(false);

const officeClasses = {
  ch: $style.placemarkCh,
  ekb: $style.placemarkEkb,
  hcm: $style.placemarkHcm,
  ksk: $style.placemarkKsk,
  nb: $style.placemarkNb,
  ny: $style.placemarkNy,
  rdn: $style.placemarkRdn,
  sch: $style.placemarkSch,
};

function sliderChanged(index) {
  setSelected(offices[index].value);
}

function setSelected(value) {
  showOffice.value = false;
  selected.value = value;
  nextTick().then(() => {
    showOffice.value = true;
  });
}

function setActiveMarker(value, index) {
  setSelected(value);
  currentSlide.value = Number(index);
}

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

<style lang="scss" module></style>
