import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializerErrors() {
    return [{ message: 'Not Authorized' }];
  }
  statusCode = 400;
}
