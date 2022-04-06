import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ModulesModule } from './modules/modules.module';
import { ExerciseModule } from './exercise/exercise.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { InfoElementModule } from './info-element/info-element.module';

import { Module as ModuleEntity } from './modules/entities/module.entity';
import { User } from './user/entities/user.entity';
import { Exercise } from './exercise/entities/exercise.entity';
import { InfoElement } from './info-element/entities/info-element.entity';
import { Profile } from './profile/entities/profile.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<MysqlConnectionOptions> => {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3307,
          username: 'root',
          password: 'root',
          database: 'gaandeweg',
          entities: [Exercise, InfoElement, ModuleEntity, Profile, User],
          synchronize: true,
          migrations: [__dirname, 'src/migrations'],
          migrationsRun: true,
          migrationsTableName: 'migrations',
          cli: {
            migrationsDir: 'src/migrations',
          },
          logging: true,
        };
      },
    }),
    ModulesModule,
    ExerciseModule,
    UserModule,
    ProfileModule,
    InfoElementModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
