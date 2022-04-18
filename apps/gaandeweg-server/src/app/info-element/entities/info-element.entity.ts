import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * @Entity('info-element')
 * @class InfoElement
 * @property {number} id - The id of the info element.
 * @property {string} version - The version of the info element.
 * @property {string} name - The name of the info element.
 * @property {Date} updatedAt - The date the info element was last updated.
 * @property {boolean} published - Whether the info element is published.
 * @property {Date} publishedAt - The date the info element was published.
 * @property {string} publishedById - The id of the user who published the info element.
 */
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

  @Column({ type: 'tinyint', default: false })
  published: boolean;

  @Column({ type: 'datetime' })
  publishedAt: Date;

  @Column({ type: 'varchar', length: 45, default: null })
  publishedById: string;
}
