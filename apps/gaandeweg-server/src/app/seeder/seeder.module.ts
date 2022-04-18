import { Module } from '@nestjs/common';
import { ExerciseModule } from '../exercise/exercise.module';
import { InfoElementModule } from '../info-element/info-element.module';
import { CategoryModule } from '../category/category.module';
import { ProfileModule } from '../profile/profile.module';
import { UserModule } from '../user/user.module';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';

/**
 * The seeder module.
 *
 * @description This module contains all the seeder related services and controllers.
 * @providers SeederService
 * @controllers SeederController
 * @exports SeederModule
 */
@Module({
  imports: [
    ExerciseModule,
    InfoElementModule,
    CategoryModule,
    ProfileModule,
    UserModule,
  ],
  providers: [SeederService],
  exports: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
