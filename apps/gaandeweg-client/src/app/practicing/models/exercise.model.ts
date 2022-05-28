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
  category?: Category;
}

/**
 * A Category object.
 * @property {number} id - The ID of the category.
 * @property {string} version - The version of the category.
 * @property {string} name - The name of the category.
 * @property {string} summary - A short summary of the category.
 * @property {string} description - A long description of the category.
 * @property {string} createdAt - The date the category was created.
 * @property {string} updatedAt - The date the category was last updated.
 * @property {string} publishedAt - The date the category was published.
 * @property {Exercise[]} exercises - The exercises in the category.
 */
export interface Category {
  id: number;
  version: string;
  name: string;
  summary: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  updatedBy: string;
}

export interface ExerciseForm {
  fields: ExerciseFormField[];
}

export interface ExerciseFormField {
  fieldId: number;
  fieldType: string;
  fieldName: string;
  fieldText: string;
  fieldInfo?: string;
  subFields?: ExerciseFormField[];
  fieldValues?: string[];
  extraField?: boolean;
}
