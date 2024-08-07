import type { QueryOptions } from '@tanstack/vue-query';
import type { ResultAsync } from 'neverthrow';

import type { CourseDetail } from '~/entities/course.ts';
import { ResponseNotOkError } from '~/entities/errors.ts';
import { asyncUnwrapOrReject, fetchAsResultAsync, jsonAsResultAsync, type JsonRequestError } from '~/lib/result.ts';

import courseKeys from '../queryKeys.ts';

export function getSingleCourse(id: CourseDetail['id']): ResultAsync<CourseDetail, JsonRequestError> {
  const url = `http://localhost:5000/api/courses/${encodeURIComponent(id)}`;

  return fetchAsResultAsync(url)
    .andThen(jsonAsResultAsync)
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
  } satisfies QueryOptions<CourseDetail, JsonRequestError>;
}
