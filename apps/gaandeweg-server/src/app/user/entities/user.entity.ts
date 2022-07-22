import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserExercise } from '../../user-exercise/entities/user-exercise.entity';

/**
 * A class that represents a user.
 * @param {string} id - The id of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @param {Date} createdAt - The date the user was created.
 * @param {Date} updatedAt - The date the user was last updated.
 * @param {UserRole} type - The type of user.
 */
@Entity('user')
export class User {
  /**
   @type {string} 
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The email of the user.
   */
  @Column('varchar', { length: 30, unique: true })
  email: string;

  /**
   * The password for the user.
   */
  @Column('varchar')
  password: string;

  /**
   * A column that stores the date that the entity was created.
   * @type {Date}
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * A column that stores the date that the entity was updated.
   */
  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * The type of user.
   * @type {number}
   */
  @Column('tinyint')
  type: UserRole;

  @OneToMany(() => UserExercise, (userExercise) => userExercise.user)
  userExercises: UserExercise[];

  /**
   * Hash the password before saving the user.
   * @returns None
   */
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }
}

/**
 * A list of the different user roles.
 */
export enum UserRole {
  GUEST = 0,
  USER = 1,
  EDITOR = 2,
  SUPERUSER = 3,
}

/**
 * A user interface object.
 * @property {string} id - The user's id.
 * @property {string} email - The user's email.
 * @property {UserRole} type - The user's role.
 */
export interface UserInterface {
  id: string;
  type: UserRole;
  createdAt: Date;
  updatedAt: Date;
}
