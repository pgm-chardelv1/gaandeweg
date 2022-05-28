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
    exercises: Exercise[];
  }> {
    try {
      const exercises: CreateExerciseDto[] = [
        {
          version: '1',
          categoryId: 5,
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
                fieldValues: ['EMOTICONS'],
                fieldInfo: '1 = niet aanwezig, 5 = zeer sterk aanwezig',
              },
              {
                fieldId: 4,
                fieldName: 'selfHarm',
                fieldText: 'Zelfverwonding',
                fieldType: 'SLIDER',
                fieldValues: ['1', '2', '3', '4', '5'],
                fieldInfo: '1 = niet aanwezig, 5 = zeer sterk aanwezig',
                extraField: true,
              },
              {
                fieldId: 5,
                fieldName: 'alcohol',
                fieldText: 'Alcohol',
                fieldType: 'SLIDER',
                fieldValues: ['1', '2', '3', '4', '5'],
                fieldInfo: '1 = niet aanwezig, 5 = zeer sterk aanwezig',
              },
              {
                fieldId: 0,
                fieldName: '',
                fieldText: '',
                fieldType: 'SLIDER',
                fieldValues: ['1', '2', '3', '4', '5'],
                fieldInfo: '1 = niet aanwezig, 5 = zeer sterk aanwezig',
              },
            ],
          }),
        },
        {
          version: '1',
          categoryId: 6,
          name: 'KOV',
          summary: 'Kernoplettendheidsvaardigheden',
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
                fieldId: 3,
                fieldName: 'cause',
                fieldText: 'Aanleiding',
                fieldInfo: 'Beschrijf de aanleiding tot de situatie',
                fieldType: 'TEXT',
              },
              {
                fieldId: 4,
                fieldName: 'emotions',
                fieldText: 'Emoties',
                fieldInfo:
                  'Beschrijf de emoties die aanwezig waren in de situatie. Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
                fieldType: 'SELECT',
                fieldRepeatable: true,
                fieldRepeat: 5,
                fieldValues: [
                  'Afschuw',
                  'Angst',
                  'Blijdschap',
                  'Irritatie',
                  'Kwaadheid',
                  'Neutraal',
                  'Schaamte',
                  'Verdriet',
                  'Verrassing',
                  'Verwondering',
                ],
              },
              {
                fieldId: 5,
                fieldName: 'thoughts',
                fieldText: 'Gedachten / Oordelen / Interpretaties',
                fieldInfo:
                  'Welke gedachten / oordelen / interpretaties waren er in de situatie?',
                fieldType: 'TEXT',
              },
              {
                fieldId: 6,
                fieldName: 'goal',
                fieldText: 'Doel',
                fieldInfo:
                  'Welk doel hou je jezelf voor ogen in die situatie? Hoe zou je willen dat de situatie <strong>constructief</strong> verloopt? Wat zou je willen bereiken?',
                fieldType: 'TEXT',
              },
              {
                fieldId: 7,
                fieldName: 'actions',
                fieldText: 'Acties',
                fieldInfo:
                  'Wat heb je gedaan in die situatie? Wat heb je gezegd? Hoe was je houding?',
                fieldType: 'TEXT',
              },

              {
                fieldId: 9,
                fieldName: 'observe-external',
                fieldText: 'Observeren - extern',
                fieldInfo:
                  'Ben ik mij bewust van de dingen en gebeurtenissen om mij heen? Gebruik ik bij het waarnemen van de dingen om mij heen bewust mijn zintuigen? Kan ik bij het observeren van de dingen en gebeurtenissen om mij heen stilstaan bij de details en deze aandachtig in mijzelf opnemen?',
                fieldType: 'TEXT',
              },
              {
                fieldId: 10,
                fieldName: 'observe-internal',
                fieldText: 'Observeren - intern',
                fieldInfo:
                  'Ben ik mij bewust van innerlijke ervaringen en kan ik er bij stilstaan? Emoties en gedachten: Ervaar ik die bewust op het moment zelf? Kan ik er mij voor openstellen? Lichamelijke sensaties: Zijn er lichamelijke gewaarwordingen? Merk ik op wat ik voel in mijn lichaam?',
                fieldType: 'TEXT',
              },
              {
                fieldId: 11,
                fieldName: 'distance',
                fieldText: 'Kon ik hierdoor afstand nemen van de situatie?',
                fieldType: 'RADIO',
                fieldValues: ['Ja', 'Neen'],
              },
              {
                fieldId: 12,
                fieldName: 'describe',
                fieldText: 'Beschrijven - onder woorden brengen',
                fieldInfo:
                  'Beschrijf je externe en interne observaties. Kan ik wat ik meemaak met woorden benoemen in gedachten? op papier? aan een ander?<strong>Zo objectief en zuiver mogelijk, zonder interpretaties</strong>',
                fieldType: 'TEXT',
              },
              {
                fieldId: 13,
                fieldName: 'participate',
                fieldText: 'Participeren',
                fieldInfo:
                  'Kan ik mij ten volle in verbinding stellen met het moment? Verzet ik mij niet tegen wat ik nu ervaar? Ga ik er niet van vluchten? Onderga ik de situatie niet zomaar?',
                fieldType: 'TEXT',
              },
              {
                fieldId: 14,
                fieldName: 'judgment-free',
                fieldText: 'Ben ik oordeelvrij?',
                fieldType: 'RADIO',
                fieldValues: ['Ja', 'Neen'],
              },
              {
                fieldId: 15,
                fieldName: 'non-judgmental-attitude',
                fieldText: 'Kan ik een oordeelvrije houding aannemen?',
                fieldInfo:
                  'Kan ik mijn oordelen voor mij houden of spreek ik ze uit? Handel ik naar mijn oordelen?',
                fieldType: 'RADIO',
                fieldValues: ['Ja', 'Neen'],
              },
              {
                fieldId: 16,
                fieldName: 'one-thing',
                fieldText: 'Eén ding tegelijkertijd',
                fieldInfo:
                  'Doe ik één ding tegelijk? Ben ik in mijn geest en gedachten ook met één iets bezig? Ben ik met mijn gedachten bij hetgeen ik doe of denk ik aan andere dingen?',
                fieldType: 'TEXT',
              },
              {
                fieldId: 17,
                fieldName: 'effective',
                fieldText: 'Effectief zijn en handelen',
                fieldInfo:
                  'Heb ik gedaan wat werkt om mijn doel te bereiken? Wou ik liever gelijk hebben dan doen wat nodig was? Wou ik liever koppig vasthouden aan iets? Wou ik enkel goed doen in de situatie?',
                fieldType: 'TEXT',
              },
              {
                fieldId: 18,
                fieldName: 'minds-present',
                fieldText: 'Verhouding van de geesten',
                fieldInfo:
                  'Rangschik de volgorde van aanwezigheid van de geesten.',
                fieldRepeatable: true,
                fieldType: 'SELECT',
                fieldRepeat: 3,
                fieldValues: [
                  'Emotionele geest',
                  'Rationele geest',
                  'Wijze geest',
                ],
              },
              {
                fieldId: 19,
                fieldName: 'prefer-change',
                fieldText: 'Had ik iets anders gewild in deze situatie?',
                fieldType: 'TEXT',
              },
              {
                fieldId: 20,
                fieldName: 'happy-about',
                fieldText: 'Waar ben je tevreden over?',
                fieldType: 'TEXT',
              },
            ],
          }),
        },
      ];
      const exercisesSeeded = [];
      exercises.forEach(async (ex) => {
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
