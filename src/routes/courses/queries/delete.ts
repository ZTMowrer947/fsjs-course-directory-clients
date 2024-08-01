import type { CourseDetail } from '~/entities/course.ts';
import { AuthFailError, UnexpectedAppError } from '~/entities/errors.ts';
import type { ICredentialManager } from '~/lib/credential.ts';

export async function deleteCourse(id: CourseDetail['id'], credentialManager: ICredentialManager): Promise<void> {
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
