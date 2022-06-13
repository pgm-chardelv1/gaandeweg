import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserExerciseDto {
  @IsNotEmpty()
  @IsUUID()
  readonly userId: string;

  @IsNotEmpty()
  readonly exerciseName: string;

  @IsNotEmpty()
  readonly exerciseTemplate: string;

  @IsNotEmpty()
  readonly exerciseData: string;
}
