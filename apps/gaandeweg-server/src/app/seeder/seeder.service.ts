import { Injectable, Logger } from '@nestjs/common';
import { InfoElement } from '../app.entities';
import { CategoryService } from '../category/category.service';
import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { CreateExerciseDto } from '../exercise/dto/create-exercise.dto';
import { Exercise } from '../exercise/entities/exercise.entity';
import { ExerciseService } from '../exercise/exercise.service';
import { CreateInfoElementDto } from '../info-element/dto/create-info-element.dto';
import { InfoElementService } from '../info-element/info-element.service';
import { ProfileService } from '../profile/profile.service';
import { UserRole } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

import { exercises } from './data/exercises';
import { categories } from './data/categories';

/**
 * The seeder service.
 *
 * @class SeederService
 * @description This service is used to seed the database with data.
 * @exports SeederService
 */

@Injectable()
export class SeederService {
  /**
   * Constructor for the InversionService.
   * @param {ExerciseService} exerciseService - The ExerciseService instance.
   * @param {InfoElementService} infoElementService - The InfoElementService instance.
   * @param {CategoryService} categoryService - The CategoryService instance.
   * @param {ProfileService} profileService - The ProfileService instance.
   * @param {UserService} userService - The UserService instance.
   */
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly infoElementService: InfoElementService,
    private readonly categoryService: CategoryService,
    private readonly profileService: ProfileService,
    private readonly userService: UserService
  ) {}

  /**
   * Seeds the database with the default categories and exercises.
   * @returns None
   */
  async startSeed(): Promise<unknown> {
    try {
      const createUserIfDoesntExist =
        await this.userService.createIfDoesntExist({
          where: {
            email: 'super@real.be',
          },
          data: {
            email: 'super@real.be',
            password: 'super',
            type: UserRole.SUPERUSER,
          },
        });
      const categoriesSeeded = await this.seedCategories();
      if (categoriesSeeded) {
        const exercisesSeeded = await this.seedExercises(
          createUserIfDoesntExist.id
        );
        const infoElementsSeeded = await this.seedInfoElements();
        return {
          categoriesSeeded,
          exercisesSeeded,
          infoElementsSeeded,
        };
      }
      return categoriesSeeded;
    } catch (err) {
      Logger.log('Something went wrong while trying to seed: ', err);
    }
  }

  /**
   * Seeds the categories in the database.
   * @returns None
   */
  async seedCategories(): Promise<boolean> {
    try {
      const categoriesToSeed: CreateCategoryDto[] = categories;
      categoriesToSeed.forEach(async (m) => {
        await this.categoryService.create(m);
      });

      return true;
    } catch (err) {
      Logger.log('Something went wrong while seeding the categories: ', err);
    }
  }

  /**
   * Seeds the exercises for the user with the given id.
   * @param {string} userId - the id of the user to seed the exercises for.
   * @returns {Promise<{status: number, message: string, exercise: Exercise}>}
   */
  async seedExercises(userId: string): Promise<{
    status: number;
    message: string;
    exercises: Exercise[];
  }> {
    try {
      const categories = await this.categoryService.findAll();

      const getCategoryId = (name: string) => {
        return categories.find((c) => c.name === name).id;
      };

      const exercisesToSeed: CreateExerciseDto[] = exercises.map((e) => {
        return {
          ...e,
          categoryId: getCategoryId(e.categoryId as string),
          publishedBy: userId,
          template: JSON.stringify(e.template),
        };
      });

      const exercisesSeeded = [];
      exercisesToSeed.forEach(async (ex) => {
        const exSeeded = await this.exerciseService.create(ex);
        exercisesSeeded.push(exSeeded);
      });
      return {
        status: 201,
        message: 'Exercise seeded',
        exercises: exercisesSeeded,
      };
    } catch (err) {
      Logger.log('Something went wrong while seeding the exercises: ', err);
    }
  }

  /**
   * Seeds the info elements table with the default info elements.
   * @returns {Promise<{
   *   status: number;
   *   message: string;
   *   infoElement: InfoElement;
   * }>}
   */
  async seedInfoElements(): Promise<{
    status: number;
    message: string;
    infoElement: InfoElement;
  }> {
    try {
      const infoElement: CreateInfoElementDto = {
        version: '1',
        name: 'Probleemgedrag',
        definition: 'Elk gedrag dat niet helpend is voor het zelfbeheer',
        text: 'Veel gedrag is niet helpend voor het zelfbeheer. Denk bijvoorbeeld aan middelenmisbruik, maar ook aan zelfverwondend gedrag, of suïcidale gedragingen.',
        published: true,
        publishedById: '',
      };
      const infoElementSeeded = await this.infoElementService.create(
        infoElement
      );
      if (infoElementSeeded) {
        return {
          status: 201,
          message: 'InfoElement seeded',
          infoElement: infoElementSeeded,
        };
      } else {
        return {
          status: 500,
          message: 'Something went wrong while seeding the info elements',
          infoElement: null,
        };
      }
    } catch (err) {
      Logger.log('Something went wrong while seeding the info elements: ', err);
    }
  }
}
