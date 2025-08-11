export class ErrorDetail {
  constructor(public message: string) {}
}

export class ApiResult<T = any> {
  Success!: boolean;
  Message?: string;
  Data?: T;
  Errors?: ErrorDetail[];
  Status?: number;

  static create_success<T>(data: T, message?: string): ApiResult<T> {
    return { Success: true, Message: message, Data: data, Status: 200 };
  }

  static create_error(errors: ErrorDetail[], status = 500, message?: string): ApiResult {
    return { Success: false, Message: message, Errors: errors, Status: status };
  }
}
