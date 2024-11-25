import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { UserService } from '../services/userService/user.service';
import { User } from '../services/userService/user.model';

@Component({
  selector: 'app-iniciar-sesion',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './iniciar-sesion.component.html',
  styleUrl: './iniciar-sesion.component.css'
})
export class IniciarSesionComponent {
  userName: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private userService: UserService) {}

  registrar() {
    this.router.navigate(['registrar']);
  }

  login() {
    if (!this.userName || !this.password) {
      this.errorMessage = 'Error: Complete todos los datos';
      return;
    }

    this.userService.login(this.userName, this.password).subscribe(
      (response: User) => {
        if (response) {
          // Guardamos la información del usuario en localStorage
          localStorage.setItem('currentUser', JSON.stringify(response));
          // Redirigimos a la página principal
          this.router.navigate(['pagina-main']);
        } else {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        }
      },
      (error) => {
        this.errorMessage = 'Ocurrió un error al intentar iniciar sesión.';
        console.error(error);
      }
    );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}