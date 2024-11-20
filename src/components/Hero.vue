<template>
  <div :class="[$style.root, { [$style.small]: kind === 'small' }, { [$style.empty]: kind === 'empty' } ]">
    <h1
      v-if="kind !== 'empty'"
      :class="[$style.heading, { [$style.smallHeading]: kind === 'small' } ]">
      <slot />
    </h1>
  </div>
</template>
<script setup>

defineProps({
  kind: {
    type: String,
    default: 'default',
  },
});

</script>

<style lang="scss" module>
@import '@/scss/helpers';

.root {
  min-height: 465px;
  background: url('/static/back-image.png') no-repeat center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  @media(width <= 480px) {
    min-height: 336px;
  }
}

.small {
  min-height: 145px;
  padding-top: clamp(40px, 4vw, 67px);
}

.empty {
  background: var(--red-dark);
  height: clamp(40px, 4vwm, 67px);
  min-height: 0;
}

.heading {
  color: #fff;
  font-size: clamp(26px, 4vw, 40px);
  font-weight: normal;
  line-height: 1.4;
  text-align: center;
}

.smallHeading {
  font-size: clamp(20px, 4vw, 32px);
}

em {
  display: inline-block;
  background-color: var(--blue-deep);
  vertical-align: middle;
  line-height: 1.2;
  padding: 0 0 6px 12px;
  margin-left: 5px;
  font-weight: 100;
  font-style: normal;

  &:last-child {
    margin-right: 5px;
    padding-right: 12px;
  }
}

em + em {
  margin-left: 0;
  padding-left: 0;
}
</style>
