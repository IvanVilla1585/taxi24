import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { Trip } from './trip.entity';
import { FiltersTripDto } from '../../types/dtos/trip.dto';
import { TripStatus } from '../../types/enums/status.enum';

@Injectable()
export class TripRepository extends Repository<Trip> {
  constructor(private dataSource: DataSource) {
    super(Trip, dataSource.createEntityManager());
  }
  findAndPaginate({
    limit,
    offset,
    status,
    sortBy,
    endTime,
    startTime,
    direction,
    driverName,
    passengerName,
  }: FiltersTripDto) {
    const query = this.createQueryBuilder('trip')
      .leftJoinAndSelect('trip.driver', 'driver')
      .leftJoinAndSelect('trip.passenger', 'passenger');

    if (driverName) {
      query.andWhere('LOWER(driver.name) ILIKE LOWER(:driverName)', {
        driverName: `%${driverName}%`,
      });
    }

    if (passengerName) {
      query.andWhere('LOWER(passenger.name) ILIKE LOWER(:passengerName)', {
        passengerName: `%${passengerName}%`,
      });
    }

    if (status) {
      query.andWhere('trip.status = :status', { status });
    }

    if (startTime) {
      query.andWhere('trip.startTime >= :startTime', { startTime });
    }

    if (endTime) {
      query.andWhere('trip.endTime <= :endTime', { endTime });
    }

    query.orderBy(`trip.${sortBy}`, direction).skip(offset).take(limit);

    return query.getManyAndCount();
  }

  findActive(driverId: number, passengerId: number): Promise<Trip | null> {
    const statuses = [TripStatus.CREATED, TripStatus.IN_SERVICE];

    return this.createQueryBuilder('trip')
      .where('trip.driverId = :driverId AND trip.status IN (:...statuses)', {
        driverId,
        statuses,
      })
      .orWhere(
        'trip.passengerId = :passengerId AND trip.status IN (:...statuses)',
        {
          statuses,
          passengerId,
        },
      )
      .getOne();
  }
}
