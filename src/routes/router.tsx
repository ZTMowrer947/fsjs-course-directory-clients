import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';

import queryClient from '@/queryClient.ts';
import Layout from '@/routes/layout.tsx';
import authLoader from '@/routes/loader.ts';

import courseLoader from './courses/:id/loader.ts';
import CourseDetail from './courses/:id/route.tsx';
import coursesLoader from './courses/loader.ts';
import CourseListing from './courses/route.tsx';
import SignIn from './signin/route.tsx';

const router = createBrowserRouter([
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    id: 'base',
    loader: authLoader(queryClient),
    children: [
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/courses',
        children: [
          {
            path: ':id',
            loader: courseLoader(queryClient),
            id: 'course-id',
            children: [
              {
                index: true,
                element: <CourseDetail />,
              },
            ],
          },
          {
            index: true,
            element: <CourseListing />,
            loader: coursesLoader(queryClient),
          },
        ],
      },
      {
        path: '/',
        element: <Navigate to="/courses" />,
      },
    ],
  },
]);

export default router;
