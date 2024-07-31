export class GeneralAppError extends Error {
  public constructor() {
    super('An app-specific error occurred');
    this.name = 'GeneralAppError';
  }
}

export class AuthFailError extends GeneralAppError {
  public constructor() {
    super();
    this.message = 'Incorrect or invalid credentials to access resource';
    this.name = 'AuthFailError';
  }
}

export class UnexpectedAppError extends GeneralAppError {
  public constructor() {
    super();
    this.message = 'Unexpected error';
    this.name = 'UnexpectedAppError';
  }
}
