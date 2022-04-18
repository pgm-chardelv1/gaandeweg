import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  constructor(private http: HttpClient) {}

  getExercises(): Observable<any> {
    return this.http.get('http://localhost:3333/api/exercise');
  }
}
