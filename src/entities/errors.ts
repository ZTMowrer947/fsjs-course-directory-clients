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

export class UnexpectedAppError<E extends Error = Error> extends GeneralAppError {
  public readonly inner?: E;

  public constructor(inner?: E) {
    super();
    this.inner = inner;
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

export class FetchFailureError extends GeneralAppError {
  public readonly inner: Error;
  public constructor(inner: Error) {
    super();
    this.inner = inner;
    this.message = 'Unexpected failure from fetch';
    this.name = 'FetchFailureError';
  }
}

export class ResponseNotOkError extends GeneralAppError {
  public readonly response: Response;
  public constructor(response: Response) {
    super();
    this.response = response;
    this.message = 'Error response from server';
    this.name = 'ResponseNotOkError';
  }
}

export class BodyParseError extends GeneralAppError {
  public readonly inner: Error;
  public constructor(inner: Error) {
    super();
    this.inner = inner;
    this.message = 'Failed to parse response body';
    this.name = 'BodyParseError';
  }
}
