import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';

/**
 * A class that represents a user's profile.
 * @property {string} id - The unique ID of the profile.
 * @property {string[]} moduleIds - The IDs of the modules that the user has completed.
 * @property {Date} createdAt - The date the profile was created.
 * @property {User} user - The user that the profile belongs to.
 * @property {string} dbkTemplate - The template of the user's DBK.
 */
@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 45, nullable: true })
  moduleIds: number[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => User, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column('json')
  dbkTemplate: string;
}
