import * as Joi from 'joi';

import { SortDirection } from '../types/enums/sort.enum';
import { TripStatus } from '../types/enums/status.enum';

export const filters: Joi.ObjectSchema = Joi.object().keys({
  driverName: Joi.string(),
  passengerName: Joi.string(),
  offset: Joi.number().integer().min(0).default(0),
  limit: Joi.number().integer().min(0).default(10),
  status: Joi.string().valid(...Object.values(TripStatus)),
  sortBy: Joi.string()
    .valid('name', 'lastName', 'createdAt')
    .default('createdAt'),
  direction: Joi.string()
    .valid(...Object.values(SortDirection))
    .default(SortDirection.ASC),
  endTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .messages({
      'string.pattern.base': 'endTime must be a valid time in HH:mm:ss format',
    }),
  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .messages({
      'string.pattern.base':
        'startTime must be a valid time in HH:mm:ss format',
    }),
});

export const create: Joi.ObjectSchema = Joi.object().keys({
  origin: Joi.string().required(),
  destination: Joi.string().required(),
  price: Joi.number().min(3000).required(),
  driverId: Joi.number().integer().positive().required(),
  passengerId: Joi.number().integer().positive().required(),
  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .messages({
      'string.pattern.base':
        'startTime must be a valid time in HH:mm:ss format',
    }),
});

export const update: Joi.ObjectSchema = Joi.object().keys({
  status: Joi.string().valid(
    TripStatus.COMPLETED,
    TripStatus.CANCELLED,
    TripStatus.IN_SERVICE,
  ),
  endTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .messages({
      'string.pattern.base': 'endTime must be a valid time in HH:mm:ss format',
    })
    .when('status', {
      is: Joi.valid(TripStatus.COMPLETED),
      then: Joi.required().messages({
        'any.required': 'endTime is required when status is in service',
      }),
      otherwise: Joi.optional(),
    }),
  startTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .messages({
      'string.pattern.base':
        'startTime must be a valid time in HH:mm:ss format',
    })
    .when('status', {
      is: Joi.valid(TripStatus.IN_SERVICE),
      then: Joi.required().messages({
        'any.required': 'startTime is required when status is in service',
      }),
      otherwise: Joi.optional(),
    }),
});

export const params: Joi.ObjectSchema = Joi.object().keys({
  id: Joi.number().integer().positive(),
});
