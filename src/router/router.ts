import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/pages/pokemon-list/index.vue'),
        },
        {
            path: '/pokemon/:id(\\d+)',
            component: () => import('@/pages/pokemon-detail/index.vue'),
        },
    ],
});

export default router;