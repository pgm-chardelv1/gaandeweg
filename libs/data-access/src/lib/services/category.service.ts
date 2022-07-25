import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Category } from '../models';
import { httpOpts } from '.';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  /**
   * Gets the categories from the server.
   * @returns An observable of the categories.
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${environment.API_BASEURL}/categories`,
      httpOpts
    );
  }

  /**
   * Get the category with the given id.
   * @param {number} id - the id of the category to get
   * @returns {Observable<Category>} - the category with the given id
   */
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(
      `${environment.API_BASEURL}/categories/${id}`,
      httpOpts
    );
  }

  /**
   * Update a category.
   * @param {number} id - the id of the category to update
   * @param {Category} category - the category to update
   * @returns
   */
  updateCategory(id: number, category: Category) {
    const body = category;
    return this.http
      .patch<Category>(
        `${environment.API_BASEURL}/categories/${id}`,
        body,
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
   * Creates a new category.
   * @param {Category} category - the category to create
   * @returns
   */
  createCategory(category: Category) {
    return this.http
      .post<Category>(
        `${environment.API_BASEURL}/categories`,
        category,
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
   * Deletes the category with the given id.
   * @param {number} id - the id of the category to delete
   * @returns {Observable<Category>} - an observable that emits the deleted category
   */
  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(
      `${environment.API_BASEURL}/categories/${id}`,
      httpOpts
    );
  }
}
