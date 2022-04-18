import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

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

  findAll() {
    try {
      const categories = this.categoryRepository.find();
      return categories;
    } catch (err) {
      Logger.log(`Could not find categories. ${err}`);
    }
  }

  findOne(id: number) {
    try {
      const category = this.categoryRepository.findOne(id);
      if (!category) {
        throw new BadRequestException('Category could not be found');
      }
      return category;
    } catch (err) {
      Logger.log(`Could not find category. ${err}`);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.categoryRepository.findOne(id);
      if (!category) {
        throw new BadRequestException('Category could not be found.');
      } else {
        const updatedCategory = this.categoryRepository.merge(
          category,
          updateCategoryDto
        );
        await this.categoryRepository.save(updatedCategory);
      }
    } catch (err) {
      Logger.log(`Could not update category. ${err}`);
    }
  }

  async remove(id: number) {
    try {
      const category = await this.categoryRepository.findOne(id);
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
