import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import {
  Category,
  CategoryService,
  Exercise,
  ExerciseFormService,
  ExerciseService,
} from '@gaandeweg-ws/data-access';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'gaandeweg-ws-exercise-form-component',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  providers: [ExerciseService, ExerciseFormService],
})
export class ExerciseFormComponent implements OnDestroy, OnInit {
  @Input() exerciseId = 1;
  id = 0;
  exerciseSub = new Subscription();
  categories: Category[] = [];
  isLoading = true;
  exercise!: Exercise;
  exerciseForm!: FormGroup;
  exerciseFormErrors!: { [key: string]: string };
  exerciseFormTouched!: boolean;
  exerciseFormSubmitted!: boolean;
  exerciseFormValid!: boolean;
  exerciseFormSubmitting!: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private exerciseService: ExerciseService,
    private route: ActivatedRoute,
    private router: Router,
    private exerciseFormService: ExerciseFormService
  ) {
    this.exerciseForm = this.formBuilder.group({
      id: [1, Validators.required],
      version: ['1', Validators.required],
      categoryId: [0, Validators.required],
      name: ['', Validators.required],
      summary: ['', Validators.required],
      template: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params: Params) => {
      this.id = +params['id'];
      this.exerciseSub = this.exerciseService
        .getExercise(this.id)
        .subscribe((exercise: Exercise) => {
          this.exercise = exercise;
          this.exerciseForm.patchValue(exercise);
        });
    });
    this.categories = await firstValueFrom(
      this.categoryService.getCategories()
    );
    this.isLoading = false;
  }

  async onSubmit(): Promise<void> {
    this.exerciseFormSubmitted = true;
    this.exerciseFormValid = this.exerciseForm.valid;
    if (this.exerciseForm.valid) {
      const exercise = this.exerciseForm.value;
      /*       this.exerciseService.updateExercise(this.id, exercise); */
      console.log(exercise);
      this.router.navigate(['/exercise', this.id, 'edit']);
    }
  }

  ngOnDestroy(): void {
    this.exerciseSub.unsubscribe();
  }
}
