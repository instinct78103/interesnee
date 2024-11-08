<template>
  <div :class="$style.root">
    <p :class="$style.title">
      Узнать больше
    </p>
    <SubscribeEmail kind="white" />
  </div>
</template>

<script>
import SubscribeEmail from 'components/SubscribeEmail';

export default {
  name: 'ProjectsMore',
  components: {
    SubscribeEmail,
  },
};
</script>

<style lang="scss" module>
@import '../styles/variables';
@import '../styles/mixins';
@import '../styles/helpers';

$text-field-color: rgba($white, 0.8);

.root {
  @extend %section;

  padding-top: 0;
  text-align: center;

  @include media('<=phone') {
    padding: 40px $grid-gutter-mobile;
  }
}

.title {
  @include set-fz-lh(18, 24);
  margin: 0;
  margin-bottom: 15px;
  color: $red-light;
}
</style>
