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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

/**
 * Controller for category resource
 *
 * @class CategoryController
 * @description This controller is for the category resource.
 * @export CategoryController
 */
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  /**
   * Create a new Category.
   *
   * @description This is used to create a new Category.
   * @param {CreateCategoryDto} createCategoryDto - the Category to create.
   * @returns {Promise<{statusCode: number, message: string, category: Category}>} - a promise that resolves to a response object with the Category
   * @memberof CategoryController
   * @method post
   */
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return category;
  }

  /**
   * Finds all categories.
   *
   * @description This method is used to find all categories.
   * @returns {Promise<{statusCode: number, message: string, categories: Category[]}>} - a promise that resolves to a response object with the categories
   * @memberof CategoryController
   * @method get
   */
  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return categories;
  }

  /**
   * Finds a category by id.
   *
   * @description This method is used to find a category by id.
   * @param {number} id - The id of the category to find.
   * @returns {Promise<{statusCode: number, message: string, category: Category}>} - a promise that resolves to a response object with the category
   * @memberof CategoryController
   * @method get
   */
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const category = await this.categoryService.findOne(+id);
    return category;
  }

  /**
   * Updates a category by id.
   *
   * @description This method is used to update a category by id.
   * @param {number} id - The id of the category to update.
   * @param {UpdateCategoryDto} updateCategoryDto - The category to update.
   * @returns {Promise<{statusCode: number, message: string, category: Category}>} - a promise that resolves to a response object with the category
   * @memberof CategoryController
   * @method patch
   */
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    const category = await this.categoryService.update(+id, updateCategoryDto);
    return category;
  }

  /**
   * Delete a category by id.
   *
   * @description This method is used to delete a category by id.
   * @param {number} id - The id of the category to delete.
   * @returns {Promise<{statusCode: number, message: string, category: Category}>} - a promise that resolves to a response object with the category
   * @memberof CategoryController
   * @method delete
   */
  @Delete(':id')
  async remove(@Param('id') id: number) {
    const category = await this.categoryService.remove(+id);
    return category;
  }
}
