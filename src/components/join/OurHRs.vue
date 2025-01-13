<template>
  <section :class="$style.section">
    <div :class="$style.container">
      <h2 :class="$style.title">Наши HR</h2>

      <div :class="$style.wrapper">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="$style.item"
        >
          <img
            v-if="item.image.x1"
            :class="$style.image"
            :src="item.image.x1"
            :srcset="getSrcSet(item.image)"
            :alt="item.name"
          >
          <p :class="$style.name">{{ item.name }}</p>
          <p
            :class="$style.post"
            v-html="item.post" />
          <div :class="$style.socialWrapper">
            <a
              v-for="(social, socialIndex) in item.social"
              :key="socialIndex"
              :class="$style.socialLink"
              :href="social.url"
              :aria-label="`Ссылка на социальную сеть ${social.url}`"
              target="_blank"
              rel="noreferrer noopener"
            >

              <svg :width="social.width" :height="social.height">
                <use :href="`${spriteSvg}#icon-${social.id}`"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <ContactsListBlock />
    </div>
  </section>
</template>

<script setup>
import { useRoute } from 'vue-router/auto';
import { computed } from 'vue';
// import BaseSlider from 'components/BaseSlider';
import ContactsListBlock from '@/components/ContactsListBlock.vue';
import { CAMP } from '@/router/index.js';
import { spriteSvg } from '@/helpers.js';

const route = useRoute();

const hrs = [
  {
    image: {
      x1: '/images/photos/HR/Valeriya@1x.jpg',
      x2: '/images/photos/HR/Valeriya@2x.jpg',
      placeholder: '/images/photos/Valeriya@1x.jpg',
    },
    name: 'Валерия',
    post: 'Красноярск',
    social: [
      {
        url: 'https://vk.com/id270358537',
        id: 'vk',
        width: '22',
        height: '13',
      },
      {
        url: 'tg://resolve?domain=VSGrishanova',
        id: 'tg',
        width: '18',
        height: '18',
      },
    ],
  },
  {
    image: {
      x1: '/images/photos/HR/Marina@1x.jpg',
      x2: '/images/photos/HR/Marina@2x.jpg',
      placeholder: '/images/photos/HR/Marina@1x.jpg',
    },
    name: 'Марина',
    post: 'Сочи',
    social: [
      {
        url: 'https://vk.com/marinapister',
        id: 'vk',
        width: '22',
        height: '13',
      },
      {
        url: 'tg://resolve?domain=MarinaPister',
        id: 'tg',
        width: '18',
        height: '18',
      },
    ],
  },
];

const items = computed(() => {
  const data = hrs;

  if (route.name !== CAMP) {
    data.push(hrEkb);
  } else {
    data[1].post = 'Сочи / Екатеринбург';
  }
  return data;
});

const hrEkb = {
  image: {
    x1: '/images/photos/HR/HR.jpg',
    x2: '/images/photos/HR/HR-1.jpg',
    placeholder: '/images/photos/HR/HR.jpg',
  },
  name: '',
  post: '',
  social: [],
};

function getSrcSet(image) {
  let srcset = image.x1 ? `${image.x1} 1x` : '';
  srcset += image.x2 ? `, ${image.x2} 2x` : '';

  return srcset;
}

// export default {
//   name: 'OurHRs',
//   components: {
//     BaseSlider,
//     ContactsListBlock,
//     SvgIcon,
//   },
//   data() {
//     return {
//       slickOpts: {
//         dots: false,
//         arrow: false,
//         slidesToShow: 4,
//         slidesToScroll: 4,
//         responsive: [
//           {
//             breakpoint: 767,
//             settings: {
//               arrows: false,
//               dots: true,
//               slidesToShow: 1,
//               slidesToScroll: 1,
//               dotsClass: this.$style.sliderDots,
//             },
//           },
//           {
//             breakpoint: 991,
//             settings: {
//               arrows: false,
//               dots: true,
//               slidesToShow: 2,
//               slidesToScroll: 2,
//               dotsClass: this.$style.sliderDots,
//             },
//           },
//         ],
//       },
//     };
//   },
//   computed: {
//     items() {
//       const data = hrs;
//
//       if (this.$route.name !== CAMP) {
//         data.push(hrEkb);
//       } else {
//         data[1].post = 'Сочи / Екатеринбург';
//       }
//       return data;
//     },
//   },
//   methods: {
//     getSrcSet(image) {
//       let srcset = image.x1 ? `${image.x1} 1x` : '';
//       srcset += image.x2 ? `, ${image.x2} 2x` : '';
//
//       return srcset;
//     },
//   },
// };
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

.row {
  display: flex;
  flex-wrap: wrap;
  margin-inline: calc(-1 * var(--grid-gutter))
}

.title {
  @extend %sectionTitle;
  margin: 0 0 clamp(30px, 5vw, 80px);
  text-align: center;
}

.wrapper {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
}

.item {
  padding: 0 15px;
  text-align: center;
  flex-basis: 33.3%;

  @media(width < 768px) {
    flex-basis: 100%;
  }
}

.image {
  width: 100%;
  margin-bottom: 20px;
}

.name {
  font-size: 16px;
  line-height: 30px;
  margin: 0;
  font-weight: 600;
  color: var(--red);
}

.post {
  font-size: 16px;
  line-height: 25px;
  margin: 0 0 10px;
  color: var(--blue);
}

.quote {
  font-size: 16px;
  line-height: 25px;
  margin: 0;
  color: var(--gray-dark);
}

.socialWrapper {
  display: flex;
  justify-content: center;
  align-items: center;

  @media(width  < 1024px) {
    margin-bottom: 17px;
  }
}

.socialLink {
  display: inline-flex;
  margin: 0 5px;

  &:hover {
    svg {
      fill: var(--red);
    }
  }
}

.socialLink svg {
  fill: var(--red-light);
  transition: fill 0.3s;
}
</style>
