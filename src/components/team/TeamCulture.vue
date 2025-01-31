<template>
  <section :class="$style.section">
    <div :class="$style.container">
      <h2 :class="$style.title">Наша культура</h2>
      <div :class="$style.gallery">
        <div v-for="(image, index) in images" :key="image" :class="$style.photo">
          <img :src="image" :class="$style.galleryImage" alt="Culture photo" @click="openPopup(index)">
        </div>
      </div>
      <div :class="$style.actions">
        <button v-show="!expanded" :class="$style.button" @click="expanded = !expanded" aria-label="Показать все фото" type="button">Показать все</button>
      </div>
    </div>
  </section>
  <Dialog ref="dialog">
    <div v-for="(photo, index) in fullsizePhotos" :key="photo" class="sliderItem" :ref="(el) => photoSlidesRef[index] = el">
      <img :src="photo" alt="Culture photo">
    </div>
  </Dialog>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { full, previews } from '@/data/culture-photos';
import Dialog from '@/components/Dialog.vue';

const dialog = ref(null);
const photoSlidesRef = ref([]);
const showModal = () => dialog?.value?.showModal();

const expanded = ref(false);
const initialIndex = ref(0);
const previewPhotos = ref(previews);
const fullsizePhotos = ref(full);
const initialPhotos = computed(() => previewPhotos.value.slice(0, 8));
const images = ref(initialPhotos.value);

function openPopup(index) {
  showModal();
  initialIndex.value = index;
}

watch(expanded, newVal => images.value = newVal ? previewPhotos.value : initialPhotos.value);
watch(initialIndex, newVal => photoSlidesRef.value[newVal].scrollIntoView({
  inline: 'start',
  block: 'nearest',
}))

</script>

<style lang="scss" module>
@use '@/scss/helpers';

.section {
  @extend %section;
}

.container {
  @extend %container;
  max-width: 1140px;
}

.title {
  @extend %sectionTitle;
  margin-bottom: clamp(30px, 6vw, 60px);
  text-align: center;
}

.gallery {
  --gap: 15px;
  gap: var(--gap);
  min-height: 300px;
  columns: 260px;
}

.galleryImage {
  @extend %hoverBlock;
}

.photo {
  display: flex;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;

  & + .photo {
    margin-top: var(--gap);
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 4px;
    transition: all 0.4s ease-in-out;
    object-fit: cover;
  }
}

.loader {
  z-index: 4;
  width: 100%;
  height: 100%;
}

.actions {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

.button {
  @extend %button;
  padding-block: clamp(15px, 5vw, 20px);
}
</style>

<style lang="scss">
dialog {
  .dialog--wrap {
    display: flex;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    overflow-x: auto;
    scrollbar-width: none;

    > * {
      outline: none;
      display: flex;
      align-items: center;
      justify-content: center;
      scroll-snap-align: start;
      scroll-snap-stop: always;
      width: 90cqmin;
    }
  }
}
</style>
