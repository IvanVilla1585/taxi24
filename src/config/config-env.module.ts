import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './';
import { envSchema } from '../schemas/env.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [configuration],
      validationSchema: envSchema,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
})
export class ConfigEnvModule {}
