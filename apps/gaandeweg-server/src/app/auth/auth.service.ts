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

  /**
   * Takes in a user object and creates a JWT token for them.
   * @param {User} user - the user object to create a token for.
   * @returns {JWT} - the JWT token for the user.
   */
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

  /**
   * Registers a new user.
   * @param {CreateUserDto} registerDto - the user's information.
   * @returns None
   */
  async register(registerDto: CreateUserDto) {
    const hashedPassword = await this.hashPassword(registerDto.password);
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });
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

  /**
   * Validates the user's credentials.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<User> | null} The user if the credentials are valid, null otherwise.
   */
  async validate(email: string, password: string): Promise<User> | null {
    const user: User = await this.usersService.findUnique({
      where: { email },
    });
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

  /**
   * Validates the user with the given email and password.
   * @param {string} email - the email of the user to validate
   * @param {string} password - the password of the user to validate
   * @returns {Promise<User>} - the user object if the user is valid
   */
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

  /**
   * Hashes a password using bcrypt.
   * @param {string} password - the password to hash.
   * @returns {string} the hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(
      password,
      parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
    );
  }

  /**
   * Compares the given password to the hashed password.
   * @param {string} password - the password to compare
   * @param {string} hashedPassword - the hashed password to compare
   * @returns {boolean} - true if the passwords match, false otherwise
   */
  async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  /**
   * Verifies that the token is valid and returns the user.
   * @param {string} token - the token to verify.
   * @returns {Promise<User>} - the user that the token belongs to.
   */
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
