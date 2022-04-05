import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    const exercise = await this.exerciseService.create(createExerciseDto);
    return {
      statusCode: 201,
      message: 'Exercise created successfully',
      exercise,
    };
  }

  @Get()
  async findAll() {
    const exercises = await this.exerciseService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Exercises found successfully',
      exercises,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const exercise = await this.exerciseService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Exercise found successfully',
      exercise,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    const exercise = this.exerciseService.update(+id, updateExerciseDto);
    return {
      statusCode: 204,
      message: 'Exercise updated successfully',
      exercise,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const exercise = await this.exerciseService.remove(+id);
    return {
      statusCode: 204,
      message: 'Exercise removed successfully',
      exercise,
    };
  }
}
