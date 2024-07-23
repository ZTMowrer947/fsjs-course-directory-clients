import { inject } from 'vue';
import { createRouter } from 'vue-router';

import { credentialManagerKey } from './injectKeys';
import { dummyCredentialManager } from './lib/credential';
import SignInPage from './routes/(auth)/signin/SignInPage.vue';
import DetailPage from './routes/courses/[id]/DetailPage.vue';
import ListPage from './routes/courses/ListPage.vue';

type Routes = Parameters<typeof createRouter>[0]['routes'];

const routes: Routes = [
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
  {
    path: '/courses/:id',
    name: 'course-detail',
    component: DetailPage,
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignInPage,
    beforeEnter(_to, _from, next) {
      const credentialManager = inject(credentialManagerKey, dummyCredentialManager);

      if (credentialManager.get()) {
        next({ name: 'course-list' });
      } else {
        next();
      }
    },
  },
];

export default routes;
