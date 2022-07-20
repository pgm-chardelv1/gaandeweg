import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import {
  AbstractControlOptions,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import {
  Category,
  CategoryService,
  Exercise,
  ExerciseForm,
  ExerciseFormField,
  ExerciseFormService,
  ExerciseService,
  LoggingService,
} from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-exercise',
  templateUrl: 'exercise.page.html',
  styleUrls: ['exercise.page.scss'],
  providers: [
    ExerciseService,
    ExerciseFormService,
    LoggingService,
    ExerciseFormComponent,
  ],
})
export class ExercisePage implements OnInit {
  /**
   * The main component for the exercise editor.
   * @param {Exercise[]} exercises - The list of exercises to display.
   * @param {Category[]} categories - The list of categories to display.
   * @param {Exercise} activeExercise - The exercise to display.
   * @param {Partial<ExerciseForm>} activeExerciseForm - The form to display.
   * @param {FormArray} formControls - The form controls to display.
   * @param {FormGroup} myGroup - The form group to display.
   * @param {boolean} isSubmitted - Whether the form has been submitted.
   *
   */
  exercises: Exercise[] = [];
  categories: Category[] = [];
  activeExercise: Exercise = {
    id: 0,
    version: '',
    categoryId: 0,
    name: '',
    summary: '',
    template: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    published: false,
    publishedBy: '',
    category: {
      id: 0,
      version: '',
      name: '',
      summary: '',
      description: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: new Date(),
      updatedBy: '',
    },
  };
  activeExerciseForm: Partial<ExerciseForm> = {};
  formControls = new FormArray([]);
  public searchKey: FormControl;

  myGroup!: FormGroup;
  isSubmitted = false;
  searchListCopy: Exercise[] = [];
  searchTerms = '';
  activeId = 1;

  constructor(
    private exerciseService: ExerciseService,
    private categoryService: CategoryService,
    public formBuilder: FormBuilder,
    private logger: LoggingService
  ) {
    this.searchKey = new FormControl('');
  }

  /**
   * Searches for the search terms in the search box.
   * @returns None
   */
  search = () => {
    this.resetChanges();
    this.searchTerms = this.searchKey.value;

    this.exercises = this.exercises.filter((item) => {
      return item.name.toLowerCase().includes(this.searchTerms.toLowerCase());
    });
  };

  /**
   * Resets the exercises to the original list of exercises.
   * @returns None
   */
  resetChanges = () => {
    this.exercises = this.searchListCopy;
    this.searchTerms = '';
  };

  /**
   * Initializes the component.
   * @returns None
   */
  async ngOnInit(): Promise<void> {
    this.exercises = await firstValueFrom(this.exerciseService.getExercises());

    this.searchListCopy = this.exercises;

    this.categories = await firstValueFrom(
      this.categoryService.getCategories()
    );
    this.myGroup = this.formBuilder.group({});
    this.searchTerms = this.searchKey.value;
  }

  /**
   * This function is called when the form is submitted.
   * It checks to make sure that all the required fields are filled in.
   * If they are, it logs the form data to the console.
   * @returns None
   */
  onSubmit(): boolean {
    console.log('Form:', this.myGroup.value);
    this.isSubmitted = true;
    if (!this.myGroup.valid) {
      console.log('Please provide all the required values!');
      return false;
    } else {
      console.log(this.myGroup.value);
      this.logger.log('client', this.myGroup.value);
      return true;
    }
  }

  /**
   * Sets the active exercise to the one with the given id.
   * @param {number} id - the id of the exercise to set as active
   * @returns None
   */
  async setActive(id: number): Promise<void> {
    this.activeId = id;
  }

  /**
   * Get the error control object for the form group.
   * @returns {FormGroup} The form group object.
   */
  get errorControl(): AbstractControlOptions {
    return this.myGroup.controls;
  }

  /**
   * Adds a form control to the form group.
   * @param {ExerciseFormField} field - the field to add to the form group.
   * @returns None
   */
  addFormControl(field: ExerciseFormField): void {
    this.myGroup.registerControl(
      field.fieldName,
      new FormControl(field.fieldName, Validators.required)
    );
  }

  /**
   * Determines if the given field is a range field.
   * @param {ExerciseFormField} field - the field to check
   * @returns {boolean} - true if the field is a range field, false otherwise
   */
  fieldIsRange(field: ExerciseFormField): boolean {
    return (field.fieldType === 'RANGE' &&
      field.fieldOptions &&
      field.fieldOptions.max &&
      (field.fieldOptions.min === 0 || field.fieldOptions.min === 1) &&
      field.fieldOptions.step &&
      field.fieldOptions.icons &&
      field.fieldOptions.icons.length === 2) as boolean;
  }

  /**
   * Gets the name of the category with the given ID.
   * @param {number} categoryId - the ID of the category to get the name of.
   * @returns {string} - The name of the category with the given ID.
   */
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(
      (category) => category.id === categoryId
    );
    return category?.name || '';
  }

  /**
   * Returns whether or not the given id is the id of the active exercise.
   * @param {number} id - the id to check against the active exercise's id
   * @returns {boolean} - whether or not the given id is the id of the active exercise.
   */
  isActive(id: number): boolean {
    return this.activeExercise.id === id;
  }
}
