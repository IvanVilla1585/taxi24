import * as Boom from '@hapi/boom';
import { ObjectSchema, ValidationResult } from 'joi';
import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform<T>(data: T): T {
    const result: ValidationResult<T> = this.schema.validate(data, {
      convert: true,
      abortEarly: true,
      presence: 'optional',
    });

    if (result.error) {
      throw Boom.badRequest(result.error.details[0].message);
    }

    return result.value;
  }
}
