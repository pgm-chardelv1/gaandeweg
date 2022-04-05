import { IsEmail, IsInt, IsOptional, Max, Min } from 'class-validator';
import { UserRole } from '../entities/user.entity';

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
