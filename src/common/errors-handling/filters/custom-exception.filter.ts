import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { BaseCustomException } from '../custom-exceptions/base-custom.exception';
import { Response } from 'express';
import { I18nValidationException } from 'nestjs-i18n/dist/interfaces';
import { formatInputValidationErrors } from '../input-validation/format-input-validation-errors';
import { I18nService } from 'nestjs-i18n';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService) {}

  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    // Handle custom exceptions that inherit from BaseCustomException
    if (exception instanceof BaseCustomException) {
      return response.status(exception.status).send({
        errors: exception.formateError(),
      });
    }

    // Handle Input validation exceptions (from class-validator)
    if (exception instanceof I18nValidationException) {
      const formatedErrors = formatInputValidationErrors(
        exception.errors,
        this.i18nService,
        host,
      );
      return response.status(400).send({
        errors: formatedErrors,
      });
    }

    // unknown exceptions
    console.log(exception);
    response.status(500).json({
      errors: [{ message: 'Internal Server Error' }],
    });
  }
}
