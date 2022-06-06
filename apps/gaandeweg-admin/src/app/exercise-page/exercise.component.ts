import { Component, OnInit } from '@angular/core';
import {
  ExerciseFormService,
  ExerciseService,
  LoggingService,
} from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-exercise-page-component',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
  providers: [ExerciseService, ExerciseFormService, LoggingService],
})
export class ExercisePage implements OnInit {
  constructor(
    private exerciseService: ExerciseService,
    private exerciseFormService: ExerciseFormService,
    private logger: LoggingService
  ) {}
  ngOnInit(): void {
    this.logger.log('admin', 'Loaded exercises');
  }
}
