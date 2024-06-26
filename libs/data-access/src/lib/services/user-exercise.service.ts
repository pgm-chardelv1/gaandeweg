import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { httpOpts } from '.';
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
   * @param {string} userId - the id of the user
   */
  getUserExercises(userId: string): Observable<UserExercise[]> {
    console.log(userId);
    return this.http.get<UserExercise[]>(
      `${environment.API_BASEURL}/userExercise/${userId}`,
      httpOpts
    );
  }

  /**
   * Gets the user exercise with the given id.
   * @param {number} id - the id of the user exercise to get
   * @param {string} userId - the id of the user
   * @returns {Observable<UserExercise>} - the user exercise with the given id
   */
  getUserExercise(id: number, userId: string): Observable<UserExercise> {
    return this.http.get<UserExercise>(
      `${environment.API_BASEURL}/userExercise/${userId}/${id}`,
      httpOpts
    );
  }

  /**
   * Update the user exercise with the given id.
   * @param {number} id - The id of the user exercise to update.
   * @param {string} userId - The id of the user.
   * @param {UserExercise} userExercise - The user exercise to update.
   * @returns {Observable<UserExercise>} - The updated user exercise.
   */
  updateUserExercise(id: number, userExercise: UserExercise, userId: string) {
    return this.http
      .patch<UserExercise>(
        `${environment.API_BASEURL}/userExercise/${userId}/${id}`,
        userExercise,
        httpOpts
      )
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  /**
   * Creates a new user exercise.
   * @param {UserExercise} userExercise - the user exercise to create
   * @returns {Observable<UserExercise>} - the created user exercise
   */
  createUserExercise(userExercise: UserExercise): Observable<UserExercise> {
    return this.http.post<UserExercise>(
      `${environment.API_BASEURL}/userExercise`,
      userExercise,
      httpOpts
    );
  }

  /**
   * Deletes the user exercise with the given id.
   * @param {number} id - the id of the user exercise to delete
   * @param {string} userId - the id of the user
   * @returns {Observable<UserExercise>} - the deleted user exercise
   */
  deleteUserExercise(id: number, userId: string): Observable<UserExercise> {
    return this.http.delete<UserExercise>(
      `${environment.API_BASEURL}/userExercise/${userId}/${id}`,
      httpOpts
    );
  }
}
