import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';
import * as dayjs from 'dayjs';

import {
  LoggingService,
  UserExercise,
  UserExerciseService,
} from '@gaandeweg-ws/data-access';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'gaandeweg-ws-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
/**
 * The profile list component.
 * @class ProfileListComponent
 */
export class ProfileListComponent implements OnInit, OnDestroy {
  /**
   * @param {boolean} isLoading Component loading state
   * @param {User} user The user
   * @param {UserExercise[]} userExercises The user exercises
   * @param {Subscription} userSub The user subscription
   * @param {any} userData The user data
   */
  activeId: number | undefined;
  isLoading = true;
  user: User = new User('', new Date(), '');
  userSub: Subscription = new Subscription();
  userExercises: UserExercise[] = [] as UserExercise[];
  userData: any = JSON.parse(localStorage.getItem('userData') as string);

  constructor(
    private authService: AuthService,
    private userExerciseService: UserExerciseService,
    private logger: LoggingService,
    private router: Router
  ) {}

  /**
   * Initializes the component.
   * @returns None
   */
  async ngOnInit(): Promise<void> {
    /**
     * Subscribe to the user observable and set the user property.
     * @param {User} user - the user object from the auth service
     * @returns None
     */
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.user = user;
      console.log('ProfileListComponent.ngOnInit', user);
    });

    /**
     * Gets the first value from a promise.
     * @param {Promise<any>} promise - the promise to get the first value from
     * @returns The first value from the promise
     */
    this.userExercises = await firstValueFrom(
      this.userExerciseService.getUserExercises(this.userData.id)
    );
    /**
     * If there are no exercises in the user's profile, log an error.
     * @returns None
     */
    if (this.userExercises.length === 0) {
      this.logger.error(
        'client',
        'ProfileListComponent.ngOnInit No exercises found'
      );
    }
    console.log(
      'ProfileListComponent.ngOnInit user exercises',
      this.userExercises
    );
    this.isLoading = false;
  }

  getDateString(date: Date | undefined): string {
    if (date) {
      return dayjs(date).format('DD/MM/YYYY');
    } else {
      return '-';
    }
  }

  onDelete(id: number | undefined): void {
    this.userExerciseService
      .deleteUserExercise(id as number, this.userData.id)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
      });
    this.userExercises = this.userExercises.filter(
      (userExercise) => userExercise.id !== id
    );
  }

  onEdit(id: number | undefined): void {
    console.log('ProfileListComponent.onEdit UExId', id);
  }

  /**
   * A function that is called when the component is destroyed.
   * @returns None
   */
  ngOnDestroy(): void {
    this.isLoading = true;
  }

  isActive(id: number | undefined): boolean {
    return this.activeId === id;
  }

  setActive(id: number | undefined): void {
    this.activeId = id;
    this.router.navigate(['app', 'profile', id]);
  }
}
