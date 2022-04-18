import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

/**
 * A partial type of CreateCategoryDto that only contains the id field.
 *
 * @description This is used to update a category.
 * @extends CreateCategoryDto
 * @exports UpdateCategoryDto
 */
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsInt()
  id: number;
}
