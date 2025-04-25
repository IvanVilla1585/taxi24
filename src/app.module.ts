import { Module } from '@nestjs/common';

// modules
import { DataBaseModule } from './db/database.module';
import { TripModule } from './entities/Trip/trip.module';
import { ConfigEnvModule } from './config/config-env.module';
import { DriverModule } from './entities/Driver/driver.module';
import { PassengerModule } from './entities/Passenger/passenger.module';

@Module({
  imports: [
    ConfigEnvModule,
    DataBaseModule,
    DriverModule,
    PassengerModule,
    TripModule,
  ],
})
export class AppModule {}
