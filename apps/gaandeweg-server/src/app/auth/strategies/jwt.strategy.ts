import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';

import { User } from '../../user/entities/user.entity';
import { UserService } from '../../user/user.service';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(validationPayload: {
    email: string;
    sub: string;
  }): Promise<User> | null {
    return this.userService.findUnique({
      where: { email: validationPayload.email },
    });
  }
}
