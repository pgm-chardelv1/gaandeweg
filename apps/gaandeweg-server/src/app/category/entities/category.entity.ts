import { IsDate, IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exercise } from '../../exercise/entities/exercise.entity';
/**
 * A class that represents a category.
 * @param {string} id - The id of the category.
 * @param {string} version - The version of the category.
 * @param {string} name - The name of the category.
 * @param {string} summary - The summary of the category.
 * @param {string} description - The description of the category.
 * @param {Date} createdAt - The date the category was created.
 * @param {Date} updatedAt - The date the category was last updated.
 * @param {Date} publishedAt - The date the category was published.
 * @param {string} updatedBy - The id of the user who updated the category.
 * @param {Exercise[]} exercises - The exercises in the category.
 */
@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20 })
  version: string;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 250 })
  summary: string;

  @Column('longtext')
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @IsDate()
  publishedAt: Date;

  @IsUUID()
  updatedBy: string;

  @OneToMany(() => Exercise, (exercise) => exercise.category)
  exercises: Exercise[];
}
