import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import {
  LoggingService,
  UserExercise,
  UserExerciseService,
} from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss'],
})
/**
 * Displays the user profile.
 * @class ProfileDetailComponent
 */
export class ProfileDetailComponent implements OnInit {
  /**
   * @param {boolean} isLoading Component loading state
   * @param {UserExercise} userExercise The user exercise
   * @param {UserData} userData The user data
   */
  isLoading = true;
  userExercise!: UserExercise;
  userData = JSON.parse(localStorage.getItem('userData') as string);

  constructor(
    private logger: LoggingService,
    private router: Router,
    private route: ActivatedRoute,
    private userExerciseService: UserExerciseService
  ) {}

  /**
   * Initializes the component.
   * @returns None
   */
  ngOnInit(): void {
    this.logger.log('client', 'ProfileDetailComponent.ngOnInit');
    this.route.params.subscribe(async (params: Params) => {
      if (+params['id'] as number) {
        this.userExercise = await firstValueFrom(
          this.userExerciseService.getUserExercise(
            +params['id'],
            this.userData.id
          )
        );
        this.logger.log(
          'client',
          `ProfileDetailComponent.ngOnInit.IsInitiated: #${this.userExercise.id}`
        );
      } else {
        console.log('Else clause of ProfileDetailComponent.ngOnInit');
        this.router.navigate(['app/profile/1']);
      }
    });
    this.isLoading = false;
  }
}
