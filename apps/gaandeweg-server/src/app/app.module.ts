import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModulesService } from './modules/modules.service';
import { ModulesController } from './modules/modules.controller';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [ModulesModule],
  controllers: [AppController, ModulesController],
  providers: [AppService, ModulesService],
})
export class AppModule {}
