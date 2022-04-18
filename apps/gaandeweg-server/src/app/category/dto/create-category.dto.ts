/**
 * A class that represents the data required for creating a new category.
 *
 * @property {string} version - The version of the category.
 * @property {string} name - The name of the category.
 * @property {string} summary - The summary of the category.
 * @property {string} description - The description of the category.
 * @class CreateCategoryDto
 * @exports CreateCategoryDto
 */
export class CreateCategoryDto {
  version: string;

  name: string;

  summary: string;

  description: string;
}
