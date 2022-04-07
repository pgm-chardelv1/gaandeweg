import { Module } from '@nestjs/common';
import { InfoElementService } from './info-element.service';
import { InfoElementController } from './info-element.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InfoElement } from './entities/info-element.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InfoElement])],
  controllers: [InfoElementController],
  providers: [InfoElementService],
  exports: [InfoElementService],
})
export class InfoElementModule {}