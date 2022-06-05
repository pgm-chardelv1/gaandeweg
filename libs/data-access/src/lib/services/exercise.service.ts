import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
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
}
