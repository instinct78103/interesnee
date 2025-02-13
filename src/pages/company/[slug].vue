<script setup>
import { useRoute } from 'vue-router/auto';
import { computed } from 'vue';
import Hero from '@/components/Hero.vue';
import { companyInfo, companyFields } from '@/data/companyInfo.js';

const route = useRoute();
const city = computed(() => route.params.slug);
const info = computed(() => companyInfo[city.value])
</script>

<template>
    <Hero><strong>Работать с нами</strong> <em>Очень Интересно</em></Hero>
    <div :class="$style.section">
      <div :class="$style.container">
        <ul :class="$style.companyInfo">
          <li v-for="(item, key) in info" :key>
            <p :class="$style.key">{{companyFields.find(field => field.key === key).title}}:</p>
            <p :class="$style.value">{{item}}</p>
          </li>
        </ul>
      </div>
    </div>
</template>

<style lang="scss" module>
@use '@/scss/helpers';

.section {
  @extend %section;
}

.container {
  @extend %container;
  max-width: 1140px;
}

.companyInfo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(10px, 3vw, 20px);

  > li {
    display: grid;
    grid-column: span 2;
    text-wrap: balance;
    align-items: baseline;

    @media(width > 480px) {
      grid-template-columns: subgrid;
    }
  }

  .key {
    font-size: clamp(20px, 4vw, 24px);
    line-height: 1.3;
    color: var(--red);
  }

  .value {
    font-size: 16px;
    line-height: 1.3;
    color: var(--gray-dark);
  }
}
</style>
