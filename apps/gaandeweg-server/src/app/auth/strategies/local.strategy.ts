import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  /**
   * Validates the user's credentials.
   * @param {string} email - the user's email address
   * @param {string} password - the user's password
   * @returns {Promise<User>} - the user object
   */
  async validate(email: string, password: string): Promise<User> {
    const user = this.authService.validate(email, password);
    if (!user) {
      throw new UnauthorizedException('Validation failed');
    }

    return user;
  }
}
