import { IsEmail } from 'class-validator';

/**
 * A class that represents a login request.
 * @property {string} email - The email of the user attempting to login.
 * @property {string} password - The password of the user attempting to login.
 */
export class LoginDto {
  @IsEmail()
  email: string;

  password: string;
}
