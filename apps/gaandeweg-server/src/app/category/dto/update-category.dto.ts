import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsInt()
  id: number;
}
