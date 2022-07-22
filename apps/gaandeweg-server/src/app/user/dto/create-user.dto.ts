import { IsEmail, IsInt, IsOptional, Max, Min } from 'class-validator';

import { UserRole } from '../entities/user.entity';

/**
 * A class that represents the data required for creating a new user.
 *
 * @property {string} email - The user's email.
 * @property {string} password - The user's password.
 * @property {UserRole} [type] - The user's role.
 * @class CreateUserDto
 * @exports CreateUserDto
 */
export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @Min(8)
  @Max(42)
  readonly password: string;

  @IsOptional()
  @IsInt()
  readonly type: UserRole;
}
