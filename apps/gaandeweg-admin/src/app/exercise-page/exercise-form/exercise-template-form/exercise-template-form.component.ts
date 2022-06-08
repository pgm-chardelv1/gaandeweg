import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  Exercise,
  ExerciseFormFieldRadioTemplate,
  ExerciseFormFieldRangeTemplate,
  ExerciseFormFieldSelectTemplate,
  ExerciseFormFieldTemplate,
  ExerciseFormService,
  ExerciseService,
} from '@gaandeweg-ws/data-access';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'gaandeweg-ws-exercise-template-form-component',
  templateUrl: './exercise-template-form.component.html',
  styleUrls: ['./exercise-template-form.component.scss'],
})
export class ExerciseTemplateFormComponent implements OnInit, OnChanges {
  @Input() exerciseId = 1;
  template = {
    fields: [] as any[],
  };
  isLoading = true;
  exercise!: Exercise;
  exerciseTemplateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private exerciseService: ExerciseService,
    private exerciseFormService: ExerciseFormService
  ) {
    this.exerciseTemplateForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    console.log('ExerciseTemplateFormComponent.ngOnInit');
  }

  async ngOnChanges(exerciseId: SimpleChanges): Promise<void> {
    console.log('ExerciseTemplateFormComponent.ngOnChanges');
    this.exercise = await firstValueFrom(
      this.exerciseService.getExercise(this.exerciseId)
    );
    this.template = JSON.parse(this.exercise.template);
    this.template.fields.forEach((field) => {
      this.addFormControls(field);
    });
  }

  addFormControls(field: ExerciseFormFieldTemplate) {
    switch (field.fieldType) {
      case 'range':
        this.exerciseFormService.generateRangeFieldFormControls(
          field as ExerciseFormFieldRangeTemplate,
          this.exerciseTemplateForm
        );
        break;
      case 'select':
        this.exerciseFormService.generateSelectFieldFormControls(
          field as ExerciseFormFieldSelectTemplate,
          this.exerciseTemplateForm
        );
        break;
      case 'radio':
        this.exerciseFormService.generateRadioFieldFormControls(
          field as ExerciseFormFieldRadioTemplate,
          this.exerciseTemplateForm
        );
        break;
      default:
        this.exerciseFormService.generateDefaultFormControls(
          field,
          this.exerciseTemplateForm
        );
    }
  }
}
