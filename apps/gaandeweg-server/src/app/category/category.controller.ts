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

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.create(createCategoryDto);
    return {
      statusCode: 201,
      message: 'Category created successfully',
      category,
    };
  }

  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Categories found successfully',
      categories,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoryService.findOne(+id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Category found successfully',
      category,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {
    const category = await this.categoryService.update(+id, updateCategoryDto);
    return {
      statusCode: 204,
      message: 'Category updated successfully',
      category,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const category = await this.categoryService.remove(+id);
    return {
      statusCode: 204,
      message: 'Category removed successfully',
      category,
    };
  }
}
