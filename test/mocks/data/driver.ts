import {
  CreateDriverDto,
  UpdateDriverDto,
} from '../../../src/types/dtos/driver.dto';
import { DocumentType } from '../../../src/types/enums/document-type.enum';
import { SortDirection } from '../../../src/types/enums/sort.enum';

const date = new Date();

export const driver1: CreateDriverDto = {
  name: 'Ana',
  lastName: 'Gómez',
  password: 'AnaPass456',
  email: 'ana.gomez@example.com',
  license: 'LIC123456',
  document: 'DOC001122',
  phoneNumber: '5544332211',
  documentType: DocumentType.CE,
};

export const driverToUpdate: UpdateDriverDto = {
  name: 'Ana Maria',
  lastName: 'Gómez Alvarez',
  license: 'LIC12345667',
  document: 'DOC00112245',
};

export const driver2: CreateDriverDto = {
  name: 'Carlos',
  lastName: 'Méndez',
  password: 'CarlosPass789',
  email: 'carlos.m@example.com',
  latitude: 34.05,
  longitude: -118.25,
  license: 'LIC654321',
  document: 'DOC998877',
  phoneNumber: '5511223344',
  documentType: DocumentType.CC,
};

export const createdDriver1 = {
  ...driver1,
  id: 1,
  isActive: true,
  createdAt: date,
  updatedAt: date,
};

export const createdDriver2 = {
  ...driver2,
  id: 2,
  isActive: true,
  createdAt: date,
  updatedAt: date,
};

delete createdDriver2.latitude;
delete createdDriver2.longitude;

export const drivers = [createdDriver1, createdDriver2];

export const filters = {
  limit: 10,
  offset: 0,
  sortBy: 'createdAt',
  direction: SortDirection.ASC,
};
