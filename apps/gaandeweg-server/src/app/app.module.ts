import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
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
      ): Promise<MysqlConnectionOptions> => {
        return {
          type: 'mysql',
          host: configService.get<string>('MYSQL_HOST', 'localhost'),
          port: configService.get<number>('MYSQL_PORT', 3307),
          username: configService.get<string>('MYSQL_USER', 'root'),
          password: configService.get<string>('MYSQL_PASSWORD', 'root'),
          database: configService.get<string>(
            'MYSQL_DATABASE',
            'gaandeweg-dev'
          ),
          entities: [
            Exercise,
            InfoElement,
            Category,
            Profile,
            User,
            UserExercise,
          ],
          synchronize: configService.get<boolean>('DB_SYNC', true),
          migrations: [__dirname, 'src/migrations'],
          migrationsRun: true,
          migrationsTableName: 'migrations',
          // Commented because of the following error:
          // TypeError: No overload matches this call.
          /*           cli: {
            migrationsDir: 'src/migrations',
          }, */
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
