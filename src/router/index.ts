import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: () => import('@/views/pokemon-list/index.vue'),
			name: 'pokemon.list',
		},
		{
			path: '/pokemon/:id(\\d+)',
			component: () => import('@/views/pokemon-detail/index.vue'),
			name: 'pokemon.detail',
		},
	],
});

export default router;


