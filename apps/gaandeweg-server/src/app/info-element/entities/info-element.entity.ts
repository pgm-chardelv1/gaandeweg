import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('info-element')
export class InfoElement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  version: string;

  @Column({ type: 'varchar', length: 45 })
  name: string;

  @Column({ type: 'varchar', length: 250 })
  definition: string;

  @Column({ type: 'longtext' })
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'tinyint' })
  published: boolean;

  @Column({ type: 'datetime' })
  publishedAt: Date;

  @Column({ type: 'varchar', length: 45 })
  publishedById: string;
}
