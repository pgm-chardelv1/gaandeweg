import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserExerciseDto } from './dto/create-user-exercise.dto';
import { UpdateUserExerciseDto } from './dto/update-user-exercise.dto';
import { UserExercise } from './entities/user-exercise.entity';

@Injectable()
export class UserExerciseService {
  constructor(
    @InjectRepository(UserExercise)
    private readonly userExerciseRepository: Repository<UserExercise>
  ) {}

  /**
   * Creates a new UserExercise.
   * @param {CreateUserExerciseDto} createUserExerciseDto - The UserExercise to create.
   * @returns {Promise<UserExercise>} The created UserExercise.
   */
  async create(
    createUserExerciseDto: CreateUserExerciseDto
  ): Promise<UserExercise> {
    try {
      const userExercise = this.userExerciseRepository.create(
        createUserExerciseDto
      );
      await this.userExerciseRepository.save(userExercise);
      if (!userExercise) {
        throw new BadRequestException('UserExercise could not be created');
      }
      return userExercise;
    } catch (err) {
      Logger.log(`Could not create userExercise. ${err}`);
    }
  }

  /**
   * Find all userExercises.
   * @returns {Promise<UserExercise[]>}
   */
  async findAll(): Promise<UserExercise[]> {
    try {
      const userExercises = this.userExerciseRepository.find();
      return userExercises;
    } catch (err) {
      Logger.log(`Could not find userExercises. ${err}`);
    }
  }

  /**
   * Finds a userExercise by id.
   * @param {number} id - the id of the userExercise to find
   * @returns {Promise<UserExercise>} - the userExercise with the given id
   */
  async findOne(id: number): Promise<UserExercise> {
    try {
      const userExercise = this.userExerciseRepository.findOne(id);
      if (!userExercise) {
        throw new BadRequestException('UserExercise could not be found');
      }
      return userExercise;
    } catch (err) {
      Logger.log(`Could not find userExercise. ${err}`);
    }
  }

  /**
   * Updates a userExercise.
   * @param {number} id - the id of the userExercise to update
   * @param {UpdateUserExerciseDto} updateUserExerciseDto - the userExercise to update
   * @returns {Promise<UserExercise>} - the updated userExercise
   */
  async update(
    id: number,
    updateUserExerciseDto: UpdateUserExerciseDto
  ): Promise<UserExercise> {
    try {
      const userExercise = await this.userExerciseRepository.findOne(id);
      if (!userExercise) {
        throw new BadRequestException('UserExercise could not be found');
      }
      this.userExerciseRepository.merge(userExercise, updateUserExerciseDto);
      await this.userExerciseRepository.save(userExercise);
      return userExercise;
    } catch (err) {
      Logger.log(`Could not update userExercise. ${err}`);
    }
  }

  /**
   * Deletes a userExercise from the database.
   * @param {number} id - the id of the userExercise to delete
   * @returns {Promise<UserExercise>} - the deleted userExercise
   */
  async remove(id: number): Promise<UserExercise> {
    try {
      const userExercise = await this.userExerciseRepository.findOne(id);
      if (!userExercise) {
        throw new BadRequestException('UserExercise could not be found');
      }
      await this.userExerciseRepository.remove(userExercise);
      return userExercise;
    } catch (err) {
      Logger.log(`Could not delete userExercise. ${err}`);
    }
  }
}
