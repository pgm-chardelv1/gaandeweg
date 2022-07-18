import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Exercise } from './entities/exercise.entity';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

/**
 * The exercise module.
 *
 * @description This module contains all the exercise related services and controllers.
 * @controllers ExerciseController
 * @providers ExerciseService
 * @exports ExerciseModule
 */
@Module({
  imports: [TypeOrmModule.forFeature([Exercise])],
  controllers: [ExerciseController],
  providers: [ExerciseService],
  exports: [ExerciseService],
})
export class ExerciseModule {}
