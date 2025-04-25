import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from '../config';

const config = configuration();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...config.database,
      autoLoadEntities: true,
    }),
  ],
})
export class DataBaseModule {}
