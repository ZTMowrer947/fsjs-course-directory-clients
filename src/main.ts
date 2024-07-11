import './style.css';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import routes from './routes.ts';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(VueQueryPlugin).use(router).mount('#app');
