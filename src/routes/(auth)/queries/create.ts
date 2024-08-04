import type { User, UserSignUpModel } from '~/entities/user.ts';

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
