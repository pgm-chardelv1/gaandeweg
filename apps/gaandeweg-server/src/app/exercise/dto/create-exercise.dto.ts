import { IsInt, IsJSON, IsOptional } from 'class-validator';

export class CreateExerciseDto {
  version: string;

  @IsInt()
  categoryId: number;

  name: string;

  summary: string;

  @IsJSON()
  template: string;

  @IsOptional()
  published: boolean;

  @IsOptional()
  publishedBy: string;
}
