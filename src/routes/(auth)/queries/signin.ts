import type { QueryOptions } from '@tanstack/vue-query';
import { errAsync, type ResultAsync } from 'neverthrow';

import { AuthFailError, ResponseNotOkError, UnexpectedAppError } from '~/entities/errors.ts';
import type { User } from '~/entities/user.ts';
import type { ICredentialManager } from '~/lib/credential.ts';
import { asyncUnwrapOrReject, fetchAsResultAsync, jsonAsResultAsync } from '~/lib/result.ts';

import { userKeys } from '../queryKeys.ts';

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

export function getUserFromStoredCredentials(
  credentialManager: ICredentialManager,
): ResultAsync<User, UserFromEncodedError> {
  const credentials = credentialManager.get();

  // If there are no credentials stored, fail immediately
  if (!credentials) {
    return errAsync(new AuthFailError());
  }

  const encoded = credentialManager.encode(credentials);

  return getUserFromEncodedCredentials(encoded);
}

export function hydrateStoredUserOpts(credentialManager: ICredentialManager) {
  return {
    queryKey: userKeys.user,
    queryFn() {
      const hydrateResult = getUserFromStoredCredentials(credentialManager);

      return asyncUnwrapOrReject(hydrateResult);
    },
    retry(failCount, error) {
      return !(error instanceof AuthFailError) && failCount < 3;
    },
  } satisfies QueryOptions<User, UserFromEncodedError>;
}
