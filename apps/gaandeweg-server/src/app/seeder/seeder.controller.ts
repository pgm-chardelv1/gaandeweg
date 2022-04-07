import { Controller, Get } from '@nestjs/common';

import { SeederService } from './seeder.service';

@Controller('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Get()
  async seed() {
    const seeded = await this.seederService.startSeed()
    if (seeded) return {
      statusCode: 200,
      message: 'Seeded successfully'
    }
  }
}
