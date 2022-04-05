import { IsJSON, IsOptional, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsOptional()
  moduleIds: [number];

  @IsUUID()
  userId: string;

  @IsJSON()
  dbkTemplate: string;
}
