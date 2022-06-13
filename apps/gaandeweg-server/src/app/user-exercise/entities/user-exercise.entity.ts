import { createCipheriv, randomBytes, scrypt } from 'crypto';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { promisify } from 'util';
import { User } from '../../app.entities';
import * as dotenv from 'dotenv';

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

  @Column('varchar', { length: 45 })
  exerciseName: string;

  @Column('json')
  exerciseTemplate: string;

  @Column('varchar', { length: 4096 })
  exerciseData: string;

  @Column('varchar')
  userId: string;

  @BeforeInsert()
  async encryptData() {
    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(
      `${process.env.ENC_SECRET}`,
      'salt',
      32
    )) as Buffer;
    const cipher = createCipheriv('aes-256-cbc', key, iv);

    this.exerciseData = Buffer.concat([
      cipher.update(this.exerciseData, 'utf8'),
      cipher.final(),
    ]).toString('hex');
  }
}
