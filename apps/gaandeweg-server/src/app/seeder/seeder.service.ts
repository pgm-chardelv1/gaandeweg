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
      const categoriesSeeded = await this.seedCategories().then(() => {
        return 'Success!';
      });
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
  async seedCategories(): Promise<void> {
    try {
      const categories: CreateCategoryDto[] = [
        {
          version: '1.0',
          name: 'Pre-Treatment',
          summary: 'Voorbereidende DGT-module',
          description:
            'Voorbereidende DGT-module waarin samen met de therapeuten wordt gekeken naar de behandeldoelen en verwachtingen. De focus ligt op het doen afnemen van destructief gedrag.',
        },
        {
          version: '1.0',
          name: 'KOV',
          summary: 'Kernoplettendheidsvaardigheden',
          description:
            'Module die je in staat stelt om meer mindful om te gaan met situaties. Aan de hand van een aantal vragen gaan we op zoek naar meer bewustzijn.',
        },
      ];
      categories.forEach(async (m) => await this.categoryService.create(m));

      return;
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
    exercise: Exercise;
  }> {
    try {
      const exercise: CreateExerciseDto = {
        version: '1',
        categoryId: 1,
        name: 'Dagboekkaart',
        summary: 'Dagboekkaart en vaardighedenopvolging',
        published: true,
        publishedBy: userId,
        template: JSON.stringify({
          fields: [
            {
              fieldId: 1,
              fieldName: 'date',
              fieldText: 'Datum',
              fieldType: 'DATE',
            },
            {
              fieldId: 2,
              fieldName: 'time',
              fieldText: 'Tijd',
              fieldType: 'TIME',
            },
            {
              fieldId: 3,
              fieldName: 'suicidalThoughts',
              fieldText: 'Suïcidegedachten',
              fieldType: 'SLIDER',
              fieldValues: 'EMOTICONS',
            },
            {
              fieldId: 4,
              fieldName: 'selfHarm',
              fieldText: 'Zelfverwonding',
              fieldType: 'SLIDER',
              fieldValues: 'NUMBERS',
              extraField: true,
            },
            {
              fieldId: 5,
              fieldName: 'alcohol',
              fieldText: 'Alcohol',
              fieldType: 'SLIDER',
              fieldValues: 'NUMBERS',
            },
            {
              fieldId: 0,
              fieldName: '',
              fieldText: '',
              fieldType: 'SLIDER',
              fieldValues: 'NUMBERS',
              extraField: true,
            },
          ],
        }),
      };
      const exerciseSeeded = await this.exerciseService.create(exercise);
      return {
        status: 201,
        message: 'Exercise seeded',
        exercise: exerciseSeeded,
      };
    } catch (err) {
      Logger.log('Something went wrong while seeding the exercises: ', err);
    }
  }

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
