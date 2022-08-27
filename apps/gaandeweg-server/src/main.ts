import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'https://gaandeweg.onrender.com',
        'https://gaandeweg-admin.onrender.com',
        'http://localhost:4200',
        'http://localhost:4201',
      ],
      credentials: true,
    },
  });
  const configService = app.get(ConfigService);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = configService.get<number>('PORT', 3333);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
