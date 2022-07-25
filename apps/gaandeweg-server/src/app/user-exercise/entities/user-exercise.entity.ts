import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from '../../app.entities';

@Entity('user_exercise')
export class UserExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userExercises, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'nullify',
  })
  user?: User;

  @Column('text')
  exerciseName: string;

  @Column('json')
  exerciseTemplate: string;

  @Column('varchar', { length: 8192 })
  exerciseData: string;

  @Column('varchar')
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
