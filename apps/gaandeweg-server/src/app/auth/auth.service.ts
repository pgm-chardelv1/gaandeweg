import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

import { CreateUserDto } from '../user/dto/create-user.dto';

import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private jwtService: JwtService
  ) {}

  login(user: User) {
    const payload = {
      email: user.email,
      sub: {
        id: user.id,
        type: user.type,
      },
      expiresIn: '1d',
    };
    const jwt = this.jwtService.sign(payload);
    return { token: jwt, expiresIn: payload.expiresIn };
  }

  async register(registerDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(registerDto.password);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    return this.login(user);
  }

  async validate(email: string, password: string): Promise<User> | null {
    const user: User = await this.usersService.findUnique({ where: { email } });
    if (!user) {
      return null;
    }

    const passwordIsValid = await this.comparePasswords(
      user.password,
      await this.hashPassword(password)
    );

    if (!passwordIsValid) {
      return user;
    } else {
      Logger.log('Password is invalid');
      return null;
    }
  }

  async validateAdmin(email: string, password: string): Promise<User> | null {
    try {
      const user: User = await this.validate(email, password);
      if (user.type <= 1) {
        Logger.log(
          `User with email ${email} is not an admin, type: ${user.type}`
        );
        return null;
      } else if (user.type === 2 || user.type === 3) {
        Logger.log(
          `Logged in an admin with email ${email}, type: ${user.type}`
        );
        return user;
      } else {
        Logger.log(
          `Unexpected user type: ${user.type} for ${email} attempted to login.`
        );
        return null;
      }
    } catch (err) {
      Logger.log(`Error validating admin: ${err}`);
      return null;
    }
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async verify(token: string): Promise<User> {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    const user = await this.usersService.findUnique({
      where: { email: payload.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
