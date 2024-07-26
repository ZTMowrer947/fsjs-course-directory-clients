import './style.css';

import { useQueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import { createApp, inject } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import { credentialManagerKey } from './injectKeys.ts';
import { CookieCredentialManager, dummyCredentialManager } from './lib/credential.ts';
import routes from './routes.ts';
import { getUserFromStoredCredentials } from './routes/(auth)/queries.ts';
import { userKeys } from './routes/(auth)/queryKeys.ts';

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
    const user = await queryClient.ensureQueryData({
      queryKey: userKeys.user,
      queryFn: () => getUserFromStoredCredentials(credentialManager),
    });

    if (!user) {
      return { name: 'signin' };
    }
  }
});
