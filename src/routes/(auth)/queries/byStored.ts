import type { QueryOptions } from '@tanstack/vue-query';

import type { User } from '~/entities/user.ts';
import type { ICredentialManager } from '~/lib/credential.ts';

import { userKeys } from '../queryKeys.ts';
import { getUserFromEncodedCredentials } from './byEncoded.ts';

export async function getUserFromStoredCredentials(credentialManager: ICredentialManager): Promise<User | null> {
  const credentials = credentialManager.get();

  if (!credentials) return null;

  return getUserFromEncodedCredentials(credentialManager.encode(credentials));
}

export function authedUserQueryOpts(credentialManager: ICredentialManager) {
  return {
    queryKey: userKeys.user,
    queryFn: () => getUserFromStoredCredentials(credentialManager),
  } satisfies QueryOptions;
}
