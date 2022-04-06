import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';

import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    const user = await this.userService.create({ ...registerDto, type: 1 });
    const { password, id, createdAt, updatedAt, type, ...rest } = user;
    return {
      message: 'Successfully registered',
      user: {
        ...rest,
      },
    };
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validate(
      loginDto.email,
      loginDto.password
    );
    const login = this.authService.login(user);
    return {
      message: 'Successfully logged in',
      access_token: login,
    };
  }
}
