import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  Exercise,
  ExerciseForm,
  ExerciseFormField,
} from '../models/exercise.model';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  constructor(private http: HttpClient) {}

  /**
   * Gets the list of exercises from the server.
   * @returns An observable of the list of exercises.
   */
  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>('http://localhost:3333/api/exercise');
  }

  /**
   * Gets the exercise with the given id.
   * @param {number} id - the id of the exercise to get
   * @returns {Observable<Exercise>} - the exercise with the given id
   */
  getExercise(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`http://localhost:3333/api/exercise/${id}`);
  }

  /**
   * Takes in an exercise and returns a form object that can be used to render the form.
   * @param {Exercise} exercise - the exercise to render
   * @returns {ExerciseForm} - the form object that can be used to render the form
   */
  renderExerciseTemplate(exercise: Exercise): ExerciseForm {
    const form: ExerciseForm = {
      fields: [],
    };

    if (exercise?.template) {
      const parsedExercise = JSON.parse(exercise?.template);
      for (let i = 0; i < parsedExercise.fields.length; i++) {
        const field = parsedExercise.fields[i];
        form?.fields?.push(this.renderFormField(field));
      }
      console.log(form);
      return form;
    } else {
      return form;
    }
  }

  renderFormField(field: any): ExerciseFormField {
    const formField: ExerciseFormField = {
      fieldId: field.fieldId,
      fieldType:
        field.fieldType === 'SLIDER'
          ? 'range'
          : field.fieldType === 'COLLAPSABLE'
          ? 'text'
          : field.fieldType,
      fieldName: field.fieldName,
      fieldText: field.fieldText,
      fieldInfo: field.fieldInfo,
      fieldValues: field.fieldValues,
      extraField: field.extraField,
    };
    return formField;
  }
}
