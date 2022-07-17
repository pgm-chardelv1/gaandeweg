import { Component, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom, Subscription } from 'rxjs';

import {
  LoggingService,
  UserExercise,
  UserExerciseService,
} from '@gaandeweg-ws/data-access';
import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'gaandeweg-ws-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
})
export class ProfileListComponent implements OnInit, OnDestroy {
  isLoading = true;
  user: User = new User('', new Date(), '');
  userSub = new Subscription();
  userExercises: UserExercise[] = [] as UserExercise[];
  userData = JSON.parse(localStorage.getItem('userData') as string);

  constructor(
    private authService: AuthService,
    private userExerciseService: UserExerciseService,
    private logger: LoggingService
  ) {}

  async ngOnInit() {
    this.userSub = this.authService.user.subscribe((user: User) => {
      this.user = user;
      console.log('ProfileListComponent.ngOnInit', user);
    });

    this.userExercises = await firstValueFrom(
      this.userExerciseService.getUserExercises(this.userData.id)
    );
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

  ngOnDestroy() {
    this.isLoading = true;
  }
}
