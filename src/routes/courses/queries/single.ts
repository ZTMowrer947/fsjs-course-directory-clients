import type { QueryOptions } from '@tanstack/vue-query';
import type { ResultAsync } from 'neverthrow';

import type { CourseDetail } from '~/entities/course.ts';
import { CourseNotFoundError, ResponseNotOkError, UnexpectedAppError } from '~/entities/errors.ts';
import { asyncUnwrapOrReject, fetchAsResultAsync, jsonAsResultAsync } from '~/lib/result.ts';

import courseKeys from '../queryKeys.ts';

type CourseFetchError = UnexpectedAppError | CourseNotFoundError;

export function getSingleCourse(id: CourseDetail['id']): ResultAsync<CourseDetail, CourseFetchError> {
  const url = `http://localhost:5000/api/courses/${encodeURIComponent(id)}`;

  return fetchAsResultAsync(url)
    .andThen(jsonAsResultAsync)
    .mapErr((error) => {
      // Handle 404 as distinct error
      if (error instanceof ResponseNotOkError && error.response.status === 404) {
        return new CourseNotFoundError(id);
      } else {
        return error instanceof UnexpectedAppError ? error : new UnexpectedAppError(error);
      }
    })
    .map((data) => data as CourseDetail);
}

export default function singleCourseQueryOpts(id: CourseDetail['id']) {
  return {
    queryKey: courseKeys.byId(id),
    queryFn: ({ queryKey }) => {
      const key = queryKey as ReturnType<typeof courseKeys.byId>;

      return asyncUnwrapOrReject(getSingleCourse(key[1]));
    },
    retry(failCount, error) {
      // Do not retry after a 404, otherwise retry up to three times
      return !(error instanceof ResponseNotOkError && error.response.status === 404) && failCount < 3;
    },
  } satisfies QueryOptions<CourseDetail, CourseFetchError>;
}
