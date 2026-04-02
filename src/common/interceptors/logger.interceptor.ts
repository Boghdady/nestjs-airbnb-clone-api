import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggerInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const requestId = request.header('x-request-id') || uuid();

    const startTime = Date.now();

    response.on('finish', () => {
      const { method, originalUrl } = request;
      const { statusCode, statusMessage } = response;

      const endTime = Date.now();
      const duration = endTime - startTime;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage} ${duration}ms ${requestId}`;

      if (statusCode >= 500) return this.logger.error(message);
      if (statusCode >= 400) return this.logger.warn(message);

      this.logger.log(message);
    });

    return next.handle();
  }
}
