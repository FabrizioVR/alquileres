import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl =
    'https://gestion-viviendas.onrender.com/gestion-viviendas/api/users';

  private usuarioAutenticado = new BehaviorSubject<boolean>(false);
  private usuarioActual = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    // Verificar si hay un usuario en localStorage al iniciar
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.setAuthenticated(JSON.parse(user));
    }
  }

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);

    return this.http.get(`${this.apiUrl}/login`, { params });
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  update(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/edit/${userId}`, user);
  }

  // delete(userId: number): Observable<boolean> {
  //   return this.http.delete<boolean>(`${this.apiUrl}/${userId}`);
  // }

  isAuthenticated(): Observable<boolean> {
    return this.usuarioAutenticado.asObservable();
  }

  getUsuarioActual(): Observable<User | null> {
    return this.usuarioActual.asObservable();
  }

  // Establece que el usuario está autenticado y lo guarda en el BehaviorSubject
  setAuthenticated(user: User): void {
    this.usuarioAutenticado.next(true);
    this.usuarioActual.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  // Método para cerrar sesión
  logout(): void {
    this.usuarioAutenticado.next(false);
    this.usuarioActual.next(null);
    localStorage.removeItem('currentUser');
  }
}
