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

export class ValidationError<T> extends GeneralAppError {
  public readonly failures: Record<keyof T, string[]>;
  public constructor(failures: Record<keyof T, string[]>) {
    super();
    this.message = 'Error validating input';
    this.name = 'ValidationError';
    this.failures = failures;
  }
}
