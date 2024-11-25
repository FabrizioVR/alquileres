import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from './property.model';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private apiUrl =
    'https://gestion-viviendas.onrender.com/gestion-viviendas/api/properties';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/all`);
  }

  getById(propertyId: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${propertyId}`);
  }

  getByUserId(userId: number): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/user/${userId}`);
  }

  filterProperties(
    price?: number,
    city?: string,
    type?: string,
    capacity?: number,
    nRooms?: number
  ): Observable<Property[]> {
    let params = new HttpParams();
    if (price !== undefined) params = params.set('price', price.toString());
    if (city) params = params.set('city', city);
    if (type) params = params.set('type', type);
    if (capacity !== undefined)
      params = params.set('capacity', capacity.toString());
    if (nRooms !== undefined) params = params.set('nRooms', nRooms.toString());

    return this.http.get<Property[]>(`${this.apiUrl}/filter`, { params });
  }

  save(property: Property): Observable<Property> {
    return this.http.post<Property>(`${this.apiUrl}/`, property);
  }

  update(id: number, property: Property): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/${id}`, property);
  }

  updateState(id: number, availability: string): Observable<Property> {
    return this.http.put<Property>(
      `${this.apiUrl}/estado/${availability}/${id}`,
      {}
    );
  }

  delete(propertyId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${propertyId}`);
  }
}
