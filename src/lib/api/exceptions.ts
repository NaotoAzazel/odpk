import { ApiErrorKey } from "@/types/api/errors";

export class ApiError extends Error {
  public status: number;
  public override message: ApiErrorKey;

  constructor(message: ApiErrorKey, status: number) {
    super(message);
    this.message = message;
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ApiErrorResponse extends Error {
  errors: unknown;
  public override message: ApiErrorKey;

  constructor(message: ApiErrorKey, errors?: unknown) {
    super(message);
    this.message = message;
    this.errors = errors;
    Object.setPrototypeOf(this, ApiErrorResponse.prototype);
  }
}
