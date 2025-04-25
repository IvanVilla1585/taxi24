import { CreateTripDto, UpdateTripDto } from '../../../src/types/dtos/trip.dto';
import { SortDirection } from '../../../src/types/enums/sort.enum';
import { TripStatus } from '../../../src/types/enums/status.enum';

const date = new Date();

export const trip1: CreateTripDto = {
  price: 3000,
  driverId: 1,
  passengerId: 1,
  origin: 'calle 40',
  destination: 'calle 20',
};

export const trip2: CreateTripDto = {
  price: 5000,
  driverId: 2,
  passengerId: 2,
  origin: 'calle 40',
  destination: 'calle 20',
};

export const tripToUpdate: UpdateTripDto = {
  startTime: '10:15:10',
  status: TripStatus.IN_SERVICE,
};

export const createdTrip1 = {
  ...trip1,
  id: 1,
  createdAt: date,
  updatedAt: date,
  status: TripStatus.CREATED,
};

export const createdTrip2 = {
  ...trip2,
  id: 2,
  createdAt: date,
  updatedAt: date,
  status: TripStatus.CREATED,
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { driverId: _, passengerId: __, ...tripWithoutIds1 } = createdTrip1;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { driverId: ___, passengerId: ____, ...tripWithoutIds2 } = createdTrip2;

export const trips = [tripWithoutIds1, tripWithoutIds2];

export const filters = {
  limit: 10,
  offset: 0,
  sortBy: 'createdAt',
  direction: SortDirection.ASC,
};
