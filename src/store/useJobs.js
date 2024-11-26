import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref([]);

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

  async function fetchJobs() {
    const url = 'https://api.resumatorapi.com/v1/jobs?apikey=4tWhJFtr8iWAl3VHxRc8HVIk0dSZEOBU';
    const data = await (await fetch(url)).json();
    jobs.value = getOpenJobs(filterDeprecatedJobs(data));
  }

  return {
    fetchJobs,
    jobs,
  };
});