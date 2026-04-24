import { BaseCustomException } from './base-custom.exception';
import { HttpStatus } from '@nestjs/common';

export class UnAuthorizedException extends BaseCustomException {
  status = HttpStatus.UNAUTHORIZED;

  constructor(message: string) {
    super(message);
  }
}
