import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rent } from './rent.model';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  private apiUrl =
    'https://gestion-viviendas.onrender.com/gestion-viviendas/api/rents';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Rent[]> {
    return this.http.get<Rent[]>(`${this.apiUrl}/all`);
  }

  getById(id: number): Observable<Rent> {
    return this.http.get<Rent>(`${this.apiUrl}/${id}`);
  }

  getByPropertyId(propertyId: number): Observable<Rent[]> {
    return this.http.get<Rent[]>(`${this.apiUrl}/property/${propertyId}`);
  }

  getByUserId(userId: number): Observable<Rent[]> {
    return this.http.get<Rent[]>(`${this.apiUrl}/user/${userId}`);
  }

  save(rent: Rent): Observable<Rent> {
    return this.http.post<Rent>(`${this.apiUrl}/`, rent);
  }

  update(rentId: number, rent: Rent): Observable<Rent> {
    return this.http.put<Rent>(`${this.apiUrl}/${rentId}`, rent);
  }

  delete(rentId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${rentId}`);
  }
}
