<script setup>

import { onMounted, onUnmounted, ref } from 'vue';

const dialog = ref();

const showModal = () => dialog.value?.showModal();

defineExpose({
  showModal,
});

function backdropClick (e) {
  if (e.target.closest('dialog') && !e.target.closest('form[method="dialog"]')) {
    document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
  }
}

onMounted(() => document.addEventListener('click', backdropClick));
onUnmounted(() => document.removeEventListener('click', backdropClick))

</script>

<template>
  <dialog ref="dialog">
    <form method="dialog">
      <button>
        <svg class="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512">
          <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"></polygon>
        </svg>
      </button>
      <div class="dialog--wrap">
        <slot />
      </div>
    </form>
  </dialog>
</template>

<style lang="scss">

dialog {
  overscroll-behavior: contain;
  max-width: 90cqmin;
  margin: auto;
  border: none;
  inset: 0;
  transition: transform 0.3s ease-in-out;
  padding: 0;
  background-color: transparent;
  overflow-y: hidden;


  &::backdrop {
    background-color: rgb(0, 0, 0, 0.5);
  }

  form[method='dialog'] {
    padding: 30px;
    border: none;

    > * {
      outline: none;
    }

    > button {
      position: absolute;
      top: 0;
      right: 0;
      height: 30px;
      width: 30px;
      aspect-ratio: 1 / 1;
      background: hsla(0, 0%, 80%, .5);
      border: none;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        cursor: pointer;
      }

      svg {
        fill: #fff;
      }
    }
  }
}

.sliderItem {
  img {
    object-fit: contain;
    display: block;
    width: inherit;
  }
}
</style>