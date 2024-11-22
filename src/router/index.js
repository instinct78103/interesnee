import { useProjectsStore } from '@/store/useProjects.js';
import { createRouter, createWebHistory } from 'vue-router';
import { storeToRefs } from 'pinia';
import { routes } from 'vue-router/auto-routes';

export const PAGE_PROJECTS = 'projects';
export const PAGE_TEAM = 'team';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0 }),
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
  }

  next();
});

export { router };