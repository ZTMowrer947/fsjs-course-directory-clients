export interface User {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
}

export type UserSignUpModel = Pick<User, 'firstName' | 'lastName' | 'emailAddress'> & {
  password: string;
};

export type UserSignInModel = Pick<UserSignUpModel, 'emailAddress' | 'password'>;
