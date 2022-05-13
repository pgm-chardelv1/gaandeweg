import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models/exercise.model';

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
}
