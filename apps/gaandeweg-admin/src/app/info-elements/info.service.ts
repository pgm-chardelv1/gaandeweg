import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoElement } from './info.model';

@Injectable({
  providedIn: 'root',
})
export class InfoService {
  constructor(private http: HttpClient) {}

  /**
   * Gets the list of info elements from the server.
   * @returns An observable of the list of info elements.
   */
  getInfoElements(): Observable<InfoElement[]> {
    return this.http.get<InfoElement[]>(
      'http://localhost:3333/api/info-element'
    );
  }

  /**
   * Gets the info element with the given id.
   * @param {number} id - the id of the info element to get
   * @returns {Observable<InfoElement>} - the info element with the given id
   */
  getInfoElement(id: number): Observable<InfoElement> {
    return this.http.get<InfoElement>(
      `http://localhost:3333/api/info-element/${id}`
    );
  }

  /**
   * Updates the info element with the given id.
   * @param {number} id - the id of the info element to update
   * @param {InfoElement} infoElement - the object that contains the updated info element
   * @returns {Observable<InfoElement>} - the updated info element
   */
  updateInfoElement(
    id: number,
    infoElement: InfoElement
  ): Observable<InfoElement> {
    return this.http.put<InfoElement>(
      `http://localhost:3333/api/info-element/${id}`,
      infoElement
    );
  }

  /**
   * Creates a new info element.
   * @param {InfoElement} infoElement - the object that contains the new info element
   * @returns {Observable<InfoElement>} - the created info element
   */
  createInfoElement(infoElement: InfoElement): Observable<InfoElement> {
    return this.http.post<InfoElement>(
      'http://localhost:3333/api/info-element',
      infoElement
    );
  }

  /**
   * Deletes the info element with the given id.
   * @param {number} id - the id of the info element to delete
   * @returns {Observable<InfoElement>} - the deleted info element
   */
  deleteInfoElement(id: number): Observable<InfoElement> {
    return this.http.delete<InfoElement>(
      `http://localhost:3333/api/info-element/${id}`
    );
  }
}
