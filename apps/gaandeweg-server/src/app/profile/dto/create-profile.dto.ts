import { IsJSON, IsOptional, IsUUID } from 'class-validator';

/**
 * A class that represents the data that is sent to the server when creating a new profile.
 * @property {[number]} moduleIds - The ids of the modules that the user wants to use.
 * @property {string} userId - The id of the user that is creating the profile.
 * @property {string} dbkTemplate - The template of the DBK that the user wants to use.
 */
export class CreateProfileDto {
  @IsOptional()
  moduleIds: [number];

  @IsUUID()
  userId: string;

  @IsJSON()
  dbkTemplate: string;
}
