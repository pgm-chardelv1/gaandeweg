import { IsOptional, IsUUID } from 'class-validator';

/**
 * A class that represents the data that is sent to the server when creating a new profile.
 * @property {string} version - The version of the info element.
 * @property {string} name - The name of the info element.
 * @property {string} definition - The definition of the info element.
 * @property {string} text - The text of the info element.
 * @optional @property {string} publishedById - The id of the user who published the info element.
 * @optional @property {boolean} published - Whether the info element is published.
 */
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
