import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise, ExerciseService } from '@gaandeweg-ws/data-access';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'gaandeweg-ws-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  exercises: Exercise[] = [];
  exerciseSub = new Subscription();

  constructor(
    private exerciseService: ExerciseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.exerciseSub = this.exerciseService
      .getExercises()
      .subscribe((exercises: Exercise[]) => {
        this.exercises = exercises;
      });
  }

  onNewExercise() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.exerciseSub.unsubscribe();
  }
}
