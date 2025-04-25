import * as Boom from '@hapi/boom';
import { NestMiddleware, Injectable } from '@nestjs/common';

// types
import { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';

export function createValidationMiddleware(
  schema: ObjectSchema,
  key: 'body' | 'query',
): any {
  @Injectable()
  class JoiMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      const { error } = schema.validate(req[key], { abortEarly: true });

      if (error) {
        throw Boom.badRequest(error.details[0]?.message);
      }

      next();
    }
  }

  return JoiMiddleware;
}
