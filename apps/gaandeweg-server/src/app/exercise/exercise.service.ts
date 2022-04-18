import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

/**
 * Service for exercise resource.
 *
 * @description This service contains all the exercise related services and controllers.
 * @exports ExerciseService
 */
@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>
  ) {}

  /**
   * Creates a new exercise.
   * @param {CreateExerciseDto} createExerciseDto - The exercise to create.
   * @returns {Promise<Exercise>} The created exercise.
   */
  async create(createExerciseDto: CreateExerciseDto) {
    try {
      const exercise = this.exerciseRepository.create(createExerciseDto);
      await this.exerciseRepository.save(exercise);
      if (!exercise) {
        throw new BadRequestException('Exercise could not be created');
      }
      return exercise;
    } catch (err) {
      Logger.log(`Could not create exercise. ${err}`);
    }
  }

  /**
   * Find all exercises in the database.
   * @returns {Promise<Exercise[]>}
   */
  async findAll() {
    try {
      const exercises = this.exerciseRepository.find();
      return exercises;
    } catch (err) {
      Logger.log(`Could not find exercises. ${err}`);
    }
  }

  /**
   * Finds an exercise by id.
   * @param {number} id - the id of the exercise to find
   * @returns {Promise<Exercise>} - the exercise that was found
   */
  async findOne(id: number) {
    try {
      const exercise = this.exerciseRepository.findOne(id);
      if (!exercise) {
        throw new BadRequestException('Exercise could not be found');
      }
      return exercise;
    } catch (err) {
      Logger.log(`Could not find exercise. ${err}`);
    }
  }

  /**
   * Updates an exercise.
   * @param {number} id - The id of the exercise to update.
   * @param {UpdateExerciseDto} updateExerciseDto - The exercise to update.
   * @returns {Promise<Exercise>} The updated exercise.
   */
  async update(id: number, updateExerciseDto: UpdateExerciseDto) {
    try {
      const exercise = await this.exerciseRepository.findOne(id);
      if (!exercise) {
        throw new BadRequestException('Exercise could not be found.');
      } else {
        const updatedExercise = await this.exerciseRepository.preload(
          updateExerciseDto
        );
        await this.exerciseRepository.save(updatedExercise);
        return updatedExercise;
      }
    } catch (err) {
      Logger.log(`Could not update exercise. ${err}`);
    }
  }

  /**
   * Removes the exercise with the given id.
   * @param {number} id - the id of the exercise to remove
   * @returns None
   */
  async remove(id: number) {
    try {
      const exercise = await this.exerciseRepository.findOne(id);
      if (!exercise) {
        throw new BadRequestException('Exercise could not be found');
      } else {
        await this.exerciseRepository.remove(exercise);
      }
      return exercise;
    } catch (err) {
      Logger.log(`Could not remove exercise. ${err}`);
    }
  }
}
