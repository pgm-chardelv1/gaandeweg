import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Exercise, ExerciseForm } from '../models';
import { ExerciseService } from './exercise.service';

@Injectable({
  providedIn: 'root',
})
export class ExerciseFormService {
  constructor(private http: HttpClient) {}

  renderExerciseTemplate(exercise: Exercise): ExerciseForm {
    const form: ExerciseForm = {
      fields: [],
    };

    if (exercise?.template) {
      const parsedExercise = JSON.parse(exercise?.template);
      for (let i = 0; i < parsedExercise.fields.length - 1; i++) {
        const field = parsedExercise.fields[i];
        form?.fields?.push({
          fieldId: field.fieldId,
          fieldType: field.fieldType,
          fieldName: field.fieldName,
          fieldText: field.fieldText,
          fieldInfo: field.fieldInfo,
          fieldRepeat: field.fieldRepeat,
          fieldRepeatable: field.fieldRepeatable,
          fieldValues: field.fieldValues,
          fieldOptions: field.fieldOptions,
          extraField: field.extraField,
        });
      }
      return form;
    } else {
      return form;
    }
  }

  updateExercise(exercise: Partial<Exercise>): any {
    const updatedExercise = {
      ...exercise,
    };
    const body = exercise;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .patch<Exercise>(
        `${environment.API_BASEURL}/exercise/${!exercise?.id}`,
        body,
        options
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
