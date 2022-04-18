import { Controller, Get } from '@nestjs/common';

import { SeederService } from './seeder.service';

/**
 * A controller that handles the seeding of the database.
 * @param {SeederService} seederService - The seeder service to use.
 * @exports SeederController
 */
@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  /**
   * A function that seeds the database with data.
   *
   * @description This function seeds the database with data.
   * @returns {Promise<void> | Promise<{statusCode: number, message: string}>} A promise that resolves when the seeding is done.
   * @memberof SeederController
   * @method get
   */
  @Get()
  async seed() {
    const seeded = await this.seederService.startSeed();
    if (seeded)
      return {
        statusCode: 200,
        message: 'Seeded successfully',
      };
  }
}
