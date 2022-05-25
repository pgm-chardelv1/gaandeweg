import { Category } from './category.model';
/**
 * The Exercise interface.
 * @interface
 * @property {number} id - The id of the exercise.
 * @property {string} version - The version of the exercise.
 * @property {number} categoryId - The id of the category.
 * @property {string} name - The name of the exercise.
 * @property {string} summary - The summary of the exercise.
 * @property {string} template - The template of the exercise.
 * @property {Date} createdAt - The date the exercise was created.
 * @property {Date} updatedAt - The date the exercise was updated.
 * @property {Category} category - The category the exercise belongs to.
 */
export interface Exercise {
  id: number;
  version: string;
  categoryId: number;
  name: string;
  summary: string;
  template: string;
  createdAt: Date;
  updatedAt: Date;
  published: boolean;
  publishedBy: string;
  category: Category;
}

export interface ExerciseForm {
  fields: ExerciseFormField[];
}

export interface ExerciseFormField {
  fieldId: number;
  fieldType: string;
  fieldName: string;
  fieldText: string;
  fieldValues?: string;
  extraField?: boolean;
}
