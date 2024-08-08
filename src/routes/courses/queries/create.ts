import type { ResultAsync } from 'neverthrow';

import type { CourseDetail, CourseUpsertModel } from '~/entities/course.ts';
import { AuthFailError, ResponseNotOkError, UnexpectedAppError, ValidationError } from '~/entities/errors.ts';
import { fetchAsResultAsync, jsonAsResultAsync } from '~/lib/result.ts';

export type CourseCreateError = AuthFailError | ValidationError<CourseUpsertModel> | UnexpectedAppError;

export function createCourse(
  encodedCredentials: string,
  courseData: CourseUpsertModel,
): ResultAsync<CourseDetail, CourseCreateError> {
  const req = new Request('http://localhost:5000/api/courses', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(courseData),
  });

  return fetchAsResultAsync(req)
    .andThen(jsonAsResultAsync)
    .mapErr(async (error) => {
      // Handle 400's and 401's, leaving other errors unchanged
      if (!(error instanceof ResponseNotOkError)) {
        return error;
      } else if (error.response.status === 400) {
        const errorBody = await error.response.json().catch((err) => new UnexpectedAppError(err));

        return new ValidationError(errorBody.data.errors);
      } else if (error.response.status === 401) {
        return new AuthFailError();
      } else {
        return new UnexpectedAppError(error);
      }
    })
    .map((course) => course as CourseDetail);
}
