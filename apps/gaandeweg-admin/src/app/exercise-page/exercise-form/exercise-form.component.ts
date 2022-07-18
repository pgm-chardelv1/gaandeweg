import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import jwtDecode from 'jwt-decode';

import {
  Category,
  CategoryService,
  Exercise,
  ExerciseFormField,
  ExerciseFormService,
  ExerciseService,
} from '@gaandeweg-ws/data-access';
import { User } from '../../auth/user.model';
import { ExerciseTemplateFormComponent } from './exercise-template-form/exercise-template-form.component';

@Component({
  selector: 'gaandeweg-ws-exercise-form-component',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  providers: [ExerciseService, ExerciseFormService],
})
export class ExerciseFormComponent implements OnDestroy, OnInit {
  @Input() exerciseId = 1;
  @ViewChild(ExerciseTemplateFormComponent)
  exerciseTemplateForm!: ExerciseTemplateFormComponent;
  id = 0;
  exerciseSub = new Subscription();
  categories: Category[] = [];
  isLoading = true;
  editMode = false;
  exercise: Exercise = {
    id: 0,
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
    const templateString =
      this.exerciseTemplateForm?.exerciseTemplateForm?.value;

    /**
     * Removes any field values that are null or undefined.
     * @param {ExerciseFormField[]} fields - the fields to filter
     * @returns None
     */
    if (templateString) {
      templateString.fields.forEach((field: ExerciseFormField) => {
        console.log('ExerciseFormComponent.onSubmit.field', field);

        const fieldValues = field.fieldValues;
        console.log('fieldValues', fieldValues);
        if (fieldValues) {
          const filteredFieldValues = fieldValues?.filter(
            (f: { fieldValue: string | null; fieldLabel: string | null }) => {
              return (
                f.fieldValue !== null &&
                f.fieldValue !== undefined &&
                f.fieldLabel !== undefined &&
                f.fieldLabel !== null
              );
            }
          );
          console.log(filteredFieldValues);
          templateString.fieldValues = filteredFieldValues;
        }
      });

      this.exerciseForm.patchValue({
        template: JSON.stringify(templateString),
      });
      this.exerciseFormSubmitted = true;
      this.exerciseFormValid = this.exerciseForm.valid;
      if (this.exerciseForm.valid) {
        const exercise = this.exerciseForm.value;
        if (this.editMode) {
          console.log('ExerciseFormComponent.onSubmit.update', exercise);
          this.exerciseService.updateExercise(this.id as number, exercise);
          this.router.navigate(['/exercise', this.id, 'edit']);
        } else {
          console.log('ExerciseFormComponent.onSubmit.create', exercise);
          const uData = JSON.parse(localStorage.getItem('userData') as string);
          const uId: {
            email: string;
            sub: {
              id: string;
            };
          } = jwtDecode(uData._token as string);

          if (uData as User) {
            exercise.publishedById = uData.id;
            console.log(
              'ExerciseFormComponent.onSubmit.create.uId',
              jwtDecode(uData._token as string)
            );
          }
          this.exerciseService.createExercise({
            ...exercise,
            template: JSON.stringify(templateString),
            published: true,
            publishedBy: uId.sub.id,
          });
          this.router.navigate(['/exercise']);
        }
      }
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
