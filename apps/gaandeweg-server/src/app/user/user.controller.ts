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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

/**
 * Controller for user resource
 *
 * @class UserController
 * @description This controller is for the user resource.
 * @export UserController
 */
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Create a new user.
   *
   * @description This is used to create a new user.
   * @param {CreateUserDto} createUserDto - The user to create.
   * @returns {Promise<{statusCode: number, message: string, user: User}>} - a promise that resolves to a response object with the user
   * @memberof UserController
   * @method post
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return {
      statusCode: 201,
      message: 'User created successfully',
      user,
    };
  }

  /**
   * Finds all users.
   *
   * @description This method is used to find all users.
   * @returns {Promise<{statusCode: number, message: string, users: User[]}>} - a promise that resolves to a response object with the users
   * @memberof UserController
   * @method get
   */
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users found successfully',
      users,
    };
  }

  /**
   * Finds a user by id.
   *
   * @description This method is used to find a user by id.
   * @param {string} id - The id of the user to find.
   * @returns {Promise<{statusCode: number, message: string, user: User}>} - a promise that resolves to a response object with the user
   * @memberof UserController
   * @method get
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (user) {
      return {
        statusCode: HttpStatus.OK,
        message: 'User found successfully',
      };
    } else {
      return {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Could not find User',
      };
    }
  }

  /**
   * Update a user.
   *
   * @description This method updates a user.
   * @param {string} id - the id of the user to update
   * @param {UpdateUserDto} updateUserDto - the user data to update
   * @returns {Promise<{statusCode: number, message: string, user: User}>} - a promise that resolves to a response object with the user
   * @memberof UserController
   * @method patch
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(id, updateUserDto);
    return {
      statusCode: 204,
      message: 'User updated successfully',
      user,
    };
  }

  /**
   * Delete a user.
   *
   * @description This method deletes a user.
   * @param {string} id - the id of the user to delete
   * @returns {Promise<{statusCode: number, message: string, user: User}>} - a promise that resolves to a response object with the user
   * @memberof UserController
   * @method delete
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    return {
      statusCode: 204,
      message: 'User deleted successfully',
      user,
    };
  }
}
