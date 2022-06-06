import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Exercise } from '@gaandeweg-ws/data-access';

@Component({
  selector: 'gaandeweg-ws-exercise-form-component',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
})
export class ExerciseFormComponent implements OnChanges {
  @Input() exercise!: Exercise;
  @Input() exerciseForm!: FormGroup;
  @Input() exerciseFormErrors!: { [key: string]: string };
  @Input() exerciseFormTouched!: boolean;
  @Input() exerciseFormSubmitted!: boolean;
  @Input() exerciseFormValid!: boolean;
  @Input() exerciseFormSubmitting!: boolean;

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
