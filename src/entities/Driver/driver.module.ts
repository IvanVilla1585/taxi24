import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Driver } from './driver.entity';
import { DriverService } from './driver.service';
import { DriverController } from './driver.controller';
import { DriverRepository } from './driver.repository';

@Module({
  exports: [DriverRepository],
  controllers: [DriverController],
  providers: [DriverService, DriverRepository],
  imports: [TypeOrmModule.forFeature([Driver])],
})
export class DriverModule {}
