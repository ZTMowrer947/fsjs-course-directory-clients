import { createBrowserRouter, Outlet } from 'react-router-dom';

import signOutAction from '@/pages/(auth)/signout/action.ts';
import userLoader from '@/pages/user-loader.ts';

import queryClient from '../queryClient';
import signInAction from './(auth)/signin/action';
import SigninPage from './(auth)/signin/page';
import signUpAction from './(auth)/signup/action';
import SignupPage from './(auth)/signup/page';
import Layout from './(base)/layout';
import courseDetailLoader from './courses/[id]/loader';
import CourseInfo from './courses/[id]/page';
import courseListLoader from './courses/loader';
import Courses from './courses/page';

export function initRoutes() {
  return createBrowserRouter([
    {
      path: '/',
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      id: 'base',
      loader: userLoader(queryClient),
      children: [
        {
          index: true,
          element: <Courses />,
          loader: courseListLoader(queryClient),
        },
        {
          path: 'signin',
          element: <SigninPage />,
          action: signInAction(queryClient),
        },
        {
          path: 'signout',
          action: signOutAction(queryClient),
          element: <></>,
        },
        {
          path: 'signup',
          element: <SignupPage />,
          action: signUpAction(queryClient),
        },
        {
          path: 'courses',
          children: [
            {
              index: true,
              element: <Courses />,
              loader: courseListLoader(queryClient),
            },
            {
              path: ':id',
              element: <CourseInfo />,
              loader: courseDetailLoader(queryClient),
            },
          ],
        },
      ],
    },
  ]);
}

export default initRoutes;
