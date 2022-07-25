import { IsInt, IsJSON, IsOptional } from 'class-validator';

/**
 * A class that represents the data that is sent to the server when creating a new exercise.
 *
 * @property {string} version - The version of the exercise.
 * @property {number} categoryId - The id of the category the exercise belongs to.
 * @property {string} name - The name of the exercise.
 * @property {string} summary - The summary of the exercise.
 * @property {string} template - The template of the exercise.
 * @optional @property {string} publishedById - The id of the user who published the exercise.
 * @optional @property {number} published - Whether the exercise is published.
 * @class CreateExerciseDto
 * @exports CreateExerciseDto
 */
export class CreateExerciseDto {
  version: string;

  @IsInt()
  categoryId: number;

  name: string;

  summary: string;

  @IsJSON()
  template: string;

  @IsOptional()
  publishedBy: string;
}
