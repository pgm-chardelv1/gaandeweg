import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserExerciseDto } from './dto/create-user-exercise.dto';
import { UpdateUserExerciseDto } from './dto/update-user-exercise.dto';
import { UserExerciseService } from './user-exercise.service';

@Controller('userExercise')
export class UserExerciseController {
  constructor(private readonly userExerciseService: UserExerciseService) {}

  @Post()
  async create(@Body() createUserExerciseDto: CreateUserExerciseDto) {
    const userExercise = await this.userExerciseService.create(
      createUserExerciseDto
    );
    return userExercise;
  }

  @Get()
  async findAll() {
    const userExercises = await this.userExerciseService.findAll();
    return userExercises;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const userExercise = await this.userExerciseService.findOne(id);
    return userExercise;
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const userExercise = await this.userExerciseService.remove(id);
    return userExercise;
  }

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
