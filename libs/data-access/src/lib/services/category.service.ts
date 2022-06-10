import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from '../models';

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
    return this.http.get<Category[]>(`${environment.API_BASEURL}/categories`);
  }

  /**
   * Get the category with the given id.
   * @param {number} id - the id of the category to get
   * @returns {Observable<Category>} - the category with the given id
   */
  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(
      `${environment.API_BASEURL}/categories/${id}`
    );
  }

  /**
   * Update a category.
   * @param {number} id - the id of the category to update
   * @param {Category} category - the category to update
   * @returns {Observable<Category>} - the updated category
   */
  updateCategory(id: number, category: Category) {
    const body = category;
    return this.http
      .patch<Category>(`${environment.API_BASEURL}/categories/${id}`, body)
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
   * @returns {Observable<Category>} - the created category
   */
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      `${environment.API_BASEURL}/categories`,
      category
    );
  }

  /**
   * Deletes the category with the given id.
   * @param {number} id - the id of the category to delete
   * @returns {Observable<Category>} - an observable that emits the deleted category
   */
  deleteCategory(id: number): Observable<Category> {
    return this.http.delete<Category>(
      `${environment.API_BASEURL}/categories/${id}`
    );
  }
}
