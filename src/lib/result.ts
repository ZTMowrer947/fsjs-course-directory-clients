import type { Result, ResultAsync } from 'neverthrow';

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
