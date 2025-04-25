import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  BadRequestException,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
import * as Boom from '@hapi/boom';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (Boom.isBoom(exception)) {
      const { output } = exception;
      return response.status(output.statusCode).json(output.payload);
    }

    if (exception instanceof BadRequestException) {
      const res = exception.getResponse() as { message: string | string[] };
      const message = Array.isArray(res.message)
        ? res.message.join(', ')
        : res.message;

      const error = Boom.badRequest(message);

      return response
        .status(error.output.statusCode)
        .json(error.output.payload);
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message || 'Unexpected error';

      if (exception instanceof Error) {
        this.logger.error(
          `[${request.method}] ${request.url} - ${message}`,
          exception.stack,
        );
      } else {
        this.logger.error(
          `[${request.method}] ${request.url} - ${message}`,
          exception,
        );
      }

      return response.status(status).json({
        statusCode: status,
        error: exception.name,
        message,
      });
    }

    this.logger.error(`[${request.method}] ${request.url}`, exception);

    const boom = Boom.internal('Internal Server Error');

    return response.status(boom.output.statusCode).json(boom.output.payload);
  }
}
