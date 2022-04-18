import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserInterface } from './entities/user.entity';

/**
 * Service for user resource
 *
 * @description This service contains all the user related services and controllers.
 * @exports UserService
 * @class UserService
 */
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  /**
   * Creates a new user.
   * @param {CreateUserDto} createUserDto - The user data to create a new user.
   * @returns {Promise<User>} - The created user.
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user: User = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      if (!user) {
        throw new BadRequestException('User could not be created');
      }
      return user;
    } catch (error) {
      Logger.log(`Could not create user. ${error}`);
    }
  }

  /**
   * Creates a user if one doesn't exist.
   * @param {object} where - The where clause to find the user.
   * @param {CreateUserDto} data - The data to create the user with.
   * @returns {Promise<User>} - The user that was created.
   */
  async createIfDoesntExist(data: {
    where: object;
    data: CreateUserDto;
  }): Promise<User> {
    try {
      const user = await this.userRepository.findOne(data.where);
      if (!user) {
        const newUser = await this.userRepository.create(data.data);
        await this.userRepository.save(newUser);
        return newUser;
      }
      return user;
    } catch (error) {
      Logger.log(`Could not create user. ${error}`);
    }
  }

  /**
   * Find all users in the database.
   * @returns A promise that resolves to an array of user objects.
   */
  async findAll(): Promise<UserInterface[]> {
    try {
      const users: User[] = await this.userRepository.find();
      /**
       * Takes in an array of objects and returns an array of objects with the password property removed.
       * @param {Array<Object>} users - the array of objects to remove the password property from.
       * @returns {Array<Object>} - the array of objects with the password property removed.
       */
      return users.map((user: User) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { email, password, ...rest } = user;
        return rest;
      });
    } catch (error) {
      Logger.log(`Could not find users. ${error}`);
    }
  }

  /**
   * Finds a user by their id.
   * @param {string} id - the id of the user to find
   * @returns {Promise<User>} - the user with the given id
   */
  findOne(id: string): Promise<User> {
    try {
      const user: Promise<User> = this.userRepository.findOne(id);
      if (!user) {
        throw new BadRequestException('User could not be found');
      }
      return user;
    } catch (error) {
      Logger.log(`Could not find user. ${error}`);
    }
  }

  /**
   * Finds a user in the database.
   * @param {object} data - The data to search for.
   * @returns {Promise<User>} - The user that was found.
   */
  async findUnique(data: { where: object }): Promise<User> {
    try {
      const user = await this.userRepository.findOne(data);
      if (!user) {
        throw new BadRequestException('User could not be found');
      }
      return user;
    } catch (error) {
      Logger.log(`Could not find user. ${error}`);
    }
  }

  /**
   * Updates a user with the given updateUserDto.
   * @param {string} id - the id of the user to update
   * @param {UpdateUserDto} updateUserDto - the updateUserDto to update the user with
   * @returns {Promise<User>} - the updated user
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new BadRequestException('Could not update user. User not found.');
      } else {
        const updatedUser = await this.userRepository.preload(updateUserDto);
        await this.userRepository.save(updatedUser);
        return updatedUser;
      }
    } catch (error) {
      Logger.log(`Could not update user. ${error}`);
    }
  }

  /**
   * Removes a user from the database.
   * @param {string} id - the id of the user to remove
   * @returns {Promise<User>} - the user that was removed
   */
  async remove(id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne(id);
      if (!user) {
        throw new BadRequestException('User could not be found');
      } else {
        await this.userRepository.remove(user);
      }
      return user;
    } catch (err) {
      Logger.log(`Could not remove user. ${err}`);
    }
  }
}
