import { BaseCustomException } from './base-custom.exception';
import { HttpStatus } from '@nestjs/common';

export class ForbiddenException extends BaseCustomException {
  status = HttpStatus.FORBIDDEN;

  constructor(message: string) {
    super(message);
  }
}
