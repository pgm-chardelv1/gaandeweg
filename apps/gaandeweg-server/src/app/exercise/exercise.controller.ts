import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ExerciseService } from './exercise.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

/**
 * Controller for exercise resource
 *
 * @description This controller is for the exercise resource.
 * @class ExerciseController
 * @exports ExerciseController
 */
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  /**
   * Create a new Exercise.
   *
   * @description This is used to create a new Exercise.
   * @param {CreateExerciseDto} createExerciseDto - the Exercise to create.
   * @returns {Promise<{statusCode: number, message: string, exercise: Exercise}>} - a promise that resolves to a response object with the Exercise
   * @memberof ExerciseController
   * @method post
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createExerciseDto: CreateExerciseDto) {
    const exercise = await this.exerciseService.create(createExerciseDto);
    exercise;
  }

  /**
   * Find all exercises.
   *
   * @description This method is used to find all exercises.
   * @returns {Promise<{statusCode: number, message: string, exercises: Exercise[]}>} - a promise that resolves to a response object with the exercises
   * @memberof ExerciseController
   * @method get
   */
  @Get()
  async findAll() {
    const exercises = await this.exerciseService.findAll();
    return exercises;
  }

  /**
   * Find an exercise by id.
   *
   * @description This method is used to find an exercise by id.
   * @param {number} id - the id of the exercise to find.
   * @returns {Promise<{statusCode: number, message: string, exercise: Exercise}>} - a promise that resolves to a response object with the exercise
   * @memberof ExerciseController
   * @method get
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const exercise = await this.exerciseService.findOne(id);
    return exercise;
  }

  /**
   * Update an exercise.
   *
   * @description This method is used to update an exercise.
   * @param {string} id - the id of the exercise to update.
   * @param {UpdateExerciseDto} updateExerciseDto - the exercise to update.
   * @returns {Promise<{statusCode: number, message: string, exercise: Exercise}>} - a promise that resolves to a response object with the exercise
   * @memberof ExerciseController
   * @method patch
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto
  ) {
    const exercise = this.exerciseService.update(+id, updateExerciseDto);
    return exercise;
  }

  /**
   * Delete an exercise.
   *
   * @description This method is used to delete an exercise.
   * @param {string} id - the id of the exercise to delete.
   * @returns {Promise<{statusCode: number, message: string, exercise: Exercise}>} - a promise that resolves to a response object with the exercise
   * @memberof ExerciseController
   * @method delete
   */
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const exercise = await this.exerciseService.remove(+id);
    return exercise;
  }
}
