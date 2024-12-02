import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref([]);
  const cities = ref([])

  const deprecatedJobs = [
    'Unreal Engine developer (RU)',
    'QA Engineer (auto) (RU)',
    'JS - Frontend developer Junior (RU)',
    'Accountant (RU)',
    'Frontend developer - HTML/CSS/JS (RU)',
    'Frontend developer - HTML/CSS/JS (part time) (RU)',
  ];

  function filterDeprecatedJobs(jobs) {
    return jobs.filter(job => deprecatedJobs.indexOf(job.title) === -1);
  }

  function getOpenJobs(jobs) {
    const openJobs = [];
    jobs.forEach(job => {
      if (!job.internal_code.endsWith('_hidden')) {
        openJobs.push(job);
      }
    });

    return openJobs;
  }

  function citySlug(name) {
    return name
      .trim()
      .toLowerCase()
      .replace(/\s/g, '-');
  }

  function translateCity(name) {
    const cities = {
      Ekaterinburg: 'Екатеринбург',
      Krasnoyarsk: 'Красноярск',
      Sochi: 'Сочи',
    };

    return cities[name] || null;
  }

  function initializeCities(cities) {
    return cities.map(city => ({
      name: city,
      nameRU: translateCity(city),
      url: citySlug(city),
    }));
  }

  function filterDisallowedCities(cities) {
    const allowedCities = ['Ekaterinburg', 'Krasnoyarsk', 'Sochi'];

    return cities.filter(city => allowedCities.includes(city.name));
  }

  function parseCites(jobs) {
    let cities = [];
    jobs.forEach(e => {
      const jobCities = e.city.split(', ');
      cities = cities.concat(jobCities);
    });

    const uniqueCities = cities.filter(
      (item, pos) => cities.indexOf(item) === pos,
    );

    const allCities = initializeCities(uniqueCities);

    return filterDisallowedCities(allCities);
  }


  async function fetchJobs() {
    const url = 'https://api.resumatorapi.com/v1/jobs?apikey=4tWhJFtr8iWAl3VHxRc8HVIk0dSZEOBU';
    const data = await (await fetch(url)).json();
    jobs.value = getOpenJobs(filterDeprecatedJobs(data));
    cities.value = parseCites(jobs.value)
  }

  return {
    cities,
    fetchJobs,
    jobs,
  };
});