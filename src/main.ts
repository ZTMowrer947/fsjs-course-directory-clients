import './style.css';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import { credentialManagerKey } from './injectKeys.ts';
import { CookieCredentialManager } from './lib/credential.ts';
import routes from './routes.ts';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const credentialManager = new CookieCredentialManager();

createApp(App).provide(credentialManagerKey, credentialManager).use(VueQueryPlugin).use(router).mount('#app');
