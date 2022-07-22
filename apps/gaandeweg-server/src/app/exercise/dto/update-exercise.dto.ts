import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';

import { CreateExerciseDto } from './create-exercise.dto';

/**
 * A partial type that extends the CreateExerciseDto class.
 *
 * @description This is used to update an exercise.
 * @extends CreateExerciseDto
 * @exports UpdateExerciseDto
 */
export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
  @IsInt()
  id: number;
}
