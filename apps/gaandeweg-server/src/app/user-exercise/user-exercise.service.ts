import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { scrypt, createCipheriv, createDecipheriv } from 'crypto';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import * as dotenv from 'dotenv';

import { CreateUserExerciseDto } from './dto/create-user-exercise.dto';
import { UpdateUserExerciseDto } from './dto/update-user-exercise.dto';
import { UserExercise } from './entities/user-exercise.entity';

@Injectable()
export class UserExerciseService {
  private iv = process.env.IV;
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
      await this.userExerciseRepository.save({
        ...userExercise,
        exerciseData: await this.encryptData(
          createUserExerciseDto.exerciseData
        ),
      });
      if (!userExercise) {
        throw new BadRequestException('UserExercise could not be created');
      }
      return userExercise;
    } catch (err) {
      Logger.log(
        `Could not create userExercise. ${err} ${JSON.stringify(
          createUserExerciseDto
        )}`
      );
    }
  }

  /**
   * Find all userExercises.
   * @param {string} userId - the id of the user
   * @returns {Promise<UserExercise[]>}
   */
  async findAll(userId: string): Promise<UserExercise[]> {
    try {
      console.log(userId);
      const userExercises = this.userExerciseRepository.find({
        where: { userId: userId },
      });
      return userExercises;
    } catch (err) {
      Logger.log(`Could not find userExercises today. ${err}`);
    }
  }

  /**
   * Finds a userExercise by id.
   * @param {number} id - the id of the userExercise to find
   * @param {string} userId - the id of the user
   * @returns {Promise<UserExercise>} - the userExercise with the given id
   */
  async findOne(id: number, userId: string): Promise<any> {
    try {
      const userExercise = await this.userExerciseRepository.findOne({
        where: { id },
      });

      if (!userExercise) {
        throw new BadRequestException('UserExercise could not be found');
      } else if (userExercise.userId !== userId) {
        throw new UnauthorizedException();
      } else {
        const crypt = await this.decryptData(userExercise.exerciseData);
        return {
          ...userExercise,
          exerciseData: crypt,
        };
      }
    } catch (err) {
      Logger.log(`Could not find userExercise. ${err.message}`);
    }
  }

  /**
   * Updates a userExercise.
   * @param {number} id - the id of the userExercise to update
   * @param {string} userId - the id of the user
   * @param {UpdateUserExerciseDto} updateUserExerciseDto - the userExercise to update
   * @returns {Promise<UserExercise>} - the updated userExercise
   */
  async update(
    id: number,
    updateUserExerciseDto: UpdateUserExerciseDto,
    userId: string
  ): Promise<UserExercise> {
    try {
      const userExercise = await this.userExerciseRepository.findOne({
        where: { id },
      });
      if (!userExercise) {
        throw new BadRequestException('UserExercise could not be found');
      } else if (userExercise.userId !== userId) {
        throw new UnauthorizedException();
      } else {
        this.userExerciseRepository.merge(userExercise, updateUserExerciseDto);
        await this.userExerciseRepository.save({
          ...userExercise,
          exerciseData: await this.encryptData(
            updateUserExerciseDto.exerciseData
          ),
        });
        return userExercise;
      }
    } catch (err) {
      Logger.log(`Could not update userExercise. ${err}`);
    }
  }

  /**
   * Deletes a userExercise from the database.
   * @param {number} id - the id of the userExercise to delete
   * @param {string} userId - the id of the user
   * @returns {Promise<UserExercise>} - the deleted userExercise
   */
  async remove(id: number, userId: string): Promise<UserExercise> {
    try {
      const userExercise = await this.userExerciseRepository.findOne({
        where: { id },
      });
      if (!userExercise) {
        throw new BadRequestException('UserExercise could not be found');
      } else if (userExercise.userId !== userId) {
        throw new UnauthorizedException();
      } else {
        await this.userExerciseRepository.remove(userExercise);
        return userExercise;
      }
    } catch (err) {
      Logger.log(`Could not delete userExercise. ${err}`);
    }
  }

  /**
   * Encrypts the given data using the given key.
   * @param {string} data - the data to encrypt
   * @returns {string} the encrypted data
   */
  async encryptData(data: string) {
    try {
      let returnData = '';
      // const iv = randomBytes(16);
      const key = (await promisify(scrypt)(
        `${process.env.ENC_SECRET}`,
        'salt',
        32
      )) as Buffer;
      const cipher = createCipheriv('aes-256-cbc', key, this.iv);

      returnData = Buffer.concat([
        cipher.update(data, 'utf8'),
        cipher.final(),
      ]).toString('hex');

      return returnData;
    } catch (err) {
      Logger.log(`Could not encrypt data. ${err.message}`);
    }
  }

  /**
   * Decrypts the given data using the ENC_SECRET environment variable.
   * @param {string} data - the data to decrypt
   * @returns {Promise<string>} the decrypted data
   */
  async decryptData(data: string): Promise<string> {
    let returnData = '';
    const key = (await promisify(scrypt)(
      `${process.env.ENC_SECRET}`,
      'salt',
      32
    )) as Buffer;
    const decipher = createDecipheriv('aes-256-cbc', key, this.iv);

    returnData = Buffer.concat([
      decipher.update(data, 'hex'),
      decipher.final(),
    ]).toString('utf8');

    return returnData;
  }
}
