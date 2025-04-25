import { DocumentType } from '../enums/document-type.enum';
import { SortDirection } from '../enums/sort.enum';

class BaseDriver {
  email: string;
  document: string;
  name: string;
  lastName?: string;
  isActive?: boolean;
  documentType: DocumentType;
  license?: string;
  password: string;
  phoneNumber: string;
}

export class DriverDto extends BaseDriver {
  id: number;
}

export class CreateDriverDto extends BaseDriver {
  latitude?: number;
  longitude?: number;
}

export class UpdateDriverDto {
  document?: string;
  name?: string;
  lastName?: string;
  isActive?: boolean;
  documentType?: DocumentType;
  license?: string;
  latitude?: number;
  longitude?: number;
}

export class FiltersDriverDto {
  name?: string;
  lastName?: string;
  document?: string;
  isActive?: boolean;
  limit: number;
  offset: number;
  sortBy: string;
  direction: SortDirection;
}

export class FiltersNearbyDriverDto {
  latitude: number;
  longitude: number;
  radius?: number;
}

export class ParamsDto {
  id: number;
}

export class PaginationDriverResponse {
  data: DriverDto[];
  total: number;
}
