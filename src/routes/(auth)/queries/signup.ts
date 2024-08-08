import type { ResultAsync } from 'neverthrow';

import { ResponseNotOkError, UnexpectedAppError, ValidationError } from '~/entities/errors.ts';
import type { User, UserSignUpModel } from '~/entities/user.ts';
import { fetchAsResultAsync, jsonAsResultAsync } from '~/lib/result.ts';

export type SignUpError = ValidationError<UserSignUpModel> | UnexpectedAppError;

export function signUp(data: UserSignUpModel): ResultAsync<User, SignUpError> {
  const req = new Request('http://localhost:5000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return (
    fetchAsResultAsync(req)
      .andThen(jsonAsResultAsync)
      .mapErr(async (error) => {
        // Extract validation errors for 400 errors
        if (error instanceof ResponseNotOkError && error.response.status === 400) {
          const errBody = await error.response.json();

          return new ValidationError(errBody.data.errors);
        } else {
          return error;
        }
      })
      // Wrap other errors
      .mapErr((e) => (e instanceof ValidationError || e instanceof UnexpectedAppError ? e : new UnexpectedAppError(e)))
      .map((user) => user as User)
  );
}
