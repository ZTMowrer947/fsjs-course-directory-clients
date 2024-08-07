import './style.css';

import { useQueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { createApp, inject } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import { AuthFailError } from './entities/errors.ts';
import { credentialManagerKey } from './injectKeys.ts';
import { CookieCredentialManager, dummyCredentialManager } from './lib/credential.ts';
import routes from './routes.ts';
import { hydrateStoredUserOpts } from './routes/(auth)/queries/signin.ts';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const credentialManager = new CookieCredentialManager();

createApp(App).provide(credentialManagerKey, credentialManager).use(VueQueryPlugin).use(router).mount('#app');

router.beforeEach(async (to) => {
  // Get credential manager and query client
  const credentialManager = inject(credentialManagerKey, dummyCredentialManager);
  const queryClient = useQueryClient();

  // If the incoming navigation requires authentication,
  if (to.meta.requiresAuth) {
    // Ensure user exists before proceeding, otherwise redirect to user signin
    try {
      await queryClient.ensureQueryData(hydrateStoredUserOpts(credentialManager));
    } catch (error) {
      if (error instanceof AuthFailError) {
        return { name: 'signin' };
      } else {
        throw error;
      }
    }
  }
});
