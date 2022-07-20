import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

/**
 * Service for category resource.
 *
 * @description This service contains all the category related services and controllers.
 * @exports CategoryService
 * @class CategoryService
 */
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  /**
   * Creates a new category.
   * @param {CreateCategoryDto} createCategoryDto - The category to create.
   * @returns {Promise<Category>} The created category.
   */
  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);
      if (!category) {
        throw new BadRequestException('Category could not be created');
      }
      return category;
    } catch (error) {
      Logger.log(`Could not create category. ${error}`);
    }
  }

  /**
   * Find all categories in the database.
   * @returns {Promise<Category[]>}
   */
  findAll() {
    try {
      const categories = this.categoryRepository.find();
      return categories;
    } catch (err) {
      Logger.log(`Could not find categories. ${err}`);
    }
  }

  /**
   * Finds a category by id.
   * @param {number} id - the id of the category to find.
   * @returns {Category} the category with the given id.
   */
  findOne(id: number) {
    try {
      const category = this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new BadRequestException('Category could not be found');
      }
      return category;
    } catch (err) {
      Logger.log(`Could not find category. ${err}`);
    }
  }

  /**
   * Updates a category.
   * @param {number} id - the id of the category to update
   * @param {UpdateCategoryDto} updateCategoryDto - the category to update
   * @returns None
   */
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new BadRequestException('Category could not be found.');
      } else {
        const updatedCategory = this.categoryRepository.merge(
          category,
          updateCategoryDto
        );
        return await this.categoryRepository.save(updatedCategory);
      }
    } catch (err) {
      Logger.log(`Could not update category. ${err}`);
    }
  }

  /**
   * Removes a category from the database.
   * @param {number} id - the id of the category to remove
   * @returns {Promise<Category>} - the removed category
   */
  async remove(id: number) {
    try {
      const category = await this.categoryRepository.findOne({ where: { id } });
      if (!category) {
        throw new BadRequestException('Category could not be found');
      } else {
        await this.categoryRepository.remove(category);
      }
      return category;
    } catch (err) {
      Logger.log(`Could not remove category. ${err}`);
    }
  }
}
