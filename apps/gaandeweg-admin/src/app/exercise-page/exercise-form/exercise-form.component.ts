import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  id: number | null = null;
  exerciseSub = new Subscription();
  categories: Category[] = [];
  isLoading = true;
  editMode = false;
  exercise: Exercise = {
    id: null,
    version: '1',
    categoryId: 1,
    name: '',
    summary: '',
    template: '',
  };
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
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(async (params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      console.log('ExerciseFormComponent.ngOnInit.editMode', this.editMode);
      this.initForm();
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
      if (this.editMode) {
        this.exerciseService.updateExercise(this.id as number, exercise);
      } else {
        this.exerciseService.createExercise(exercise);
      }
      console.log(exercise);
      this.router.navigate(['/exercise', this.id, 'edit']);
    }
  }

  ngOnDestroy(): void {
    this.exerciseSub.unsubscribe();
  }

  private initForm(): void {
    const id = null;
    const version = '1';
    const categoryId = 1;
    const name = '';
    const summary = '';
    const template = '';

    if (this.editMode) {
      this.exerciseSub = this.exerciseService
        .getExercise(this.id as number)
        .subscribe((exercise: Exercise) => {
          this.exercise = exercise;
          this.exerciseForm.patchValue(exercise);
        });
    }

    this.exerciseForm = this.formBuilder.group({
      id: [id],
      version: [version, Validators.required],
      categoryId: [categoryId, Validators.required],
      name: [name, Validators.required],
      summary: [summary, Validators.required],
      template: [template, Validators.required],
    });
  }
}
