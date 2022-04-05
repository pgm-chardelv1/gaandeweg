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

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 45, array: true })
  moduleIds: [number];

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
