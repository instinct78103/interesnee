<script setup>

import {useGlobalVar} from '@/composables/useGlobalVar.js';
const {spritePath} = useGlobalVar();

const contacts = [
  {
    'flag': 'ru',
    'city': 'Россия, Екатеринбург',
    'href': 'https://maps.app.goo.gl/HTsqPoDsGSkErSW8A',
    'address': 'пер. Красный, д. 5/1',
    'data_city': 'ekb',
  },
  {
    'flag': 'ru',
    'city': 'Россия, Сочи',
    'href': 'https://goo.gl/maps/zjoLkPpk86YnWuMt9',
    'address': 'ул. Невская, 23',
    'data_city': 'sochi',
  },
  {
    'flag': 'ru',
    'city': 'Россия, Красноярск',
    'href': 'https://maps.app.goo.gl/Ro2GWZBaUD6Zmw1C9',
    'address': 'ул. Красной армии, д. 10/5',
    'data_city': 'krs',
  },
  {
    'flag': 'kz',
    'city': 'Казахстан, Рудный',
    'href': 'https://maps.app.goo.gl/HnMBq97oQGtJdh2F6',
    'address': 'ул. Горняков, 70, оф. 422',
    'data_city': 'rudny',
  },
  {
    'flag': 'vn',
    'city': 'Vietnam, Ho Chi Minh',
    'href': 'https://maps.app.goo.gl/mUh8chAVG3zMdbMq9',
    'address': '7th Floor, Long Tower, 101 - 103 Nguyen Cuu Van St., Ward 17, Binh Thanh Dist, Ho Chi Minh City',
    'data_city': 'ho-chi-minh',
  },
];

const socialLinks = [
  {
    'href': 'https://t.me/interesnee_ru',
    'icon': 'tg',
  },
  {
    'href': 'https://vk.com/interesnee_ru',
    'icon': 'vk',
  },
  {
    'href': 'https://www.linkedin.com/company/interesnee-ru/',
    'icon': 'linkedin',
  },
];

</script>

<template>
  <footer class="site-footer">
    <div class="footer-container">
    <div class="office-locations">
      <p class="div-heading">Наши контакты</p>
      <ul class="scroll-snap">
        <li v-for="contact in contacts" :key="contact.href">
          <p><span class="flag" :class="contact.flag"></span>{{ contact.city }}</p>
          <a :href="contact.href" target="_blank">{{ contact.address }}</a>
        </li>
      </ul>
    </div>
    <div class="social-links">
      <p class="div-heading">Мы в социальных сетях</p>
      <ul>
        <li v-for="socialLink in socialLinks">
          <a :href="socialLink.href" target="_blank">
            <svg width="20" height="20"><use :href="`${spritePath}#icon-${socialLink.icon}`"></use></svg>
          </a>
        </li>
      </ul>
    </div>
    <div class="bottom">
      <p class="copyright">© 2006-{{ new Date().getFullYear() }} «Очень Интересно»</p>
      <p class="policy"><a href="/static/docs/privacy_policy.pdf">Политика обработки персональных данных</a></p>
    </div>
  </div>
  </footer>
</template>

<style>

</style>