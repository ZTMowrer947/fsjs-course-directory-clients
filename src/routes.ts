import { createRouter } from 'vue-router';

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
];

export default routes;
