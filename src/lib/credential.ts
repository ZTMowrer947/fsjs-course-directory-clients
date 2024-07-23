import Cookies from 'js-cookie';

import type { UserSignInModel } from '~/entities/user.ts';

/**
 * Represents an abstract API for credential management
 */
export interface ICredentialManager {
  /**
   * Encodes the given credentials into a string.
   * @param credentials The credentials to encode.
   * @return The encoded credentials.
   */
  encode(credentials: UserSignInModel): string;

  /**
   * Decodes the given string into a set of credentials.
   * @param encoded The encoded credential string
   * @return The decoded credentials.
   */
  decode(encoded: string): UserSignInModel;

  /**
   * Attempts to retrived the stored set of credentials.
   *
   * @returns The stored credentials if found, otherwise null.
   */
  get(): UserSignInModel | null;

  /**
   * Persists the given set of credentials for use in other sessions.
   * @param credentials The credentials to persist.
   */
  store(credentials: UserSignInModel): void;

  /**
   * Removes the stored set of credentials, if any.
   */
  clear(): void;
}

/**
 * Represents a cookie-backed credential manager.
 */
export class CookieCredentialManager implements ICredentialManager {
  readonly #authCookies: Cookies.CookiesStatic;
  readonly #cookieName = 'sdbc-credentials';

  public constructor() {
    this.#authCookies = Cookies.withAttributes({
      domain: 'localhost',
      expires: 7,
      sameSite: 'strict',
      secure: import.meta.env.PROD,
    });
  }

  public encode(credentials: UserSignInModel): string {
    return btoa(`${credentials.emailAddress}:${credentials.password}`);
  }

  public decode(encoded: string): UserSignInModel {
    const decodedString = atob(encoded);

    const [emailAddress, password] = decodedString.split(':', 2);

    return { emailAddress, password };
  }

  public get(): UserSignInModel | null {
    const cookie = this.#authCookies.get(this.#cookieName);

    return cookie ? this.decode(cookie) : null;
  }

  public store(credentials: UserSignInModel): void {
    const encoded = this.encode(credentials);

    this.#authCookies.set(this.#cookieName, encoded);
  }

  public clear(): void {
    this.#authCookies.remove(this.#cookieName);
  }
}

// Dummy implementation of credential manager for fallback
function unimplemented(): never {
  throw new Error('Not implemented');
}

export const dummyCredentialManager: ICredentialManager = {
  encode: unimplemented,
  decode: unimplemented,
  get: unimplemented,
  store: unimplemented,
  clear: unimplemented,
};
