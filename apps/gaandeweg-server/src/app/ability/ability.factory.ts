import { Injectable } from '@nestjs/common';
import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';

import { Category, Exercise, InfoElement, Profile } from '../app.entities';
import { User, UserRole } from '../user/entities/user.entity';
import { UserExercise } from '../user-exercise/entities/user-exercise.entity';

/**
 * An enum of the possible actions that can be performed on a site.
 * @enum {string}
 */
export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

/**
 * The subjects that can be used in the `get` function.
 * @type {('all' | InferSubjects<typeof User | typeof Exercise | typeof UserExercise | typeof InfoElement | typeof Category | typeof Profile>)}
 */
export type Subjects =
  | InferSubjects<
      | typeof User
      | typeof Exercise
      | typeof UserExercise
      | typeof InfoElement
      | typeof Category
      | typeof Profile
    >
  | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class AbilityFactory {
  /**
   * Defines the abilities for the given user.
   * @param {User} user - The user to define the abilities for.
   * @returns None
   */
  defineAbility(user: User) {
    const { can, cannot, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>
    );

    can(Action.Read, Category);
    can(Action.Read, Exercise);
    can(Action.Read, InfoElement);

    if (user.type === UserRole.SUPERUSER) {
      can(Action.Manage, 'all');
    }

    if (user.type === UserRole.EDITOR) {
      can(Action.Manage, Exercise);
      can(Action.Manage, Category);
      can(Action.Manage, InfoElement);
      cannot(Action.Manage, User);
      can(Action.Manage, Profile);
    }

    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
