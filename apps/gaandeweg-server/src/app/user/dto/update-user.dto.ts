import { PartialType } from '@nestjs/mapped-types';
import { IsUUID } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

/**
 * A partial type of CreateUserDto that only contains the id field.
 *
 * @description This is used to update a user.
 * @extends CreateUserDto
 * @exports UpdateUserDto
 */
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsUUID()
  id: string;
}
