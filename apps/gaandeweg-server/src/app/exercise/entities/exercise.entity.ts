import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from '../../category/entities/category.entity';

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
