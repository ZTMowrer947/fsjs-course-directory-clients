import type { User, UserSignUpModel } from '~/entities/user.ts';
import type { ICredentialManager } from '~/lib/credential.ts';

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

export async function createUser(data: UserSignUpModel): Promise<User> {
  const res = await fetch('http://localhost:5000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    return res.json();
  } else if (res.status === 400) {
    // TODO: Properly handle validation errors
    throw new Error('Validation failure');
  } else {
    throw new Error('Unepxected error creating user');
  }
}
