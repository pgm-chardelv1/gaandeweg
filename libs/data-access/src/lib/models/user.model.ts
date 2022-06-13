export interface User {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  type: UserRole;
}

export enum UserRole {
  GUEST = 0,
  USER = 1,
  EDITOR = 2,
  SUPERUSER = 3,
}

export interface AppUser {
  id: string;
  token: string;
}
