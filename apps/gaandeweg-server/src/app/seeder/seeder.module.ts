import { Module } from '@nestjs/common';
import { ExerciseModule } from '../exercise/exercise.module';
import { InfoElementModule } from '../info-element/info-element.module';
import { ModulesModule } from '../modules/modules.module';
import { ProfileModule } from '../profile/profile.module';
import { UserModule } from '../user/user.module';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';

@Module({
  imports: [
    ExerciseModule,
    InfoElementModule,
    ModulesModule,
    ProfileModule,
    UserModule,
  ],
  providers: [SeederService],
  exports: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
