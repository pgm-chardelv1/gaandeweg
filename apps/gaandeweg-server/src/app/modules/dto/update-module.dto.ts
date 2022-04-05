import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateModuleDto } from './create-module.dto';

export class UpdateModuleDto extends PartialType(CreateModuleDto) {
  @IsInt()
  id: number;
}
