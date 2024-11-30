<script setup>

import {ref} from 'vue';

const dialog = ref();
const isOpen = ref(true)

const showModal = () => {
  dialog.value?.showModal();
  isOpen.value = true;
};

defineExpose({
  showModal,
})

</script>

<template>
  <dialog ref="dialog" @close="isOpen = false" :open="isOpen">
    <form method="dialog" v-if="isOpen">
      <button><svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"></polygon></svg></button>
      <slot />
    </form>
  </dialog>
</template>

<style lang="scss">

dialog {
  min-width: 100vw;
  min-height: 100vh;
  top: 0;
  position: fixed;
  overscroll-behavior: contain;
  z-index: 999;
  outline: none;

  form[method="dialog"] {
    width: min(90vw, 1440px);
    border-radius: 48px;
    position: relative;
    max-height: 90vh;
    margin-block: auto;
  }
}

</style>