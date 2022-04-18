import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateProfileDto } from './create-profile.dto';

/**
 * A partial type that extends the CreateProfileDto class.
 *
 * @description This is used to update a profile.
 * @extends CreateProfileDto
 * @exports UpdateProfileDto
 */
export class UpdateProfileDto extends PartialType(CreateProfileDto) {
  @IsUUID()
  id: string;
}
