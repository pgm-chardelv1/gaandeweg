import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { UserExercise } from '../models/user-exercise.model';

@Injectable({
  providedIn: 'root',
})
export class UserExerciseService {
  constructor(private http: HttpClient) {}

  /**
   * Gets the user's exercises from the API.
   * @returns An observable of the user's exercises.
   */
  getUserExercises(): Observable<UserExercise[]> {
    return this.http.get<UserExercise[]>(
      `${environment.API_BASEURL}/user-exercise`
    );
  }

  /**
   * Gets the user exercise with the given id.
   * @param {number} id - the id of the user exercise to get
   * @returns {Observable<UserExercise>} - the user exercise with the given id
   */
  getUserExercise(id: number): Observable<UserExercise> {
    return this.http.get<UserExercise>(
      `${environment.API_BASEURL}/user-exercise/${id}`
    );
  }

  /**
   * Update the user exercise with the given id.
   * @param {number} id - The id of the user exercise to update.
   * @param {UserExercise} userExercise - The user exercise to update.
   * @returns {Observable<UserExercise>} - The updated user exercise.
   */
  updateUserExercise(
    id: number,
    userExercise: UserExercise
  ): Observable<UserExercise> {
    return this.http.patch<UserExercise>(
      `${environment.API_BASEURL}/user-exercise/${id}`,
      userExercise
    );
  }

  /**
   * Creates a new user exercise.
   * @param {UserExercise} userExercise - the user exercise to create
   * @returns {Observable<UserExercise>} - the created user exercise
   */
  createUserExercise(userExercise: UserExercise): Observable<UserExercise> {
    return this.http.post<UserExercise>(
      `${environment.API_BASEURL}/user-exercise`,
      userExercise
    );
  }

  /**
   * Deletes the user exercise with the given id.
   * @param {number} id - the id of the user exercise to delete
   * @returns {Observable<UserExercise>} - the deleted user exercise
   */
  deleteUserExercise(id: number): Observable<UserExercise> {
    return this.http.delete<UserExercise>(
      `${environment.API_BASEURL}/user-exercise/${id}`
    );
  }
}
