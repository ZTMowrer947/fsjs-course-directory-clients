import type { QueryOptions } from '@tanstack/vue-query';
import type { ResultAsync } from 'neverthrow';

import type { CoursePreview } from '~/entities/course.ts';
import { UnexpectedAppError } from '~/entities/errors.ts';
import { asyncUnwrapOrReject, fetchAsResultAsync, jsonAsResultAsync } from '~/lib/result.ts';

import courseKeys from '../queryKeys.ts';

export function getCourseList(): ResultAsync<CoursePreview[], UnexpectedAppError> {
  return (
    fetchAsResultAsync('http://localhost:5000/api/courses')
      .andThen(jsonAsResultAsync)
      // Any error here is unexpected
      .mapErr((e) => (e instanceof UnexpectedAppError ? e : new UnexpectedAppError(e)))
      .map((data) => data as CoursePreview[])
  );
}

const allCoursesQueryOpts = {
  queryKey: courseKeys.all,
  queryFn: () => asyncUnwrapOrReject(getCourseList()),
} satisfies QueryOptions;

export default allCoursesQueryOpts;
