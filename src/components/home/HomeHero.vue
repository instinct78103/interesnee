<template>

  <background-animation ref="hero" :class="$style.root">
    <div :class="$style.row">
      <BaseSlider :options="{ arrows: false, fade: true, autoplay: true, autoplaySpeed: 3000 }">
        <template v-slot="{ activeSlide, activeClass }">
          <div v-for="(item, index) in heroSlides" :key="index" :class="[$style.heroItemWrapper, {[activeClass]: index === activeSlide}]">
            <div :class="$style.heroItem">
              <router-link :to="item.to" :class="$style.heroLink">
                <h2 :class="$style.heroTitle" v-html="item.title" />
                <p :class="$style.heroText" v-html="item.text" />
              </router-link>
            </div>
          </div>
        </template>
      </BaseSlider>
    </div>

    <router-link :to="projectsUrl" :class="$style.heroLink">
      <div :class="$style.row">
        <div :class="$style.heroService">
          <div v-for="(item, index) in activities" :key="index" :class="$style.heroServiceItem">
            <img :class="$style.heroServiceImg" :src="`/static/${item.icon}`" :alt="item.text" decoding="async">
            <p :class="$style.heroServiceText">{{ item.text }}</p>
          </div>
        </div>
      </div>
    </router-link>
  </background-animation>

</template>

<script setup>
import { PAGE_PROJECTS, PAGE_TEAM } from '@/router/index.js';
import BackgroundAnimation from '@/components/home/BackgroundAnimation.vue';
import BaseSlider from '@/components/BaseSlider.vue';

defineProps({
  activeClass: String,
});

const heroSlides = [
  {
    title: '<span>Очень Интересные</span> проекты',
    text: 'Чистый код и красивые решения',
    to: PAGE_PROJECTS,
  },
  {
    title: '<span>Отличная</span> команда',
    text: 'Растем вместе!',
    to: PAGE_TEAM,
  },
  {
    title: '<span>Широка</span> география',
    text: 'Работаем в Европе, Азии и Америке. <br>200 профессионалов в 8 офисах по всему миру',
    to: PAGE_TEAM,
  },
  {
    title: '<span>Обмен</span> опытом',
    text: '18 лет успеха, свыше 2070 выполненных проектов, <br>200 профессионалов в 8 офисах по всему миру',
    to: PAGE_PROJECTS,
  },
  {
    title: '<span>Преимущества</span> роста',
    text: 'Хорошая зарплата, индивидуальный план роста для каждого, бонусы, вечеринки и вкусный кофе!',
    to: PAGE_TEAM,
  },
];

const activities = [
  { icon: 'ic_design.svg', text: 'Дизайн' },
  { icon: 'ic_mob_apps.svg', text: 'Приложения' },
  { icon: 'ic_web.svg', text: 'WEB' },
];

const projectsUrl = PAGE_PROJECTS;

</script>

<style lang="scss" module>
@import '@/scss/helpers';

.root {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: clamp(431px, 5vw, 687px);
  padding: 146px 0 64px;
  background-color: var(--red-dark);

  @media(width < 768px) {
    padding: 105px 10px 72px;
  }
}

.row {
  position: relative;
  z-index: 1;
  padding: 20px 0;
}

.heroItemWrapper {
  text-align: center;
}

.heroItem {
  position: relative;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  padding: 20px 30px 30px;

  @media(width < 768px) {
    padding: 20px;
  }
}

.heroItem::after,
.heroItem::before {
  content: '';
  position: absolute;
  width: 42px;
  height: 36px;
}

.heroItem::after {
  top: 0;
  left: 0;
  border-top: 1px solid #fff;
  border-left: 1px solid #fff;
}

.heroItem::before {
  bottom: 0;
  right: 0;
  border-right: 1px solid #fff;
  border-bottom: 1px solid #fff;
}

.heroTitle {
  margin: 0;
  padding-bottom: 10px;
  font-size: clamp(26px, 3vw, 40px);
  line-height: 1.38;
  font-weight: 300;
  color: #fff;
}

.heroTitle span {
  font-weight: 700;
}

.heroText {
  margin: 0;
  font-size: clamp(18px, 3vw, 22px);
  line-height: 1.2;
  color: var(--gray);
}

.heroService {
  display: flex;
  justify-content: center;
}

.heroServiceItem {
  margin: 0 clamp(10px, 3vw, 20px);
  text-align: center;
}

.heroServiceImg {
  @media(width < 768px) {
    width: 50px;
  }
}

.heroServiceText {
  margin: 0;
  font-size: clamp(12px, 3vw, 14px);
  line-height: 2.14;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
}

.heroLink {
  cursor: pointer;
  text-decoration: none;
}
</style>