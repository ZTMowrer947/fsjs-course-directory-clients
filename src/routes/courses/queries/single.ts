import type { QueryOptions } from '@tanstack/vue-query';

import type { CourseDetail } from '~/entities/course.ts';

import courseKeys from '../queryKeys.ts';

export async function fetchSingleCourse(id: CourseDetail['id']): Promise<CourseDetail | null> {
  const url = `http://localhost:5000/api/courses/${encodeURIComponent(id)}`;

  const res = await fetch(url);

  if (res.status === 404) {
    return null;
  } else {
    return res.json();
  }
}

export default function singleCourseQueryOpts(id: CourseDetail['id']) {
  return {
    queryKey: courseKeys.byId(id),
    queryFn: ({ queryKey }) => {
      const key = queryKey as ReturnType<typeof courseKeys.byId>;

      return fetchSingleCourse(key[1]);
    },
  } satisfies QueryOptions;
}
