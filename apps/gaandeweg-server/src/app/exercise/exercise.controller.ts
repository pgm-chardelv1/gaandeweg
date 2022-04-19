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
   * @param {string} id - the id of the exercise to find.
   * @returns {Promise<{statusCode: number, message: string, exercise: Exercise}>} - a promise that resolves to a response object with the exercise
   * @memberof ExerciseController
   * @method get
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const exercise = await this.exerciseService.findOne(+id);
    return exercise[0];
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
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const exercise = await this.exerciseService.remove(+id);
    return exercise;
  }
}
