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

/**
 * Controller for info element resource.
 *
 * @description This controller is for the info element resource.
 * @exports InfoElementController
 */
@Controller('info-element')
export class InfoElementController {
  constructor(private readonly infoElementService: InfoElementService) {}

  /**
   * Create a new InfoElement.
   *
   * @description This is used to create a new InfoElement.
   * @param {CreateInfoElementDto} createInfoElementDto - The InfoElement to create.
   * @returns {Promise<{statusCode: number, message: string, infoElement: InfoElement}>} The created InfoElement.
   * @memberof InfoElementController
   * @method post
   */
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

  /**
   * Finds all InfoElements.
   *
   * @description This method is used to find all InfoElements.
   * @returns {Promise<{statusCode: number, message: string, infoElements: InfoElement[]}>} - a promise that resolves to a response object with the InfoElements
   * @memberof InfoElementController
   * @method get
   */
  @Get()
  async findAll() {
    const infoElements = await this.infoElementService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'InfoElements found successfully',
      infoElements,
    };
  }

  /**
   * Finds an info element by id.
   *
   * @description This method is used to find an info element by id.
   * @param {string} id - The id of the info element to find.
   * @returns {Promise<{statusCode: number, message: string, infoElement: InfoElement}>} - a promise that resolves to a response object with the info element
   * @memberof InfoElementController
   * @method get
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const infoElement = await this.infoElementService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'InfoElement found successfully',
      infoElement,
    };
  }

  /**
   * Updates an info element.
   *
   * @description This method is used to update an info element.
   * @param {string} id - The id of the info element to update.
   * @param {UpdateInfoElementDto} updateInfoElementDto - The info element to update.
   * @returns {Promise<{statusCode: number, message: string, infoElement: InfoElement}>} - a promise that resolves to a response object with the updated info element
   * @memberof InfoElementController
   * @method patch
   */
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

  /**
   * Delete an info element.
   *
   * @description This method is used to delete an info element.
   * @param {string} id - The id of the info element to delete.
   * @returns {Promise<{statusCode: number, message: string, infoElement: InfoElement}>} - a promise that resolves to a response object with the deleted info element
   * @memberof InfoElementController
   * @method delete
   */
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
