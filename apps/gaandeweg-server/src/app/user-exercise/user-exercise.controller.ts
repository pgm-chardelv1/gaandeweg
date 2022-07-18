import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { CreateUserExerciseDto } from './dto/create-user-exercise.dto';
import { UpdateUserExerciseDto } from './dto/update-user-exercise.dto';
import { UserExerciseService } from './user-exercise.service';

@Controller('userExercise')
export class UserExerciseController {
  constructor(private readonly userExerciseService: UserExerciseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createUserExerciseDto: CreateUserExerciseDto) {
    const userExercise = await this.userExerciseService.create(
      createUserExerciseDto
    );
    return userExercise;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async findAll(@Param('userId') userId: string) {
    const userExercises = await this.userExerciseService.findAll(userId);
    return userExercises;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId/:id')
  async findOne(@Param('id') id: number, @Param('userId') userId: string) {
    const userExercise = await this.userExerciseService.findOne(id, userId);
    return userExercise;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':userId/:id')
  async delete(@Param('id') id: number, @Param('userId') userId: string) {
    const userExercise = await this.userExerciseService.remove(id, userId);
    return userExercise;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':userId/:id')
  async update(
    @Param('id') id: number,
    @Param('userId') userId: string,
    @Body() updateUserExerciseDto: UpdateUserExerciseDto
  ) {
    const userExercise = await this.userExerciseService.update(
      id,
      userId,
      updateUserExerciseDto
    );
    return userExercise;
  }
}
