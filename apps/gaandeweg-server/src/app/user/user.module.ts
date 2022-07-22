import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AbilityModule } from '../ability/ability.module';
import { User as UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

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
  imports: [TypeOrmModule.forFeature([UserEntity]), AbilityModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
