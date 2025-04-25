import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Passenger } from './passenger.entity';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { PassengerRepository } from './passenger.repository';

@Module({
  exports: [PassengerRepository],
  controllers: [PassengerController],
  providers: [PassengerService, PassengerRepository],
  imports: [TypeOrmModule.forFeature([Passenger])],
})
export class PassengerModule {}
