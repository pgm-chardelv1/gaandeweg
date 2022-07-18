import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

/**
 * Service for profile resource
 *
 * @class ProfileService
 * @description This service contains all the profile related services and controllers.
 * @exports ProfileService
 */
@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>
  ) {}

  /**
   * Creates a new profile.
   * @param {CreateProfileDto} createProfileDto - The profile data to create a new profile.
   * @returns {Promise<Profile>} - The created profile.
   */
  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      const profile: Profile = this.profileRepository.create(createProfileDto);
      await this.profileRepository.save(profile);
      if (!profile) {
        throw new BadRequestException('Profile could not be created');
      }
      return profile;
    } catch (error) {
      Logger.log(`Could not create profile. ${error}`);
    }
  }

  /**
   * Find all profiles in the database.
   * @returns A promise that resolves to an array of profile objects.
   */
  async findAll(): Promise<Profile[]> {
    try {
      const profiles: Profile[] = await this.profileRepository.find();
      /**
       * Takes in an array of objects and returns an array of objects with the password property removed.
       * @param {Array<Object>} profiles - the array of objects to remove the password property from.
       * @returns {Array<Object>} - the array of objects with the password property removed.
       */
      return profiles;
    } catch (error) {
      Logger.log(`Could not find profiles. ${error}`);
    }
  }

  findOne(id: string): Promise<Profile> {
    try {
      const profile: Promise<Profile> = this.profileRepository.findOne(id);
      if (!profile) {
        throw new BadRequestException('Profile could not be found');
      }
      return profile;
    } catch (error) {
      Logger.log(`Could not find profile. ${error}`);
    }
  }

  /**
   * Updates a profile.
   * @param {string} id - the id of the profile to update
   * @param {UpdateProfileDto} updateProfileDto - the profile to update
   * @returns {Promise<Profile>} - the updated profile
   */
  async update(
    id: string,
    updateProfileDto: UpdateProfileDto
  ): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findOne(id);
      if (!profile) {
        throw new BadRequestException(
          'Could not update profile. Profile not found.'
        );
      } else {
        const updatedProfile = await this.profileRepository.preload(
          updateProfileDto
        );
        await this.profileRepository.save(updatedProfile);
        return updatedProfile;
      }
    } catch (error) {
      Logger.log(`Could not update profile. ${error}`);
    }
  }

  /**
   * Removes a profile from the database.
   * @param {string} id - the id of the profile to remove
   * @returns {Promise<Profile>} - the removed profile
   */
  async remove(id: string): Promise<Profile> {
    try {
      const profile = await this.profileRepository.findOne(id);
      if (!profile) {
        throw new BadRequestException('Profile could not be found');
      } else {
        await this.profileRepository.remove(profile);
      }
      return profile;
    } catch (err) {
      Logger.log(`Could not remove profile. ${err}`);
    }
  }
}
