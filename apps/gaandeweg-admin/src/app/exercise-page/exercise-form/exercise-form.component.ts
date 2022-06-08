import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  Category,
  CategoryService,
  Exercise,
  ExerciseFormService,
  ExerciseService,
} from '@gaandeweg-ws/data-access';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'gaandeweg-ws-exercise-form-component',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  providers: [ExerciseService, ExerciseFormService],
})
export class ExerciseFormComponent implements OnChanges, OnInit {
  @Input() exerciseId = 1;
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

  async ngOnChanges(exerciseId: SimpleChanges): Promise<void> {
    this.exercise = await firstValueFrom(
      this.exerciseService.getExercise(this.exerciseId)
    );
    this.exerciseForm.patchValue(this.exercise);
    this.isLoading = false;
  }

  async ngOnInit(): Promise<void> {
    this.exercise = await firstValueFrom(this.exerciseService.getExercise(1));
    this.categories = await firstValueFrom(
      this.categoryService.getCategories()
    );
    this.isLoading = false;
  }

  async onSubmit(): Promise<void> {
    console.log('submit', this.exerciseForm.value);
  }
}
