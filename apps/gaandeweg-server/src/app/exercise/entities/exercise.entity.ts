import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Category } from '../../category/entities/category.entity';

/**
 * @Entity('exercise')
 * @class Exercise
 * @property {number} id - The id of the exercise.
 * @property {string} version - The version of the exercise.
 * @property {number} categoryId - The id of the category the exercise belongs to.
 * @property {string} publishedBy - The name of the user who published the exercise.
 * @property {Category} category - The category the exercise belongs to.
 */
@Entity('exercise')
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 20 })
  version: string;

  @Column()
  categoryId: number;

  @Column('varchar', { length: 45 })
  name: string;

  @Column('varchar', { length: 250 })
  summary: string;

  @Column('json')
  template: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('tinyint')
  published: boolean;

  @Column('varchar', { length: 45 })
  publishedBy: string;

  @ManyToOne(() => Category, (category) => category.exercises, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'nullify',
  })
  category: Category;
}
