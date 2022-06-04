import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  /**
   * Gets the categories from the server.
   * @returns An observable of the categories.
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3333/api/categories');
  }

  /**
   * Get the category with the given id.
   * @param {number} id - the id of the category to get
   * @returns {Observable<Category>} - the category with the given id
   */
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(
      `http://localhost:3333/api/categories/${id}`
    );
  }
}
