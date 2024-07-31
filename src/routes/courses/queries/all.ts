import type { QueryOptions } from '@tanstack/vue-query';

import type { CoursePreview } from '~/entities/course.ts';

import courseKeys from '../queryKeys.ts';

export async function fetchCourseList(): Promise<CoursePreview[]> {
  const res = await fetch('http://localhost:5000/api/courses');

  return res.json();
}

const allCoursesQueryOpts = {
  queryKey: courseKeys.all,
  queryFn: fetchCourseList,
} satisfies QueryOptions;

export default allCoursesQueryOpts;
