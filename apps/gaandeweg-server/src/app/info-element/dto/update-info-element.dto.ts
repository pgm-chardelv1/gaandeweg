import { PartialType } from '@nestjs/mapped-types';
import { IsInt } from 'class-validator';

import { CreateInfoElementDto } from './create-info-element.dto';

/**
 * A partial type that extends the CreateInfoElementDto class.
 *
 * @description This is used to update an info element.
 * @extends CreateInfoElementDto
 * @exports UpdateInfoElementDto
 */
export class UpdateInfoElementDto extends PartialType(CreateInfoElementDto) {
  @IsInt()
  id: number;
}
