import { Injectable } from '@nestjs/common';

/**
 * The main app service.
 * @description This service is the main app service.
 * @class AppService
 * @exports AppService
 */
@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to gaandeweg-server!' };
  }
}
