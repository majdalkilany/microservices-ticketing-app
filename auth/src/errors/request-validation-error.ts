import { ValidationError } from 'express-validator';

import { CustomError } from './custom-error';
export class RequestValidationError extends CustomError {
  statusCode = 4000;
  constructor(public errors: ValidationError[]) {
    super('validation Error');

    // Only because we extending a built in class

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializerErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, fields: error.param };
    });
  }
}
