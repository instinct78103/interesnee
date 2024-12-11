<template>

  <Hero>Найди лучшую работу<em>в твоей жизни</em></Hero>

  <section :class="$style.container">
    <h2 :class="$style.heading">Карьера</h2>
    <ul :class="$style.buttonsList">
      <li v-for="(city, index) in cities" :key="index">
        <router-link :to="{ path: '/join', query: { city: city.url }}" :class="[$style.button, {[$style.buttonActive]: currentCity === city.url }, 'hover-scale']">
          {{ city.nameRU }}
        </router-link>
      </li>

    </ul>
    <ul v-if="renderJobs" :class="$style.list">
      <li
        v-for="job in filteredJobs"
        :key="job.id"
        :class="$style.listItem"
      >
        <div :class="[ $style.item, { [$style.closed]: isJobClosed(job.status) } ]">
          <router-link
            :to="{ path: '/job', query: { city: job.url, job: job.board_code }}"
            :class="$style.link"
          >
            <div :class="$style.title">{{ job?.title?.replace('(RU)', '') }}</div>
            <span :class="$style.linkText">
                Подробнее
              </span>
          </router-link>
        </div>
      </li>
    </ul>
  </section>

  <OurHRs />
</template>

<script setup>
import Hero from '@/components/Hero.vue';
import OurHRs from '@/components/join/OurHRs.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router/auto';
import { useJobsStore } from '@/store/useJobs.js';
import { storeToRefs } from 'pinia';

const route = useRoute();
const { jobs, cities } = storeToRefs(useJobsStore());

if (!jobs.value.length) {
  const { fetchJobs } = useJobsStore();
  fetchJobs();
}

const jobStatuses = {
  open: 'Open',
  onHold: 'On Hold',
  approved: 'Approved',
  needsApproval: 'Needs Approval',
  drafting: 'Drafting',
  filled: 'Filled',
  cancelled: 'Cancelled',
  closed: 'Closed',
};

const currentCity = computed(() => route.query.city || 'ekaterinburg');
const renderJobs = computed(() => !!currentCity.value);

function isJobClosed(status) {
  return status === jobStatuses.closed;
}

const filteredJobs = computed(() => {

  if (cities.value.length === 0) {
    return false;
  }

  const currentCityUrl = (route.query.city || 'ekaterinburg');

  const currentCity = cities.value.filter(city => city.url === currentCityUrl)[0].name;

  const filteredJobs = [...jobs.value];
  const newFilteredJobs = filteredJobs.filter(job => job.city.split(', ').includes(currentCity));

  const openJobs = newFilteredJobs.filter(job => !isJobClosed(job.status));

  const closedJobs = newFilteredJobs.filter(job => isJobClosed(job.status));

  return openJobs.concat(closedJobs);
});
</script>

<style lang="scss" module>
@import '@/scss/helpers';

.container {
  @extend %container;
  @extend %section;
  padding-bottom: 160px;
  border-bottom: 0;
}

.heading {
  @extend %heading;
  text-align: center;
}

.list {
  display: flex;
  flex-flow: row wrap;
  list-style-type: none;
  padding: 0;
  margin: 0 -1%;
  animation: fadeEff 0.3s;
}

.listItem {
  flex-basis: 33.33%;
  padding: clamp(5px, 4vw, 15px);

  @media(width < 1024px) {
    flex-basis: 50%;
  }

  @media(width < 768px) {
    flex-basis: 100%;
  }
}

.item {
  $shadow: rgba(2, 2, 2, 0.25);
  height: 172px;
  border: 1px solid var(--gray-2);
  border-radius: 4px;
  background-color: #fff;
  box-shadow: inset 0 1px 2px 0 $shadow;
  overflow: hidden;
  transition: border 0.3s, background 0.3s, box-shadow 0.3s;
  position: relative;

  @media(width < 768px) {
    height: 80px;
  }

  &:hover {
    border-color: var(--red-light);
    background-color: var(--white-gray);

    .title {
      @media(width < 768px) {
        color: var(--red-light);
      }
    }
  }
}

.closed {
  background-color: #bdbdbd;

  &:hover {
    border-color: #808080;
    background-color: #bdbdbd;
  }
}

.link {
  @extend %hoverBlock;

  width: 100%;
  height: 100%;
  text-decoration: none;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;

  @media(width < 768px) {
    padding: 10px 40px;

    .linkText {
      opacity: 0;
    }
  }
}

.linkText {
  opacity: 0;
  font-size: 12px;
  line-height: 17px;
  font-weight: 600;
  margin-top: 15px;
  letter-spacing: 0.75px;
  text-transform: uppercase;
  color: var(--red-light);
  text-decoration: none;

  @media(width < 768px) {
    position: absolute;
    opacity: 0;
    margin-top: 0;
  }
}

.title {
  font-size: 24px;
  line-height: 30px;
  color: var(--gray-dark);
  margin-top: 32px;
  transition: opacity 0.3s;

  @media(width < 768px) {
    margin-top: 0;
    font-size: 20px;
    line-height: 26px;
  }
}

.buttonsList {
  display: flex;
  justify-content: center;
  margin-bottom: 65px;
  list-style-type: none;
  padding: 0;
  flex-wrap: wrap;

  @media(width < 1024px) {
    justify-content: center;
  }
}

.button {
  text-decoration: none;
  margin: 0 15px;
  padding: 15px 25px;
  border: 2px solid transparent;
  border-radius: 50px;
  outline: none;
  background-color: transparent;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  color: var(--gray-3);
  text-transform: uppercase;
  cursor: pointer;
  transition: color 0.3s, border 0.3s;
  display: block;
  margin-bottom: 10px;

  @media(width < 768px) {
    padding: 10px 12px;
    margin: 0 5px;
  }

  &:hover {
    //color: darken(var(--gray-3), 10%);
    color: oklch(from var(--gray-3) 10% c h);
  }
}

.buttonActive {
  border: 2px solid var(--red-light);
  border-radius: 50px;
  color: var(--red-light);

  &:hover {
    //$red-light-darken: darken(#f75050, 10%);

    color: oklch(from #f75050 10% c h);
    border-color: oklch(from #f75050 10% c h);
  }
}

@keyframes fadeEff {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
