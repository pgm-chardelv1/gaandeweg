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
  @Get()
  async findAll() {
    const userExercises = await this.userExerciseService.findAll();
    return userExercises;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const userExercise = await this.userExerciseService.findOne(id);
    return userExercise;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    const userExercise = await this.userExerciseService.remove(id);
    return userExercise;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserExerciseDto: UpdateUserExerciseDto
  ) {
    const userExercise = await this.userExerciseService.update(
      id,
      updateUserExerciseDto
    );
    return userExercise;
  }
}
