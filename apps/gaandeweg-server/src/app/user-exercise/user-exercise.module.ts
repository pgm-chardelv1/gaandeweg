import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserExercise } from './entities/user-exercise.entity';
import { UserExerciseController } from './user-exercise.controller';
import { UserExerciseService } from './user-exercise.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserExercise])],
  controllers: [UserExerciseController],
  providers: [UserExerciseService],
  exports: [UserExerciseService],
})
export class UserExerciseModule {}
