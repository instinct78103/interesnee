<template>
  <div>
    <div :class="$style.subscribeWrapper">
      <input
        v-validate="'required|email'"
        :class="[
          $style.subscribeField,
          $style.input,
          {[$style.whiteField]: kind ==='white' },
          {[$style.error]: errors.has('submitEmail') }
        ]"
        v-model="submitEmail"
        name="submitEmail"
        type="email"
        placeholder="E-mail"
      >

      <button
        :class="$style.subscribeButton"
        @click="subscribe"
      >
        Отправить
      </button>
    </div>
    <div :class="$style.detail">
      <transition name="slide-top">
        <div
          v-show="errors.has('submitEmail')"
          :class="$style.errors"
        >
          {{ errors.first('submitEmail') }}
        </div>
      </transition>

      <transition name="slide-top">
        <div
          v-show="subscribeMessage"
          :class="$style.subscribeMessage"
        >
          {{ subscribeMessage }}
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import { sendSubscribe } from 'data';

export default {
  name: 'SubscribeEmail',
  props: {
    kind: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      submitEmail: null,
      subscribeMessage: '',
    };
  },
  created() {
    this.$validator.localize('ru', {
      attributes: {
        submitEmail: 'E-mail',
      },
    });
  },
  methods: {
    subscribe() {
      this.subscribeMessage = '';
      this.$validator.validateAll().then(result => {
        if (result) {
          sendSubscribe(this.submitEmail);
          this.submitEmail = '';
          this.subscribeMessage = 'Вы успешно подписались.';
          this.$nextTick(() => this.$validator.reset());
          setTimeout(() => {
            this.subscribeMessage = '';
          }, 3000);
        }
        return false;
      });
    },
  },
};
</script>
<style lang="scss" module>
@import '../styles/variables';
@import '../styles/mixins';
@import '../styles/helpers';

$text-field-color: rgba($white, 0.8);

.subscribeWrapper {
  display: flex;
  justify-content: center;
}

.subscribeField {
  @include set-fz-lh(12, 17);
  font-family: $default-font-stack;
  color: $text-field-color;
  padding: 13px 23px;
  border: 0;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  outline: none;
  background-color: $black-2;
  transition: background 0.3s;

  @include on-event {
    background-color: $black;
    color: $white;
  }
}

.whiteField {
  @include placeholder($red-light);
  color: $red-light;
  border: 2px solid $red-light;
  outline: none;
  background-color: $transparent;

  @include media('<=phone') {
    width: 100%;
  }

  @include on-event {
    background-color: $transparent;
    color: $red;
    border-color: $red;
  }
}

.subscribeButton {
  @extend %button;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.input.error {
  border-color: $red-light;
}

.detail {
  height: 40px;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @include media('<=phone') {
    left: $grid-gutter-mobile;
  }
}

.errors {
  @include set-fz-lh(12, 14);
  padding-top: 8px;
  color: $red-light;
}

.subscribeMessage {
  @include set-fz-lh(12, 14);
  padding-top: 8px;
  color: $green-light;

  @include media('<=phone') {
    left: $grid-gutter-mobile;
  }
}
</style>

<style lang="scss">
/* stylelint-disable */
.slide-top-enter-active,
.slide-top-leave-active {
  opacity: 1;
  transform: translateY(0);
  transition: transform 0.3s, opacity 0.5s;
}
.slide-top-enter,
.slide-top-leave-to {
  transform: translateY(-30px);
  opacity: 0;
}
</style>
