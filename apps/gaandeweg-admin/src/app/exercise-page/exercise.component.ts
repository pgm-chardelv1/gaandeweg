import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import {
  Exercise,
  ExerciseService,
  LoggingService,
  SEOService,
} from '@gaandeweg-ws/data-access';

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
    private logger: LoggingService,
    private route: ActivatedRoute,
    private SEOService: SEOService
  ) {}

  async ngOnInit(): Promise<void> {
    this.exercises = await firstValueFrom(this.exerciseService.getExercises());
    const { meta } = this.route.snapshot.data;
    this.SEOService.updateTitle(`${meta.title}`);
    this.SEOService.updateDescription(`${meta.description}`);
    this.isLoading = false;
  }

  async setActive(id: number) {
    this.activeId = id;
  }

  isActive(id: number): boolean {
    return this.activeId === id;
  }
}
