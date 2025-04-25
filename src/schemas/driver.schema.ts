import * as Joi from 'joi';

import { DocumentType } from '../types/enums/document-type.enum';
import { SortDirection } from '../types/enums/sort.enum';

export const filters: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string(),
  lastName: Joi.string(),
  isActive: Joi.boolean(),
  document: Joi.string().alphanum(),
  offset: Joi.number().integer().min(0),
  sortBy: Joi.string()
    .valid('name', 'lastName', 'createdAt')
    .default('createdAt'),
  limit: Joi.number().integer().min(0).default(10),
  direction: Joi.string()
    .valid(...Object.values(SortDirection))
    .default(SortDirection.ASC),
});

export const nearbyFilters: Joi.ObjectSchema = Joi.object().keys({
  latitude: Joi.number().min(-90).max(90),
  radius: Joi.number().min(1000).default(3000),
  longitude: Joi.number().min(-180).default(180),
});

export const create: Joi.ObjectSchema = Joi.object().keys({
  lastName: Joi.string(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  isActive: Joi.boolean().default(true),
  email: Joi.string().email().required(),
  latitude: Joi.number().min(-90).max(90),
  license: Joi.string().alphanum().required(),
  document: Joi.string().alphanum().required(),
  longitude: Joi.number().min(-180).default(180),
  phoneNumber: Joi.string().alphanum().required(),
  documentType: Joi.string()
    .valid(...Object.keys(DocumentType))
    .required(),
});

export const update: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string(),
  lastName: Joi.string(),
  isActive: Joi.boolean(),
  licence: Joi.string().alphanum(),
  document: Joi.string().alphanum(),
  latitude: Joi.number().min(-90).max(90),
  longitude: Joi.number().min(-180).default(180),
  documentType: Joi.string().valid(...Object.keys(DocumentType)),
});

export const params: Joi.ObjectSchema = Joi.object().keys({
  id: Joi.number().integer().positive(),
});
