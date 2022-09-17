import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/Dashboard.vue'),
    children: [
      {
        path: 'cartvue2',
        component: () => import('../views/CartVue2.vue'),
      },
      {
        path: 'cartvue3',
        component: () => import('../views/CartVue3.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
