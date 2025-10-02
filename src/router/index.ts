import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:page(\\d+)?',
      component: () => import('@/pages/pokemon-list/index.vue'),
      name: 'pokemon.list',
    },
    {
      path: '/pokemon/:id(\\d+)',
      component: () => import('@/pages/pokemon-detail/index.vue'),
      name: 'pokemon.detail',
    },
  ],
});

export default router;
