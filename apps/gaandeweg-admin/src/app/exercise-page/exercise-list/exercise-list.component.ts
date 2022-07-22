import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { Exercise, ExerciseService } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  faTrash = faTrash;
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

  onDeleteExercise(exerciseId: number) {
    if (confirm('Ben je zeker dat je deze oefening wilt verwijderen?')) {
      this.exerciseService.deleteExercise(exerciseId).subscribe(() => {
        this.exercises = this.exercises.filter(
          (exercise: Exercise) => exercise.id !== exerciseId
        );
      });
    }
  }
}
