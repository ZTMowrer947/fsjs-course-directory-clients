import type { ResultAsync } from 'neverthrow';

import type { CourseDetail } from '~/entities/course.ts';
import { AuthFailError, CourseNotFoundError, ResponseNotOkError, UnexpectedAppError } from '~/entities/errors.ts';
import type { ICredentialManager } from '~/lib/credential.ts';
import { fetchAsResultAsync } from '~/lib/result.ts';

export type DeleteCourseError = AuthFailError | CourseNotFoundError | UnexpectedAppError;

export async function deleteCourseOld(id: CourseDetail['id'], credentialManager: ICredentialManager): Promise<void> {
  const credentials = credentialManager.get();

  if (!credentials) throw new AuthFailError();

  const encoded = credentialManager.encode(credentials);

  const res = await fetch(`http://localhost:5000/api/courses/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${encoded}`,
    },
  });

  if (res.ok) {
    return;
  } else if ([401, 403].includes(res.status)) {
    throw new AuthFailError();
  } else {
    throw new UnexpectedAppError();
  }
}

export function deleteCourse(id: CourseDetail['id'], encodedCredentials: string): ResultAsync<void, DeleteCourseError> {
  const url = `http://localhost:5000/api/courses/${encodeURIComponent(id)}`;
  const req = new Request(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  });

  return fetchAsResultAsync(req)
    .map(() => {})
    .mapErr((error) => {
      if (!(error instanceof ResponseNotOkError)) {
        return error;
      } else if (error.response.status === 401 || error.response.status === 403) {
        return new AuthFailError();
      } else if (error.response.status === 404) {
        return new CourseNotFoundError(id);
      } else {
        return new UnexpectedAppError(error);
      }
    });
}
