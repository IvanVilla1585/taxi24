import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Trip } from './trip.entity';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';
import { TripRepository } from './trip.repository';
import { DriverRepository } from '../Driver/driver.repository';
import { PassengerRepository } from '../Passenger/passenger.repository';

@Module({
  providers: [
    TripService,
    TripRepository,
    DriverRepository,
    PassengerRepository,
  ],
  exports: [TripRepository],
  controllers: [TripController],
  imports: [TypeOrmModule.forFeature([Trip])],
})
export class TripModule {}
