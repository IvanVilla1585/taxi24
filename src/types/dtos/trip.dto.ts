import { Passenger } from '../../entities/Passenger/passenger.entity';
import { Driver } from '../../entities/Driver/driver.entity';
import { TripStatus } from '../enums/status.enum';
import { SortDirection } from '../enums/sort.enum';

class BaseTrip {
  origin: string;
  destination: string;
  price: number;
  startTime?: string;
  endTime?: string;
}

export class TripDto extends BaseTrip {
  id: number;
  driver: Driver;
  status: TripStatus;
  passenger: Passenger;
}

export class CreateTripDto extends BaseTrip {
  driverId: number;
  status?: TripStatus;
  passengerId: number;
}

export class UpdateTripDto {
  startTime?: string;
  endTime?: string;
  status?: TripStatus;
}

export class FiltersTripDto {
  startTime?: string;
  endTime?: string;
  status?: TripStatus;
  driverName?: string;
  passengerName?: string;
  limit: number;
  offset: number;
  sortBy: string;
  direction: SortDirection;
}

export class ParamsDto {
  id: number;
}

export class PaginationTripResponse {
  data: TripDto[];
  total: number;
}
