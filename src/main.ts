import './style.css';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import App from './App.vue';
import ListPage from './routes/courses/ListPage.vue';

const routes = [
  {
    path: '/',
    redirect: {
      name: 'course-list',
    },
  },
  {
    path: '/courses',
    name: 'course-list',
    component: ListPage,
  },
] satisfies readonly RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(VueQueryPlugin).use(router).mount('#app');
