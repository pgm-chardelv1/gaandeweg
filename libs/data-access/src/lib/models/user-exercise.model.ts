/**
 * A user's exercise.
 * @property {number} id - The id of the exercise.
 * @property {string} userId - The id of the user who owns the exercise.
 * @property {string} exerciseName - The name of the exercise.
 * @property {string} exerciseTemplate - The template of the exercise.
 * @property {string} exerciseData - The data of the exercise.
 * @property {Date} createdAt - The date the exercise was created.
 * @property {Date} updatedAt - The date the exercise was last updated.
 */
export interface UserExercise {
  id?: number;
  userId: string;
  exerciseName: string;
  exerciseTemplate: string;
  exerciseData: string;
  createdAt?: Date;
  updatedAt?: Date;
}
