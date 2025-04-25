import {
  CreatePassengerDto,
  UpdatePassengerDto,
} from '../../../src/types/dtos/passenger.dto';
import { DocumentType } from '../../../src/types/enums/document-type.enum';
import { SortDirection } from '../../../src/types/enums/sort.enum';

const date = new Date();

export const passenger1: CreatePassengerDto = {
  name: 'Ana',
  lastName: 'Gómez',
  password: 'AnaPass456',
  email: 'ana.gomez@example.com',
  document: 'DOC001122',
  phoneNumber: '5544332211',
  documentType: DocumentType.CE,
};

export const passengerToUpdate: UpdatePassengerDto = {
  name: 'Ana Maria',
  lastName: 'Gómez Alvarez',
};

export const passenger2: CreatePassengerDto = {
  name: 'Carlos',
  lastName: 'Méndez',
  password: 'CarlosPass789',
  email: 'carlos.m@example.com',
  document: 'DOC998877',
  phoneNumber: '5511223344',
  documentType: DocumentType.CC,
};

export const createdPassenger1 = {
  ...passenger1,
  id: 1,
  createdAt: date,
  updatedAt: date,
};

export const createdPassenger2 = {
  ...passenger2,
  id: 2,
  createdAt: date,
  updatedAt: date,
};

export const passengers = [createdPassenger1, createdPassenger2];

export const filters = {
  limit: 10,
  offset: 0,
  sortBy: 'createdAt',
  direction: SortDirection.ASC,
};
