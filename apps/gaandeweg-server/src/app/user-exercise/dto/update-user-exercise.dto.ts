import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';

import { CreateUserExerciseDto } from './create-user-exercise.dto';

export class UpdateUserExerciseDto extends PartialType(CreateUserExerciseDto) {
  @IsInt()
  id: number;
}
