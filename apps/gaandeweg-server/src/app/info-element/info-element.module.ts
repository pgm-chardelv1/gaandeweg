import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InfoElement } from './entities/info-element.entity';
import { InfoElementController } from './info-element.controller';
import { InfoElementService } from './info-element.service';

/**
 * The info element module.
 *
 * @description This module contains all the info element related services and controllers.
 * @controllers InfoElementController
 * @providers InfoElementService
 * @exports InfoElementModule
 */
@Module({
  imports: [TypeOrmModule.forFeature([InfoElement])],
  controllers: [InfoElementController],
  providers: [InfoElementService],
  exports: [InfoElementService],
})
export class InfoElementModule {}
