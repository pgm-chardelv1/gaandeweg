import { Component, OnInit } from '@angular/core';
import {
  Exercise,
  ExerciseService,
  LoggingService,
} from '@gaandeweg-ws/data-access';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'gaandeweg-ws-exercise-page-component',
  templateUrl: './exercise.page.html',
  styleUrls: ['./exercise.page.scss'],
  providers: [ExerciseService, LoggingService],
})
export class ExercisePage implements OnInit {
  isLoading = true;
  exercises: Exercise[] = [];
  activeId = 0;

  constructor(
    private exerciseService: ExerciseService,
    private logger: LoggingService
  ) {}

  async ngOnInit(): Promise<void> {
    this.exercises = await firstValueFrom(this.exerciseService.getExercises());
    this.isLoading = false;
  }

  async setActive(id: number) {
    this.activeId = id;
  }

  isActive(id: number): boolean {
    return this.activeId === id;
  }
}
