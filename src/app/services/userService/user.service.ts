import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all`);
  }

  login(phone: string, password: string): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/login?telefono=${phone}&contrasena=${password}`
    );
  }

  getById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }

  save(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/`, user);
  }

  update(userId: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${userId}`, user);
  }

  delete(userId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${userId}`);
  }

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