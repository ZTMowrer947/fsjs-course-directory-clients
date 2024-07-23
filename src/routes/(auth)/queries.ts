import { User } from '~/entities/user.ts';
import { ICredentialManager } from '~/lib/credential.ts';

export async function getUserFromEncodedCredentials(encoded: string): Promise<User | null> {
  const res = await fetch('http://localhost:5000/api/users', {
    headers: {
      Authorization: `Basic ${encoded}`,
    },
  });

  if (res.ok) {
    return res.json();
  } else if (res.status === 401) {
    return null;
  } else {
    throw new Error('Unexpected error fetching user');
  }
}

export async function getUserFromStoredCredentials(credentialManager: ICredentialManager): Promise<User | null> {
  const credentials = credentialManager.get();

  if (!credentials) return null;

  return getUserFromEncodedCredentials(credentialManager.encode(credentials));
}
