import { Category } from './category.model';

export interface InfoElement {
  id: number;
  version: string;
  name: string;
  definition: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  published?: boolean;
  publishedAt?: Date;
  publishedById?: string;
  category?: Category;
  categoryId?: number;
}
