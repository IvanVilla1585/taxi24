import * as Boom from '@hapi/boom';
import { Injectable } from '@nestjs/common';

import { TripRepository } from './trip.repository';
import { Trip } from '../../entities/Trip/trip.entity';
import { DriverRepository } from '../Driver/driver.repository';
import { PassengerRepository } from '../Passenger/passenger.repository';

// types
import { IBaseService } from '../../types/interfaces/base-service.interface';
import {
  CreateTripDto,
  UpdateTripDto,
  FiltersTripDto,
  PaginationTripResponse,
} from '../../types/dtos/trip.dto';
import { TripStatus } from '../../types/enums/status.enum';

@Injectable()
export class TripService
  implements
    IBaseService<
      Trip,
      FiltersTripDto,
      CreateTripDto,
      UpdateTripDto,
      PaginationTripResponse
    >
{
  constructor(
    private readonly repository: TripRepository,
    private readonly driverRepository: DriverRepository,
    private readonly passengerRepository: PassengerRepository,
  ) {}

  async findAndPaginate(
    filters: FiltersTripDto,
  ): Promise<PaginationTripResponse> {
    const [trips, total] = await this.repository.findAndPaginate(filters);

    return {
      data: trips,
      total: total,
    };
  }

  async findById(id: number): Promise<Trip> {
    const trip = await this.repository.findOneBy({ id });

    if (!trip) {
      throw Boom.notFound('The trip does not exist');
    }

    return trip;
  }

  async create({
    driverId,
    passengerId,
    ...data
  }: CreateTripDto): Promise<Trip> {
    const driver = await this.driverRepository.findOneBy({ id: driverId });
    const passenger = await this.passengerRepository.findOneBy({
      id: passengerId,
    });

    if (!driver || !passenger) {
      throw Boom.notFound('Driver or passenger not found');
    }

    const existingTrip = await this.repository.findActive(
      driverId,
      passengerId,
    );

    if (existingTrip) {
      throw Boom.badData(
        'Driver or passenger has a trip in created or in service status',
      );
    }

    const trip = this.repository.create({
      ...data,
      driver,
      passenger,
    });

    const result = await this.repository.save(trip);

    driver.isActive = false;

    await this.driverRepository.save(driver);

    return result;
  }

  async updateById(id: number, data: UpdateTripDto): Promise<Trip> {
    const trip = await this.repository.findOneBy({ id });

    if (!trip) {
      throw Boom.notFound('The trip does not exist');
    }

    Object.assign(trip, data);

    const result = await this.repository.save(trip);

    if (
      result.status === TripStatus.CANCELLED ||
      result.status === TripStatus.COMPLETED
    ) {
      await this.driverRepository.updateData(result.driverId, {
        isActive: true,
      });
    }

    return result;
  }

  async deleteById(id: number): Promise<Trip> {
    const trip = await this.repository.findOneBy({ id });

    if (!trip) {
      throw Boom.notFound('The trip does not exist');
    }

    await this.repository.delete(id);

    return trip;
  }
}
