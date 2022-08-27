import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  AuthModule,
  CategoryModule,
  ExerciseModule,
  InfoElementModule,
  ProfileModule,
  SeederModule,
  UserExerciseModule,
  UserModule,
} from './app.modules';
import {
  Category,
  Exercise,
  InfoElement,
  Profile,
  User,
  UserExercise,
} from './app.entities';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

/**
 * The main module of the application.
 * @description This module is the main module of the application.
 * @exports AppModule
 */

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService
      ): Promise<PostgresConnectionOptions> => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST', 'localhost'),
          port: configService.get('DB_PORT', 5433),
          username: configService.get('DB_USERNAME', 'postgres'),
          password: configService.get('DB_PASSWORD', 'toor'),
          database: configService.get('DB_DATABASE_NAME', 'gaandeweg-dev'),
          entities: [
            Category,
            Exercise,
            InfoElement,
            Profile,
            User,
            UserExercise,
          ],
          synchronize: true,
          migrations: [__dirname, 'src/migrations'],
          migrationsRun: true,
          migrationsTableName: 'migrations',
          logging: configService.get<boolean>('TYPEORM_LOGGING', true),
        };
      },
      inject: [ConfigService],
    }),
    CategoryModule,
    ExerciseModule,
    UserExerciseModule,
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
