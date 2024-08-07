import type { ResultAsync } from 'neverthrow';

import { AuthFailError, ResponseNotOkError, UnexpectedAppError } from '~/entities/errors.ts';
import type { User } from '~/entities/user.ts';
import { fetchAsResultAsync, jsonAsResultAsync } from '~/lib/result.ts';

export type UserFromEncodedError = UnexpectedAppError | AuthFailError;

export function getUserFromEncodedCredentials(encoded: string): ResultAsync<User, UserFromEncodedError> {
  const req = new Request('http://localhost:5000/api/users', {
    headers: {
      Authorization: `Basic ${encoded}`,
    },
  });

  return fetchAsResultAsync(req)
    .andThen(jsonAsResultAsync)
    .mapErr((err) => {
      // If 401, expose as error type
      if (err instanceof ResponseNotOkError && err.response.status === 401) {
        return new AuthFailError();
      } else {
        return new UnexpectedAppError();
      }
    })
    .map((data) => data as User);
}
