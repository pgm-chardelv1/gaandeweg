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
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

/**
 * Controller for profile resource
 *
 * @class ProfileController
 * @description This controller is for the profile resource.
 * @export ProfileController
 */
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  /**
   * Create a new profile.
   *
   * @description This is used to create a new profile.
   * @param {CreateProfileDto} createProfileDto - the profile to create.
   * @returns @returns {Promise<{statusCode: number, message: string, profile: Profile}>} - a promise that resolves to a response object with the profile
   * @memberof ProfileController
   * @method post
   */
  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    const profile = await this.profileService.create(createProfileDto);
    return profile;
  }

  /**
   * Find all profiles.
   *
   * @description This method is used to find all profiles.
   * @returns @returns {Promise<{statusCode: number, message: string, profiles: Profile[]}>} - a promise that resolves to a response object with the profiles
   * @memberof ProfileController
   * @method get
   */
  @Get()
  async findAll() {
    const profiles = await this.profileService.findAll();
    return profiles;
  }

  /**
   * Finds a profile by id.
   *
   * @description This method is used to find a profile by id.
   * @param {string} id - the id of the profile to find.
   * @returns @returns {Promise<{statusCode: number, message: string, profile: Profile}>} - a promise that resolves to a response object with the profile
   * @memberof ProfileController
   * @method get
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const profile = await this.profileService.findOne(id);
    return profile;
  }

  /**
   * Update a profile.
   *
   * @description This method is used to update a profile.
   * @param {string} id - the id of the profile to update.
   * @param {UpdateProfileDto} updateProfileDto - the updated profile.
   * @returns @returns {Promise<{statusCode: number, message: string, profile: Profile}>} - a promise that resolves to a response object with the profile
   * @memberof ProfileController
   * @method patch
   */
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    const profile = await this.profileService.update(id, updateProfileDto);
    return profile;
  }

  /**
   * Delete a profile.
   *
   * @description This method is used to delete a profile.
   * @param {string} id - the id of the profile to delete
   * @returns {Promise<{statusCode: number, message: string, profile: Profile}>} - a promise that resolves to a response object with the profile
   * @memberof ProfileController
   * @method delete
   */
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const profile = await this.profileService.remove(id);
    return profile;
  }
}
