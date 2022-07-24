import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

// #21 CSRF Protection
/* import { Request, Response, NextFunction } from 'express';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf'; */

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:4200',
        'http://localhost:4201',
        'https://gaandeweg.onrender.com',
        'https://gaandeweg-admin.onrender.com',
      ],
      credentials: true,
    },
  });
  const configService = app.get(ConfigService);

  // #21 CSRF protection
  /* const csrfProtection = csurf({ cookie: true });
  app.use(cookieParser()); */

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  // app.enableCors();

  // #21 CSRF protection
  /* app.use(csrfProtection);
  app.use('/csrfEndpoint', csrfProtection, (req: Request, res: Response) => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), { httpOnly: false });
  }); */

  const port = configService.get<number>('PORT', 3333);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
