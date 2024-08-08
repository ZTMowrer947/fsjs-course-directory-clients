import type { ResultAsync } from 'neverthrow';

import type { CoursePreview, CourseUpsertModel } from '~/entities/course.ts';
import { AuthFailError, CourseNotFoundError, UnexpectedAppError, ValidationError } from '~/entities/errors.ts';
import { fetchAsResultAsync } from '~/lib/result.ts';

export type CourseUpdateError =
  | AuthFailError
  | CourseNotFoundError
  | ValidationError<CourseUpsertModel>
  | UnexpectedAppError;

export function updateCourse(
  id: CoursePreview['id'],
  updateData: CourseUpsertModel,
  encodedCredentials: string,
): ResultAsync<void, CourseUpdateError> {
  const req = new Request(`http://localhost:5000/api/courses/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  });

  return fetchAsResultAsync(req)
    .mapErr(async (error) => {
      // Specifically handle 400/401/403/404, wrap all other errors
      if (error instanceof UnexpectedAppError) {
        return error;
      } else if (error.response.status === 401 || error.response.status === 403) {
        return new AuthFailError();
      } else if (error.response.status === 404) {
        return new CourseNotFoundError(id);
      } else if (error.response.status === 400) {
        const errorBody = await error.response.json().catch((err) => new UnexpectedAppError(err));

        return new ValidationError(errorBody.data.errors);
      } else {
        return new UnexpectedAppError(error);
      }
    })
    .map(() => {});
}
