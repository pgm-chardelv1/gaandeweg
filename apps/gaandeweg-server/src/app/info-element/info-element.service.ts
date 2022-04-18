import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateInfoElementDto } from './dto/create-info-element.dto';
import { UpdateInfoElementDto } from './dto/update-info-element.dto';
import { InfoElement } from './entities/info-element.entity';

/**
 * Service for info element resource.
 *
 * @description This service contains all the info element related services and controllers.
 * @exports InfoElementService
 */
@Injectable()
export class InfoElementService {
  constructor(
    @InjectRepository(InfoElement)
    private readonly infoElementRepository: Repository<InfoElement>
  ) {}

  /**
   * Creates a new InfoElement.
   * @param {CreateInfoElementDto} createInfoElementDto - The data to create the InfoElement with.
   * @returns {Promise<InfoElement>} The created InfoElement.
   */
  async create(createInfoElementDto: CreateInfoElementDto) {
    try {
      const infoElement =
        this.infoElementRepository.create(createInfoElementDto);
      await this.infoElementRepository.save(infoElement);
      if (!infoElement) {
        throw new BadRequestException('InfoElement could not be created');
      }
      return infoElement;
    } catch (error) {
      Logger.log(`Could not create info element. ${error}`);
    }
  }

  /**
   * Find all info elements.
   * @returns {InfoElement[]} - An array of all info elements.
   */
  findAll() {
    try {
      const infoElements = this.infoElementRepository.find();
      return infoElements;
    } catch (err) {
      Logger.log(`Could not find info elements. ${err}`);
    }
  }

  /**
   * Finds an info element by id.
   * @param {number} id - the id of the info element to find
   * @returns {InfoElement} the info element with the given id
   */
  findOne(id: number) {
    try {
      const infoElement = this.infoElementRepository.findOne(id);
      if (!infoElement) {
        throw new BadRequestException('InfoElement could not be found');
      }
      return infoElement;
    } catch (err) {
      Logger.log(`Could not find info element. ${err}`);
    }
  }

  /**
   * Updates the info element with the given id.
   * @param {number} id - The id of the info element to update.
   * @param {UpdateInfoElementDto} updateInfoElementDto - The info element to update.
   * @returns None
   */
  async update(id: number, updateInfoElementDto: UpdateInfoElementDto) {
    try {
      const infoElement = await this.infoElementRepository.findOne(id);
      if (!infoElement) {
        throw new BadRequestException('InfoElement could not be found.');
      } else {
        const updatedInfoElement = this.infoElementRepository.merge(
          infoElement,
          updateInfoElementDto
        );
        await this.infoElementRepository.save(updatedInfoElement);
      }
    } catch (err) {
      Logger.log(`Could not update info element. ${err}`);
    }
  }

  /**
   * Removes the info element with the given id.
   * @param {number} id - the id of the info element to remove.
   * @returns None
   */
  async remove(id: number) {
    try {
      const infoElement = await this.infoElementRepository.findOne(id);
      if (!infoElement) {
        throw new BadRequestException('InfoElement could not be found');
      } else {
        await this.infoElementRepository.remove(infoElement);
      }
      return infoElement;
    } catch (err) {
      Logger.log(`Could not remove info element. ${err}`);
    }
  }
}
