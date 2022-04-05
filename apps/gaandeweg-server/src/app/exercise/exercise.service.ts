import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>
  ) {}

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

  async findAll() {
    try {
      const exercises = this.exerciseRepository.find();
      return exercises;
    } catch (err) {
      Logger.log(`Could not find exercises. ${err}`);
    }
  }

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
