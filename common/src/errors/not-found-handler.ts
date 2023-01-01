import { CustomError } from './custom-error';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Rout not found');
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializerErrors() {
    return [{ message: 'Not Found' }];
  }
}
