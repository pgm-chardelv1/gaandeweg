import { IsOptional, IsUUID } from 'class-validator';

export class CreateInfoElementDto {
  version: string;

  name: string;

  definition: string;

  text: string;

  @IsOptional()
  published: boolean;

  @IsOptional()
  @IsUUID()
  publishedById: string;
}
