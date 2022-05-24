import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>('http://localhost:3333/api/exercise');
  }

  getExercise(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`http://localhost:3333/api/exercise/${id}`);
  }

  renderExerciseTemplate(exercise: Exercise): ExerciseForm {
    const form: ExerciseForm = {
      fields: [],
    };

    /*     exercise?.template?.split('\n').forEach((line) => {
      const field = line.split(':');
      form.fields.push({
        fieldId: Number(field[0]),
        fieldType: field[1],
        fieldName: field[2],
        fieldText: field[3],
      });
    }); */
    if (exercise?.template) {
      const parsedExercise = JSON.parse(exercise?.template);
      for (let i = 0; i < parsedExercise.fields.length - 1; i++) {
        const field = parsedExercise.fields[i];
        form?.fields?.push({
          fieldId: field.fieldId,
          fieldType: field.fieldType === 'SLIDER' ? 'range' : field.fieldType,
          fieldName: field.fieldName,
          fieldText: field.fieldText,
          fieldValues: field.fieldValues,
          extraField: field.extraField,
        });
      }
      return form;
    } else {
      return form;
    }
  }
}
