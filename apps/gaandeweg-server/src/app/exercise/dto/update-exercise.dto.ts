import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateExerciseDto } from './create-exercise.dto';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
  @IsInt()
  id: number;
}
