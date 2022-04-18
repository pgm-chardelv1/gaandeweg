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
