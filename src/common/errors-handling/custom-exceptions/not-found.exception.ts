import { BaseCustomException } from './base-custom.exception';

export class NotFoundException extends BaseCustomException {
  status = 404;

  constructor(message: string) {
    super(message);
  }
}
