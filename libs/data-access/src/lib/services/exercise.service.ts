import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
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
    return this.http.get<Exercise[]>(`${environment.API_BASEURL}/exercise`);
  }

  /**
   * Gets the exercise with the given id.
   * @param {number} id - the id of the exercise to get
   * @returns {Observable<Exercise>} - the exercise with the given id
   */
  getExercise(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${environment.API_BASEURL}/exercise/${id}`);
  }

  /**
   * Update an exercise in the database.
   * @param {number} id - the id of the exercise to update
   * @param {Exercise} exercise - the exercise to update
   * @returns {Observable<Exercise>} - the updated exercise
   */
  updateExercise(id: number, exercise: Exercise): Observable<Exercise> {
    return this.http.patch<Exercise>(
      `${environment.API_BASEURL}/exercise/${id}`,
      exercise
    );
  }

  /**
   * Creates an exercise in the database.
   * @param {Exercise} exercise - the exercise to create
   * @returns {Observable<Exercise>} - the created exercise
   */
  createExercise(exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(
      `${environment.API_BASEURL}/exercise`,
      exercise
    );
  }

  /**
   * Deletes the exercise with the given id.
   * @param {number} id - the id of the exercise to delete
   * @returns {Observable<Exercise>} - the deleted exercise
   */
  deleteExercise(id: number): Observable<Exercise> {
    return this.http.delete<Exercise>(
      `${environment.API_BASEURL}/exercise/${id}`
    );
  }
}
