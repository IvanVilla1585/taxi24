import * as Joi from 'joi';

import { DocumentType } from '../types/enums/document-type.enum';
import { SortDirection } from '../types/enums/sort.enum';

export const filters: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string(),
  lastName: Joi.string(),
  document: Joi.string().alphanum(),
  offset: Joi.number().integer().min(0),
  sortBy: Joi.string().valid('name', 'lastName'),
  limit: Joi.number().integer().min(0).default(10),
  direction: Joi.string()
    .valid(...Object.values(SortDirection))
    .default(SortDirection.ASC),
});

export const create: Joi.ObjectSchema = Joi.object().keys({
  lastName: Joi.string(),
  name: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().email().required(),
  document: Joi.string().alphanum().required(),
  phoneNumber: Joi.string().alphanum().required(),
  documentType: Joi.string()
    .valid(...Object.keys(DocumentType))
    .required(),
});

export const update: Joi.ObjectSchema = Joi.object().keys({
  name: Joi.string(),
  lastName: Joi.string(),
  document: Joi.string().alphanum(),
  documentType: Joi.string().valid(...Object.keys(DocumentType)),
});

export const params: Joi.ObjectSchema = Joi.object().keys({
  id: Joi.number().integer().positive(),
});
