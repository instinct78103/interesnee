<template>
  <section :class="$style.section">
    <div :class="$style.container">

      <RotatedHeading :class="$style.heading">
        <h3>Команда</h3>
      </RotatedHeading>

      <div
        v-if="headingItem"
        :class="$style.headingMobile"
      >
        <p :class="$style.title">{{ headingItem.title }}</p>
        <p :class="$style.text">{{ headingItem.text }}</p>
      </div>

      <div :class="$style.row">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="[$style.col, {[$style.colOffer]: item.heading}]">
          <div :class="[$style.item, {[$style.itemOffer]: item.heading}]">
            <template v-if="!item.heading">
              <img
                v-if="item.src"
                :class="$style.image"
                :src="item.src"
                decoding="async"
                alt="">
              <svg
                v-svg
                v-else
                :class="$style.icon"
                :symbol="`icon-rounded-${item.icon}`"
              />
              <p :class="$style.post">{{ item.post }}</p>
              <p :class="[$style.text, $style.count]">
                <span>
                  <b>Команда</b><br>{{ item.count }}
                </span>
              </p>
            </template>
            <template v-else>
              <p :class="$style.title">{{ item.title }}</p>
              <p :class="$style.text">{{ item.text }}</p>
            </template>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
import RotatedHeading from 'components/RotatedHeading';

export default {
  name: 'TeamTeam',
  components: {
    RotatedHeading,
  },
  data() {
    return {
      items: [
        {
          src: '/static/python.svg',
          post: 'Python',
          count: '14 человек',
        },
        {
          src: '/static/js.svg',
          post: 'Front-end',
          count: '24 человека',
        },
        {
          src: '/static/net.svg',
          post: '.Net',
          count: '20 человек',
        },
        {
          src: '/static/qa.svg',
          post: 'QA',
          count: '14 человек',
        },
        {
          src: '/static/unity.svg',
          post: 'Unity',
          count: '18 человек',
        },
        {
          src: '/static/mobile.svg',
          post: 'Mobile',
          count: '10 человек',
        },
        {
          heading: true,
          title: 'Наша команда разработки',
          text:
            'У нас работают талантливые разработчики, архитекторы, проектировщики, менеджеры, дизайнеры, инженеры,' +
            'тестировщики, использующие новые технологии в реальных проектах, которые мы создаем с нуля. Присоединяйся!',
        },
        {
          src: '/static/php.svg',
          post: 'PHP',
          count: '17 человек',
        },
        {
          src: '/static/3d.svg',
          post: '3D',
          count: '4 человека',
        },
        {
          src: '/static/devops.svg',
          post: 'DevOps',
          count: '10 человек',
        },
        {
          src: '/static/ui-ux.svg',
          post: 'UI/UX Design',
          count: '7 человек',
        },
      ],
    };
  },
  computed: {
    headingItem() {
      return this.items.find(obj => obj.heading);
    },
  },
};
</script>

<style lang="scss" module>
@import '../styles/variables';
@import '../styles/helpers';

.section {
  @extend %section;

  &::after {
    display: none;
  }
}

.container {
  @extend %container;
  max-width: 1170px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -$grid-gutter;
  margin-right: -$grid-gutter;

  @include media('<=phone') {
    margin-left: -$grid-gutter-mobile/2;
    margin-right: -$grid-gutter-mobile/2;
  }
}

.section .heading {
  max-width: 1140px;
}

.col {
  width: 25%;
  padding: $grid-gutter;

  @include media('<desktop') {
    width: 33.33%;
  }

  @include media('<tablet') {
    width: 50%;
    padding: $grid-gutter-mobile/2;
  }
}

.colOffer {
  width: 50%;

  @include media('<desktop') {
    width: 66.66%;
    order: -1;
  }

  @include media('<tablet') {
    display: none;
  }
}

.item {
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: center;
  height: 263px;
  padding: 30px;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  box-shadow: inset 0 0 1px 0 rgba(139, 139, 139, 0.5);
  position: relative;
  overflow: hidden;

  @include media('<=phone') {
    height: 170px;
    padding: 10px;
  }

  &:hover .count {
    visibility: visible;
    opacity: 1;
  }
}

$team-offer-background: #fff2f2;

.itemOffer {
  display: block;
  padding: 8.1%;
  border: 2px solid $red-light;
  text-align: left;
}

.icon,
.image {
  width: 35px;
  height: 35px;
  margin-bottom: 30px;
}

.icon {
  fill: $red-light;
}

.post {
  @include set-fz-lh(16, 30);
  font-weight: 600;
  color: $red;
  text-align: center;
  margin: 0;

  @include media('<=phone') {
    @include set-fz-lh(15, 21);
  }
}

.headingMobile {
  display: none;

  @include media('<=tablet') {
    display: block;
    margin-bottom: 28px;
    text-align: left;
  }
}

.title {
  @include set-fz-lh(24, 30);
  color: $red;
  margin: 0 0 13px;
}

.text {
  @include set-fz-lh(16, 25);
  color: $gray-dark;
  opacity: 0.8;
  margin: 0;
}

.count {
  @include media('>desktop') {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $red-transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s;
    color: $white;
  }

  @include media('<=desktop') {
    b,
    br {
      display: none;
    }
  }

  span {
    text-align: center;
  }
}
</style>
