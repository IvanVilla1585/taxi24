import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(configService.get('PORT') ?? 3000);
}

bootstrap();
