import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';

import {
  ExerciseForm,
  ExerciseFormField,
  ExerciseFormService,
  LoggingService,
  UserExercise,
  UserExerciseService,
} from '@gaandeweg-ws/data-access';

import { User } from '../../auth/user.model';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'gaandeweg-ws-profile-detail-view',
  templateUrl: './profile-detail-view.component.html',
  styleUrls: ['./profile-detail-view.component.scss'],
})
/**
 * Displays the user profile.
 * @class ProfileDetailViewComponent
 */
export class ProfileDetailViewComponent implements OnInit {
  /**
   * @param {boolean} isLoading Component loading state
   * @param {UserExercise} userExercise The user exercise
   * @param {UserData} userData The user data
   */
  userExerciseId = 11;
  exerciseData = '';
  isLoading = true;
  userExercise!: UserExercise;
  userData = JSON.parse(localStorage.getItem('userData') as string);
  exerciseForm: Partial<ExerciseForm> = {};
  user: User = new User('', new Date(), '');
  userSub: Subscription = new Subscription();
  outputData: {
    itemName: string;
    itemValue: any;
  }[] = [];

  constructor(
    private logger: LoggingService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private exerciseFormService: ExerciseFormService,
    private userExerciseService: UserExerciseService
  ) {}

  /**
   * Initializes the component.
   * @returns None
   */
  async ngOnInit(): Promise<void> {
    this.logger.log('client', 'ProfileDetailComponent.ngOnInit');
    console.log(this.userData.id);
    this.route.params.subscribe(async (params: Params) => {
      console.log('params', params);
      this.userExerciseId = +params['id'];
      if (this.userExerciseId) {
        this.userExercise = await lastValueFrom(
          this.userExerciseService.getUserExercise(
            this.userExerciseId,
            this.userData.id
          )
        );
        this.exerciseData = this.userExercise.exerciseData;

        this.logger.log(
          'client',
          `ProfileDetailComponent.ngOnInit.IsInitiated: #${this.userExercise.id}`
        );

        this.exerciseForm = this.exerciseFormService.renderExerciseTemplate(
          this.userExercise
        );

        this.exerciseForm?.fields?.forEach((field) => {
          this.outputField(field);
        });
      } else {
        console.log('userExercise', 'not found');
      }
    });

    this.isLoading = false;
  }

  async ngOnChanges(activeId: SimpleChanges): Promise<void> {
    this.logger.log('client', 'ProfileDetailComponent.ngOnChanges');
    this.userExercise = await lastValueFrom(
      this.userExerciseService.getUserExercise(
        this.userExerciseId,
        this.userData.id
      )
    );

    this.exerciseForm?.fields?.forEach((field) => {
      this.outputField(field);
    });
  }

  async outputField(field: ExerciseFormField): Promise<void> {
    this.logger.log('client', 'ProfileDetailComponent.outputField');
    const data = JSON.parse(this.exerciseData);
    this.outputData = [
      ...this.outputData,
      {
        itemName: field.fieldText,
        itemValue: data[field.fieldName],
      },
    ];
  }
}
