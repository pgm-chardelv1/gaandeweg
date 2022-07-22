import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

/**
 * The main app controller.
 * @description This controller is the main app controller.
 * @class AppController
 * @exports AppController
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
