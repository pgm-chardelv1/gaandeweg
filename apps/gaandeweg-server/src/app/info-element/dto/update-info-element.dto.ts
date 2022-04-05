import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';
import { CreateInfoElementDto } from './create-info-element.dto';

export class UpdateInfoElementDto extends PartialType(CreateInfoElementDto) {
  @IsInt()
  id: number;
}
