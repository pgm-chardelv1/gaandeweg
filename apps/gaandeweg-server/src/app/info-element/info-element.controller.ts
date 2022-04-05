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
import { InfoElementService } from './info-element.service';
import { CreateInfoElementDto } from './dto/create-info-element.dto';
import { UpdateInfoElementDto } from './dto/update-info-element.dto';

@Controller('info-element')
export class InfoElementController {
  constructor(private readonly infoElementService: InfoElementService) {}

  @Post()
  async create(@Body() createInfoElementDto: CreateInfoElementDto) {
    const infoElement = await this.infoElementService.create(
      createInfoElementDto
    );
    return {
      statusCode: 201,
      message: 'InfoElement created successfully',
      infoElement,
    };
  }

  @Get()
  async findAll() {
    const infoElements = await this.infoElementService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'InfoElements found successfully',
      infoElements,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const infoElement = await this.infoElementService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'InfoElement found successfully',
      infoElement,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInfoElementDto: UpdateInfoElementDto
  ) {
    const infoElement = await this.infoElementService.update(
      +id,
      updateInfoElementDto
    );
    return {
      statusCode: 204,
      message: 'InfoElement updated successfully',
      infoElement,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const infoElement = await this.infoElementService.remove(+id);
    return {
      statusCode: 204,
      message: 'InfoElement removed successfully',
      infoElement,
    };
  }
}
