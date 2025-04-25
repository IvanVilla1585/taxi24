import { DocumentType } from '../enums/document-type.enum';
import { SortDirection } from '../enums/sort.enum';

class BasePassenger {
  email: string;
  document: string;
  name: string;
  lastName?: string;
  phoneNumber: string;
  documentType: DocumentType;
  password: string;
}

export class PassengerDto extends BasePassenger {
  id: number;
}

export class CreatePassengerDto extends BasePassenger {}

export class UpdatePassengerDto {
  name?: string;
  lastName?: string;
  documentType?: DocumentType;
}

export class FiltersPassengerDto {
  name?: string;
  lastName?: string;
  document?: string;
  limit: number;
  offset: number;
  sortBy: string;
  direction: SortDirection;
}

export class ParamsDto {
  id: number;
}

export class PaginationPassengerResponse {
  data: PassengerDto[];
  total: number;
}
