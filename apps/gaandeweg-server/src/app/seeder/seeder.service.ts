import { Injectable, Logger } from '@nestjs/common';
import { ExerciseService } from '../exercise/exercise.service';
import { InfoElementService } from '../info-element/info-element.service';
import { CreateModuleDto } from '../modules/dto/create-module.dto';
import { ModulesService } from '../modules/modules.service';
import { ProfileService } from '../profile/profile.service';
import { UserService } from '../user/user.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly infoElementService: InfoElementService,
    private readonly modulesService: ModulesService,
    private readonly profileService: ProfileService,
    private readonly userService: UserService,
  ) {}

  async startSeed(): Promise<any> {
    try {
      const modulesSeeded = await this.seedModules().then(() => {
        return 'Success!'
      })
      
    } catch (err) {
      Logger.log('Something went wrong while trying to seed: ', err)
    }
  }

  async seedModules(): Promise<void> {
    try {
      const d = new Date()
      const modules: CreateModuleDto[] = [
        {
          version: "1.0",
          name: 'Pre-Treatment',
          summary: 'Voorbereidende DGT-module',
          description: 'Voorbereidende DGT-module waarin samen met de therapeuten wordt gekeken naar de behandeldoelen en verwachtingen. De focus ligt op het doen afnemen van destructief gedrag.',
        },
        {
          version: "1.0",
          name: "KOV",
          summary: "Kernoplettendheidsvaardigheden",
          description: "Module die je in staat stelt om meer mindful om te gaan met situaties. Aan de hand van een aantal vragen gaan we op zoek naar meer bewustzijn.",
        }
      ];
      modules.forEach(async m => await this.modulesService.create(m))

      return
    } catch (err) {
      Logger.log('Something went wrong while seeding the modules: ', err)
    }
  }
}
