import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEntity } from './entities/user.entity';

/**
 * The user module.
 *
 * @description This module contains all the user related services and controllers.
 * @providers UserService
 * @controllers UserController
 * @exports UserModule
 * @class UserModule
 */
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
