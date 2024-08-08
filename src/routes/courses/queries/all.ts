import type { QueryOptions } from '@tanstack/vue-query';
import type { ResultAsync } from 'neverthrow';

import type { CoursePreview } from '~/entities/course.ts';
import { asyncUnwrapOrReject, fetchAsResultAsync, type FetchError,jsonAsResultAsync } from '~/lib/result.ts';

import courseKeys from '../queryKeys.ts';

export function getCourseList(): ResultAsync<CoursePreview[], FetchError> {
  return fetchAsResultAsync('http://localhost:5000/api/courses')
    .andThen(jsonAsResultAsync)
    .map((data) => data as CoursePreview[]);
}

const allCoursesQueryOpts = {
  queryKey: courseKeys.all,
  queryFn: () => asyncUnwrapOrReject(getCourseList()),
} satisfies QueryOptions;

export default allCoursesQueryOpts;
