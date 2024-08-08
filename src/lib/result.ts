import { errAsync, okAsync, type Result, ResultAsync } from 'neverthrow';

import { ResponseNotOkError, UnexpectedAppError } from '~/entities/errors';

/**
 * Either returns the successful value or throws the failure value,
 * depending on the result's outcome.
 * @param result The result to unwrap
 * @returns The success value if the result is OK
 * @throws The error value if the result is failed
 */
export function unwrapOrThrow<T, E>(result: Result<T, E>): T {
  return result.match(
    (output) => output,
    (error) => {
      throw error;
    },
  );
}

/**
 * Either resolved with the successful value or rejects with the failure value,
 * depending on the async result's outcome.
 * @param result The async result to unwrap
 * @returns A resolved promise with the success value if the result is OK
 * @throws A rejected promise with the error value if the result is failed
 */
export async function asyncUnwrapOrReject<T, E>(result: ResultAsync<T, E>): Promise<T> {
  return result.then(unwrapOrThrow);
}

export type FetchError = UnexpectedAppError | ResponseNotOkError;

/**
 * A ResultAsync wrapper for the Fetch API. Additionally exposes a failed response
 * through the error type.
 * @param options The options to pass to fetch.
 * @returns A ResultAsync with the fetch Response as the Ok type and
 * a fetch-related error as the Error type.
 */
export function fetchAsResultAsync(...options: Parameters<typeof fetch>): ResultAsync<Response, FetchError> {
  return ResultAsync.fromPromise(fetch(...options), (err) => {
    // If fetch threw an error, wrap it
    return new UnexpectedAppError(err as Error);
  }).andThen((res) => {
    // If response failed, throw an error
    if (!res.ok) {
      return errAsync(new ResponseNotOkError(res));
    } else {
      return okAsync(res);
    }
  });
}

/**
 * Parses the response body as JSON and returns it (or a parse error) as an AsyncResult
 * @param response The response to parse.
 * @returns An AsyncResult with either the JSON data or a parsing error.
 */
export function jsonAsResultAsync(response: Response): ResultAsync<unknown, UnexpectedAppError> {
  return ResultAsync.fromPromise(response.json(), (err) => new UnexpectedAppError(err as Error));
}
