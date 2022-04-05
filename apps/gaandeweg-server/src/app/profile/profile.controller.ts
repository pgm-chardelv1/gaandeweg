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

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(@Body() createProfileDto: CreateProfileDto) {
    const profile = await this.profileService.create(createProfileDto);
    return {
      statusCode: 201,
      message: 'Profile created successfully',
      profile,
    };
  }

  @Get()
  async findAll() {
    const profiles = await this.profileService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Profiles found successfully',
      profiles,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const profile = await this.profileService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Profile found successfully',
      profile,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    const profile = await this.profileService.update(id, updateProfileDto);
    return {
      statusCode: 204,
      message: 'Profile updated successfully',
      profile,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const profile = await this.profileService.remove(id);
    return {
      statusCode: 204,
      message: 'Profile deleted successfully',
      profile,
    };
  }
}
