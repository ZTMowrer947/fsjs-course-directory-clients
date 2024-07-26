import { inject } from 'vue';
import { createRouter } from 'vue-router';

import { credentialManagerKey } from './injectKeys';
import { dummyCredentialManager } from './lib/credential';
import SignInPage from './routes/(auth)/signin/SignInPage.vue';
import SignUpPage from './routes/(auth)/signup/SignUpPage.vue';
import DeletePage from './routes/courses/[id]/delete/DeletePage.vue';
import DetailPage from './routes/courses/[id]/DetailPage.vue';
import CreatePage from './routes/courses/create/CreatePage.vue';
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
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/courses/new',
    name: 'create-course',
    component: CreatePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/courses/:id',
    name: 'course-detail',
    component: DetailPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/courses/:id/delete',
    name: 'delete-course',
    component: DeletePage,
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpPage,
    beforeEnter(_to, _from, next) {
      const credentialManager = inject(credentialManagerKey, dummyCredentialManager);

      if (credentialManager.get()) {
        next({ name: 'course-list' });
      } else {
        next();
      }
    },
    meta: {
      requiresAuth: false,
    },
  },
];

export default routes;

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
  }
}
