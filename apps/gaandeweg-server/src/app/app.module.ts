import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import {
  AuthModule,
  CategoryModule,
  ExerciseModule,
  InfoElementModule,
  ProfileModule,
  SeederModule,
  UserModule,
} from './app.modules';

import { Category, Exercise, InfoElement, Profile, User } from './app.entities';

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
          database: 'gaandeweg-dev',
          entities: [Exercise, InfoElement, Category, Profile, User],
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
    CategoryModule,
    ExerciseModule,
    UserModule,
    ProfileModule,
    InfoElementModule,
    AuthModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
