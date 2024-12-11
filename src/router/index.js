import { useProjectsStore } from '@/store/useProjects.js';
import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';
import { routes } from 'vue-router/auto-routes';
import { useJobsStore } from '@/store/useJobs.js';

export const PAGE_PROJECTS = 'projects';
export const PAGE_TEAM = 'team';
export const CAMP = 'CAMP';
export const JOB = 'JOB';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // If there's a saved position, restore it (e.g., when navigating back/forward)
      return savedPosition;
    }

    if (to.path !== from.path) {
      // If the path changes, scroll to the top
      return { top: 0 };
    }

    // If only query params changed, retain the current position
    return false;
  },
  linkActiveClass: 'active',
  routes,
});

router.beforeEach(async (to, from, next) => {

  // console.log('To route name:', to.name);
  // console.log('All routes:', router.options.routes);

  const { projects, currentProject } = storeToRefs(useProjectsStore());

  if (to.params.project) {

    const { fetchProjects, updateCurrentProject } = useProjectsStore();

    if (!projects.value.length) {
      await fetchProjects();
    }

    await updateCurrentProject(to.params.project);

    if (!currentProject.value) {
      return next('/not-found');
    }
  } else if (to.query.job || to.name === '/job') {

    const { allowedCities, jobs } = storeToRefs(useJobsStore());

    if (!jobs.value.length) {
      const { fetchJobs } = useJobsStore();
      await fetchJobs();
    }

    if (!jobs.value.find(job => job.board_code === to.query.job
      && allowedCities.value.some(city => job.city.toLowerCase().split(', ').includes(city)))) {
      return next('/not-found');
    }
  }

  next();
});

export { router };