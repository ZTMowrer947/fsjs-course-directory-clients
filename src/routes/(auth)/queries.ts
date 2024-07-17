import { User, UserSignInModel } from '~/entities/user.ts';

export async function getUserFromCredentials(credentials: UserSignInModel): Promise<User | null> {
  const { emailAddress, password } = credentials;

  const encodedCredentials = btoa(`${emailAddress}:${password}`);

  const res = await fetch('http://localhost:5000/api/users', {
    headers: {
      Authorization: `Basic ${encodedCredentials}`,
    },
  });

  if (res.status === 401) {
    return null;
  } else {
    return res.json();
  }
}
