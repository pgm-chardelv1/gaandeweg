import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './entities/category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

/**
 * The category module.
 *
 * @description This module contains all the category related services and controllers.
 * @controllers CategoryController
 * @providers CategoryService
 * @exports CategoryModule
 * @class CategoryModule
 */
@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
